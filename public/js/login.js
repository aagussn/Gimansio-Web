var app = angular.module('Login',['ngCookies']);


app.controller('LoginControl',  function($scope, $http, $cookies) {
	$scope.exito=0;

	// Controlo login
	// Si ya esta logeado lo mando a la pagina principal
	var chkLogin = $cookies.get('login');
	if (chkLogin>0) {
		window.location.href = "/";
	}

	$scope.list = '';

	$scope.submit = function() {
		$scope.list = '/api/usuarios/?';
		$scope.list += 'user=' + $scope.User + '&pswd=' + $scope.Pswd;
		
		var request = $http.get($scope.list);

		request.success(function(data) {
	        $scope.data = data;
	        if (data.length >=1 ) {
	        	var now = new Date();
	        	var exp = new Date(now);
	        	exp.setMinutes(now.getMinutes()+60)
	        	$cookies.put('login', 1, {'expires': exp});
	        	window.location.href = "/";
	        	console.log("Boh");
	        	$scope.exito=1;

	        } else {
	        	$scope.exito=2;
	        }
			console.log(data);
			console.log($scope.exito);
	    });
	    
		request.error(function(data){
	        console.log('Error: ' + data);
	        	        	$scope.exito=2;

	    });

	};
});
	