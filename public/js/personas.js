var app = angular.module('personas', ['ngCookies']);

app.controller('myController', function($scope, $http, $cookies) {
    $scope.data = [];
    
    var request = $http.get('/api/personas');    
    
    request.success(function(data) {
        $scope.data = data;
        console.log('Data personas.js');
    });
    
    request.error(function(data){
        console.log('Error: ' + data);
    });

    // Orden de la tabla
    $scope.sortType     = 'documento'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order

    $scope.setCookie = function (cookie) {
        $cookies.put('Pagocookie', cookie);
        window.location.href = "http://localhost:3000/pagos";
    }
});