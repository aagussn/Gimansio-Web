var app = angular.module('personas', ['ngCookies'])

app.controller('myController', function($scope, $http, $cookies, $q) {
    
    var chkLogin = $cookies.get('login');
    console.log("Log:" + chkLogin);
    if (chkLogin==0 || !chkLogin) {
        console.log('bla');
        window.location.href = "/login";
    }

    $scope.data = [];
    
    var request = $http.get('/api/lista');    
    
    request.success(function(data) {    
        console.log(data);
        
        for (x=0;x<data.length;x++) {
            console.log('aca')
            console.log(data[x].afiliacions[data[x].afiliacions.length-1].estado);


            var todo = {documento:data[x].documento, 
                        nombre:data[x].nombre, 
                        apellido:data[x].apellido, 
                        estadoafi: data[x].afiliacions[data[x].afiliacions.length-1].estado,
                        idafi: data[x].afiliacions[data[x].afiliacions.length-1].id
                    };
            $scope.data.push(todo);
        }
                          
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
        parameter = JSON.stringify({//Parsear a string un json 
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
                        personaDocumento: documento
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

