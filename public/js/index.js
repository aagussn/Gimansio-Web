var app = angular.module('Index',['ngCookies']);

app.controller('IndexControl',  function($scope, $http, $cookies) {
	var chkLogin = $cookies.get('login');
	console.log(chkLogin);
	if (!chkLogin) {
		console.log('bla');
		window.location.href = "http://localhost:3000/login";
	}
});
	