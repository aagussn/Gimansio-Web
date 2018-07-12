var app = angular.module('personas', ['ngCookies']);

app.controller('myController', function($scope, $http, $cookies) {
    $scope.data = [];
    
    var request = $http.get('/api/personas');    
    
    request.success(function(data) {
        
        console.log(data);

        // voy a buscar la ultima afiliacion
        for (var i = 0; i<data.length; i++) {
            var id = data[i].afiliacionId;
            var doc = data[i].documento;
            var nom = data[i].nombre;
            var ape = data[i].apellido;
            console.log(id);
            var request = $http.get('http://localhost:3000/api/afiliacions/' + id );
            request.success(function(Afiliacion) {
                console.log(Afiliacion);
                var todo = {documento:doc, 
                            nombre:nom, 
                            apellido:ape, 
                            estadoafi:Afiliacion.estado};
                $scope.data.push(todo);
            });
        }
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

    $scope.darBaja = function (documento) {
        console.log('darBaja');
    }
    
    $scope.darAlta = function (documento) {
        console.log('darAlta');   
    }
});