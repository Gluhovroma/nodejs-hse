(function () {
    'use strict';

    angular.module("hse.controllers.admin", [
        'ui.router',     
        
    ])
    .controller('mainController', function ($scope, $state, $stateParams, $http, $rootScope,$sessionStorage) {
        if ($sessionStorage.authenticated != true) {
            $state.go('login');
        }       
        
    })
    .controller('adminController', function ($scope, $state, $stateParams, $http, $rootScope,$sessionStorage) {
        if ($sessionStorage.authenticated != true) {
            $state.go('login');
        } 
        else {
             
        }
        $state.transitionTo('admin.employees');  
        

    })
    .controller('employeeListController', function ($scope, $state, $stateParams, $http, $rootScope, httpService,$sessionStorage) {
        if ($sessionStorage.authenticated != true) {
            $state.go('login');
        } 
        console.log($sessionStorage);
        httpService.
            getEmployes()
            .then(function (response) {
                $scope.employees = response.data;
            })       

        
        $scope.deleteEmployee = function(employee) {
            httpService.
                deleteEmployee(employee)
                .then(function (response) {
                    httpService
                        .getEmployes()
                        .then(function (response) {
                            $scope.employees = response.data;
                        });
                }); 
        }
        

    })
    .controller('employeeEditController', function ($scope, $state, $stateParams, $http, $rootScope,httpService,$sessionStorage) {
        if ($sessionStorage.authenticated != true) {
            $state.go('login');
        }   
        
        httpService
            .getPositions()
            .then(function (response) {
                $scope.positions = response.data;
                console.log($scope.positions);

            });
        httpService
            .getSubdivisions()
            .then(function (response) {
                $scope.subvisions = response.data;
            });

        if ($stateParams.id){
             httpService
                .getEmployeeInfo($stateParams.id)
                .then(function (response) {
                    $scope.employee = response.data;
                    console.log($scope.employee);
                    // for (var i = 0; i < 0; i--) {
                    //     Things[i]
                    // };
                    angular.forEach($scope.subvisions, function(item) {
                        if (item._id == $scope.employee.subvision._id){
                            $scope.employee.subvision = item
                        }
                    })
                    angular.forEach($scope.positions, function(item) {
                        if (item._id == $scope.employee.position._id){
                            $scope.employee.position = item
                        }
                    })
                });
        }


        $scope.save = function(employee) {
            if ($stateParams.id) {
                 httpService
                    .updateEmployee($stateParams.id, employee)
                    .then(function (response) {
                        $state.go('admin.employees');
                    });
            }
            else {
                httpService
                    .createEmployee(employee)
                    .then(function (response) {
                        $state.go('admin.employees');
                    });
            }
        };

        $scope.returnToList = function() {
            $state.go('admin.employees'); 
        };
    })
    .controller('employeeDetailController', function ($scope, $state, $stateParams, $http, $rootScope,httpService,$sessionStorage ) {
        if ($sessionStorage.authenticated != true) {
            $state.go('login');
        }     
        httpService
                .getEmployeeInfo($stateParams.id)
                .then(function (response) {
                    $scope.employee = response.data;

                });
        $scope.returnToList = function() {
            $state.go('admin.employees'); 
        };
    })
    .controller('positionListController', function ($scope, $state, $stateParams, $http, $rootScope,httpService,$sessionStorage) {
        if ($sessionStorage.authenticated == false) {
            $state.go('login');
        }
        
        httpService
            .getPositions()
            .then(function (response) {
                $scope.positions = response.data;
            });
        
        


        $scope.addPosition = function(position) {
            httpService
                .createPosition(position)
                .then(function (response) {
                     httpService
                        .getPositions()
                        .then(function (response) {
                            $scope.positions = response.data;
                        });
                });
        };
        $scope.deletePosition = function(position) {
            httpService
                .deletePosition(position)
                .then(function (response) {
                     httpService
                        .getPositions()
                        .then(function (response) {
                            $scope.positions = response.data;
                        });
                });
        };

        
    })
    .controller('subdivisionListController', function ($scope, $state, $stateParams, $http, $rootScope,httpService,$sessionStorage) {

        if ($sessionStorage.authenticated != true) {
            $state.go('login');
        }
        
        httpService
            .getSubdivisions()
            .then(function (response) {
                $scope.subvisions = response.data;
            });
        
        


        $scope.addSubvision = function(subvision) {
             httpService
                .createSubdivision(subvision)
                .success(function (response) {
                     httpService
                        .getSubdivisions()
                        .success(function (response) {
                            $scope.subvisions = response;
                        });
                });
        };
        $scope.deleteSubvision = function(subvision) {
            httpService
                .deleteSubdivision(subvision)
                .success(function (response) {
                     httpService
                        .getSubdivisions()
                        .success(function (response) {
                            $scope.subvisions = response;
                        });
                });
        };
       
    })
    



})();