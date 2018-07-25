var app = angular.module('asistencia', ['ngCookies'])

app.controller('myController', function($scope, $http, $cookies, $q) {

    $scope.listaAsistencia = [];
    
    var request = $http.get('/api/personas');    
    var promises=[];    

    request.success(function(data) {    
        //console.log(data);
        var afiliaciones = [];
        var personas=[];
        var asistencias=[];
        // voy a buscar la ultima afiliacion
        for (var i = 0; i<data.length; i++) {
            var id = data[i].afiliacionId;
            var doc = data[i].documento;
            var nom = data[i].nombre;
            var ape = data[i].apellido;
            var promiseAfi = $http.get('/api/afiliacions/' + id );
            var promiseAsis = $http.get('/api/asistencia$'+ doc );
            //cargo las listas de personas
            afiliaciones.push(promiseAfi);
            personas.push(data[i]);
            asistencias.push(promiseAsis);
        };
        promises.push(afiliaciones);//pocicion 0
        promises.push(personas);//pocicion 1
        promises.push(asistencias);//pocicion 2

        $q.all(promises).then(function(value){
            console.log(value);
            var afiliacionlist;
            var personaslist;
            var asistenciaslist;

            for (var i = 0; i<data.length; i++) {
                if(i==0){afiliacionlist = data[i];}
                if(i==1){personaslist = data[i];}
                if(i==2){asistenciaslist = data[i];}
            }

                for(var i = 0; i<afiliacionlist.length; i++) {
                    var laAfiliacion=afiliacionlist[i];
                    if(laAfiliacion.estado==1){
                        for(var a = 0; a<personaslist.length; a++) {
                            var laPersona=personaslist[a];
                            if(laPersona.documento==laAfiliacion.documento){
                                for(var b = 0; b<asistenciaslist.length; b++) {
                                    var laAsistencia=asistenciaslist[b];
                                    //ver si quiero ver la de los afiliados activos
                                    if(laPersona.documento==laAsistencia.documento && laAsistencia.createdAt>laAfiliacion.createdAt){
                                        var doc = laPersona.documento;
                                        var nom = laPersona.nombre;
                                        var ape = laPersona.apellido;
                                        var fecha = laAsistencia.createdAt;  
                                        var todo = {documento:doc, 
                                                    nombre:nom, 
                                                    apellido:ape, 
                                                    fecha:estado};
                                        $scope.listaAsistencia.push(todo); 
                                    }
                                }  
                            }       
                        }
                    }        
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
   
});

