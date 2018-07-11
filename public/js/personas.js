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

    $scope.updPersona = function (cookie) {
        var now = new Date();
        var exp = new Date(now);
        exp.setMinutes(now.getMinutes()+1)
        $cookies.put('updPersona', cookie, {'expires': exp});
        window.location.href = "http://localhost:3000/afiliacion";
    }

    $scope.setCookie = function (cookie) {
        var now = new Date();
        var exp = new Date(now);
        exp.setMinutes(now.getMinutes()+1)
        $cookies.put('Pagocookie', cookie, {'expires': exp});
        window.location.href = "http://localhost:3000/pagos";
    }

});