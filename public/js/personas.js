angular.module('personas', ['ngCookies'])


    .factory('getAfiliacion', function(){
        return {
            getAfi: function(id) {
                return $http.get('http://localhost:3000/api/afiliacions/' + id );
            }
        }
    })
    .controller('myController', function($scope, $http, $cookies) {

        $scope.data = [];
        
        var request = $http.get('/api/personas');    
        
        request.success(function(data) {
            
            //console.log(data);

            // voy a buscar la ultima afiliacion
            for (var i = 0; i<data.length; i++) {
                var id = data[i].afiliacionId;
                var doc = data[i].documento;
                var nom = data[i].nombre;
                var ape = data[i].apellido;
                
                var promise = getAfiliacion.getAfi(id);
                promise.then (
                    function(payload) {   
                        console.log(Afiliacion);

                        var todo = {documento:doc, 
                                    nombre:nom, 
                                    apellido:ape, 
                                    estadoafi:Afiliacion.estado,
                                    idafi: Afiliacion.id};
                        $scope.data.push(todo);
                        console.log(todo);  
                    }
                );
            }
            console.log($scope.data);
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

        $scope.darBaja = function (idafi) {
            console.log('darBaja');
            // Hago el upd
            parameter = JSON.stringify({
                            estado : 0
                        });
            $scope.list = 'http://localhost:3000/api/afiliacions/' + idafi;
            var request = $http.put($scope.list, parameter);
            request.success(function (data) {
                window.location.href = "http://localhost:3000/personas";
            });        

        }
        
        $scope.darAlta = function (documento) {
            console.log('darAlta');   
            // Hago el insert
            parameter = JSON.stringify({
                            estado : 1,
                            documento: documento
                        });
            $scope.list = 'http://localhost:3000/api/afiliacions';
            var request = $http.post($scope.list, parameter);

            request.success(function (data) {
                // Si inserto bien actualizo el dato en la tabla personas
                $scope.list = 'http://localhost:3000/api/personas/'+ documento;

                parameter = JSON.stringify({
                    afiliacionId: data.id
                });

                var request = $http.put($scope.list, parameter);
                window.location.href = "http://localhost:3000/personas";
            });        

        }
    })

