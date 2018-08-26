var app = angular.module('asistencia', ['ngCookies']);

app.controller('myController', function($scope, $http, $cookies) {
    
    var chkLogin = $cookies.get('login');
    console.log(chkLogin);
    if (chkLogin==0 || !chkLogin) {
        console.log('bla');
        window.location.href = "/login";
    }

    $scope.data = [];
    
    var listaPrincipal = $http.get('/api/lista');  
   
    //Lista de personas
    listaPrincipal.success(function(data) {
        //verifico que la lista no este vacia
        if(data.length>0){
           // console.log("el data no esta vacio");
            //agrego los datos que quiero a la lista resultante
            for(var a=0;a<data.length;a++){
                var persona=data[a];
                // busco las afiliacion activa y me quedo con la fecha
                for(var b=0;b<persona.afiliacions.length;b++){
                   // console.log("tiene afiliacion");
                    var laAfiliacion=persona.afiliacions[b];
                    if(laAfiliacion.estado==1){
                        //busco las asistencias mayores a la fecha de afiliacion activa
                        for(var c=0;c<persona.asistencia.length;c++){
                            //console.log("tiene asistencias");
                            var laAsistencia=persona.asistencia[c];
                            if(laAsistencia.updatedAt>laAfiliacion.updatedAt){
                               // console.log("las asistencias son de la afiliacion activa");
                               var auxFecha = laAsistencia.updatedAt.toString();
                               var fechaMostar=auxFecha.slice(0, 10)+ " " + auxFecha.slice(11, 16);
                               console.log(fechaMostar);

                                var datoValido = {
                                    documento:persona.documento,
                                    nombre:persona.nombre, 
                                    apellido:persona.apellido, 
                                    fecha:fechaMostar
                                };
                                //console.log(datoValido);
                                $scope.data.push(datoValido);    
                            }
                        }        
                    }    
                }
            }  console.log($scope.data.length);
        }else{
            console.log('Data personas NO EXISTE ' + data.length);
        }
    }); listaPrincipal.error(function(data){
        console.log('Error: ' + data); 
        });

    // Orden de la tabla
    $scope.sortType     = 'documento'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order

    $scope.setCookie = function (cookie) {
        $cookies.put('asistenciascookie', cookie);
        window.location.href = "/asistencia";
    }

    $scope.updPersona = function (cookie) {
        var now = new Date();
        var exp = new Date(now);
        exp.setMinutes(now.getMinutes()+1)
        $cookies.put('updPersona', cookie, {'expires': exp});
        window.location.href = "/afiliacion";
    }
});