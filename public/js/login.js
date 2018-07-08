var app = angular.module('Login',['ngCookies']);

app.controller('LoginControl',  function($scope, $http, $cookies) {
	// Controlo login
	// Si ya esta logeado lo mando a la pagina principal
	var chkLogin = $cookies.get('login');
	if (chkLogin) {
		window.location.href = "http://localhost:3000/";
	}

	$scope.list = '';

	$scope.submit = function() {
		$scope.list = 'http://localhost:3000/api/usuarios/?';
		$scope.list += 'user=' + $scope.User + '&pswd=' + $scope.Pswd;
		
		var request = $http.get($scope.list);

		request.success(function(data) {
	        $scope.data = data;
	        if (data.length >=1 ) {
	        	var now = new Date();
	        	var exp = new Date(now);
	        	exp.setMinutes(now.getMinutes()+60)
	        	$cookies.put('login', 1, {'expires': exp});
	        	window.location.href = "http://localhost:3000/";
	        	console.log("Boh");
	        }
			// console.log(data.length);
	    });
	    
		request.error(function(data){
	        console.log('Error: ' + data);
	    });

	};
});
	