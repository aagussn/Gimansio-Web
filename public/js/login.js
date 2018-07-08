var app = angular.module('Login',[]);

app.controller('LoginControl',  function($scope, $http) {
	$scope.list = '';

	$scope.submit = function() {
		$scope.list = 'http://localhost:3000/api/usuarios/?';
		$scope.list += 'user=' + $scope.User + '&pswd=' + $scope.Pswd;
		
		var request = $http.get($scope.list);

		request.success(function(data) {
	        $scope.data = data;

	        if (data.length >=1 ) {
	        	 window.location.href = "http://localhost:3000/html/personas.html";
	        }
			// console.log(data.length);
	    });
	    
		request.error(function(data){
	        console.log('Error: ' + data);
	    });

	};
});
	