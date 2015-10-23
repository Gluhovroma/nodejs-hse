(function () {
    'use strict';
    angular.module('hse.services', [])
        .factory('httpService', [
        '$http',
        
        function ($http) {

            return {
                getEmployes: function () {
                    return $http({
                        method: 'GET',
                        url: '/api/employee'
                    });
                },
                getEmployeeInfo: function (guid) {
                    return $http({
                        method: 'GET',
                        url: '/api/employee/' + guid
                    });
                },
                createEmployee: function (employee) {
                    return $http({
                        method: 'POST',
                        url: '/api/employee',
                        data: employee
                    });
                },
                updateEmployee: function (guid, employee) {
                    return $http({
                        method: 'PUT',
                        url: '/api/employee/' + guid,
                        data: employee
                    });
                },
                deleteEmployee: function (guid) {
                    return $http({
                        method: 'DELETE',
                        url: '/api/employee/' + guid
                    });
                },                
                getPositions: function () {
                    return $http({
                        method: 'GET',
                        url: '/api/position'
                    });
                },
                createPosition: function (position) {
                    return $http({
                        method: 'POST',
                        url: '/api/position',
                        data: position
                    });
                },
                deletePosition: function (guid) {
                    return $http({
                        method: 'DELETE',
                        url: '/api/position/' + guid
                    });
                },
                getSubdivisions: function () {
                    return $http({
                        method: 'GET',
                        url: '/api/subdivision'
                    });
                },
                createSubdivision: function (subdivision) {
                    return $http({
                        method: 'POST',
                        url: '/api/subdivision',
                        data: subdivision
                    });
                },
                deleteSubdivision: function (guid) {
                    return $http({
                        method: 'DELETE',
                        url: '/api/subdivision/' + guid
                    });
                },
            };
        }])
    
})();

