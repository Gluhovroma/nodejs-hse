(function () {
    'use strict';

    angular.module("hse.controllers.login", [
        'ui.router',        
        // 'ngStorage',
      
    ])
    .controller('loginController', function ($scope, $state, $stateParams, $http, $rootScope,$sessionStorage) {
    	$scope.user = {username: '', password: ''};
		$scope.error_message = '';

		$scope.login = function(){
		    $http.post('/auth/login', $scope.user).success(function(data){
		      if(data.state == 'success'){
		        $sessionStorage.authenticated = true;
		        $sessionStorage.current_user = data.user.username;
		        $state.go('admin');  
		      }
		      else{
		        $scope.error_message = data.message;
		      }
		    });
		};
       
   }) 	
                
})();