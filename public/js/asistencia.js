var app = angular.module('asistencia', ['ngCookies']);

app.controller('myController', function($scope, $http, $cookies) {
    $scope.data = [];
    
    var requestPersona = $http.get('/api/personas');  
    var requestAsistencia = $http.get('/api/asistencia');
    
    requestPersona.success(function(data) {
        $scope.data = data;            //Ver de crear un array con los datos de personas y asistencias(un join de ambas)
        console.log('Data personas.js');
    });
    
    requestPersona.error(function(data){
        console.log('Error: ' + data); 
    });
    requestAsistencia.success(function(data2) {
        $scope.data2 = data2;
        console.log('Data asistencia.js');
    });
    
    requestAsistencia.error(function(data2){
        console.log('Error: ' + data2);
    });




    // Orden de la tabla
    $scope.sortType     = 'documento'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order

    $scope.setCookie = function (cookie) {
        $cookies.put('Pagocookie', cookie);
        window.location.href = "http://localhost:3000/pagos";
    }
});