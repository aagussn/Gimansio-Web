var app = angular.module('personas', ['ngCookies'])

app.controller('myController', function($scope, $http, $cookies, $q) {

    $scope.data = [];
    
    var request = $http.get('/api/personas');    
    
    request.success(function(data) {    
        //console.log(data);
        var promises = [];
        // voy a buscar la ultima afiliacion
        for (var i = 0; i<data.length; i++) {
            var id = data[i].afiliacionId;
            var doc = data[i].documento;
            var nom = data[i].nombre;
            var ape = data[i].apellido;
            var promise = $http.get('/api/afiliacions/' + id );
            //console.log(id);
            promises.push(promise);
        };

        $q.all(promises).then( function(value){
            console.log(value);
            for (var i = 0; i<data.length; i++) {
                var id = data[i].afiliacionId;
                var doc = data[i].documento;
                var nom = data[i].nombre;
                var ape = data[i].apellido;
                var estado = value[i].data.estado;  
                console.log(i);
                var todo = {documento:doc, 
                            nombre:nom, 
                            apellido:ape, 
                            estadoafi:estado,
                            idafi: id};
                $scope.data.push(todo);
            }              
        });    
    });
    // Orden de la tabla
    $scope.sortType     = 'documento'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order

    $scope.updPersona = function (cookie) {
        var now = new Date();
        var exp = new Date(now);
        exp.setMinutes(now.getMinutes()+1)
        $cookies.put('updPersona', cookie, {'expires': exp});
        window.location.href = "/afiliacion";
    }

    $scope.setCookie = function (cookie) {
        var now = new Date();
        var exp = new Date(now);
        exp.setMinutes(now.getMinutes()+1)
        $cookies.put('Pagocookie', cookie, {'expires': exp});
        window.location.href = "/pagos";
    }

    $scope.darBaja = function (idafi) {
        console.log('darBaja');
        // Hago el upd
        parameter = JSON.stringify({
                        estado : 0
                    });
        $scope.list = '/api/afiliacions/' + idafi;
        var request = $http.put($scope.list, parameter);
        request.success(function (data) {
            window.location.href = "/personas";
        });        

    }
    
    $scope.darAlta = function (documento) {
        console.log('darAlta');   
        // Hago el insert
        parameter = JSON.stringify({
                        estado : 1,
                        documento: documento
                    });
        $scope.list = '/api/afiliacions';
        var request = $http.post($scope.list, parameter);

        request.success(function (data) {
            // Si inserto bien actualizo el dato en la tabla personas
            $scope.list = '/api/personas/'+ documento;

            parameter = JSON.stringify({
                afiliacionId: data.id
            });

            var request = $http.put($scope.list, parameter);
            window.location.href = "/personas";
        });        

    }
});

