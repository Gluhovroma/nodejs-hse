
(function () {
    'use strict';
    angular.module('hse', [
        'hse.controllers.login',
        'hse.controllers.admin',
        'hse.services',
        'ngStorage',
        'ui.router'              
    ])
    .run(function($rootScope,$sessionStorage,$state, $stateParams) {
       console.log($sessionStorage);
            if ($sessionStorage.authenticated != true) {
            $state.go('login');
        } 
        
    })
    .config(function ($stateProvider, $urlRouterProvider) {
        // $urlRouterProvider.otherwise('/login');
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'admin/partials/login.html',
                controller: 'loginController'
            })
            .state('admin', {
                url: '/home',
                templateUrl: 'admin/partials/admin.html',
                controller: 'adminController'
            })
            .state('admin.employees', {   
                url: '/employees-list',             
                templateUrl: 'admin/partials/employee-list.html',
                controller: 'employeeListController'
            })
            .state('admin.employee-edit', {                
                url: '/employee-edit/:id',               
                templateUrl: 'admin/partials/employee-edit.html',
                controller: 'employeeEditController'
            })
            .state('admin.employee-detail', {
                url: '/employee-detail/:id',                 
                templateUrl: 'admin/partials/employee-detail.html',
                controller: 'employeeDetailController'
            })
            .state('admin.position', {     
                url: '/position-list',                       
                templateUrl: 'admin/partials/position.html',
                controller: 'positionListController'
            })
            .state('admin.subdivision', {  
                url: '/subdivision-list',                           
                templateUrl: 'admin/partials/subvision.html',
                controller: 'subdivisionListController'
            })            
    });   

})();
