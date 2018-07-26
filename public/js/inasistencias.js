var app = angular.module('inasistencia', ['ngCookies'])

app.controller('myController', function($scope, $http, $cookies, $q) {

    $scope.listaInasistencias = [];
    
    var promesaPer=new Promise((resolve,reject)=>{
        var lstPersonas=[];
        var auxPer = $http.get('/api/personas');
        auxPer.success(function(data) {
           for (var i = 0; i<data.length; i++) {
                lstPersonas.push(data[i]);
            }
        }); 
        if(lstPersonas.length>0){
            resolve(lstPersonas);
        }else{
            reject("Ocurrio un error al cargar la lista de personas ");   
        }   

    });

    var promesaAfi=new Promise((resolve,reject)=>{
        var lstAfiliacion=[];
        var auxAfi = $http.get('/api/afiliacions/');
        auxAfi.success(function(data) {
           for (var i = 0; i<data.length; i++) {
                lstAfiliacion.push(data[i]);
            }
        }); 
        if(lstAfiliacion.length>0){
            resolve(lstAfiliacion);
        }else{
            reject("Ocurrio un error al cargar la lista de afiliaciones ");   
        }   

    });

    var =new Promise((resolve,reject)=>{
        var lstAsistencia=[];
        var auxAsis = $http.get('/api/asistencia/');
        auxAsis.success(function(data) {
           for (var i = 0; i<data.length; i++) {
                if(data[i].estado==1){
                    lstAsistencia.push(data[i]);
                }
            }
        }); 
        if(lstAsistencia.length>0){
            resolve(lstAsistencia);
        }else{
            reject("Ocurrio un error al cargar la lista de asistencia ");   
        }   

    });

            $q.all(promesaAfi,promesaPer,promesaAsis).then( function(value){
                console.log(value);
                var listaAfi=value[0];
                var listaPer=value[1];
                var listaAsis=value[2];

                

                    for(var a=0; a<listaAfi.length;a++){
                        laAfi=listaAfi[a];
                        auxAsisPer=[];
                        for(var b=0; b<listaAsis.length;b++){
                            laAsis=listaAsis[a];
                            if(laAfi.documento==laAsis.documento && laAsis.createdAt>=laAfi.createdAt){
                               auxAsisPer.push(laAsis); 
                            }
                        } 
                        var maxIdAsis=0; 
                        var ultimaAsis;      
                        for(var c=0; c<auxAsisPer.length;c++){
                            if(auxAsisPer[c].id>maxIdAsis){
                               maxIdAsis=auxAsisPer[c].id;
                               ultimaAsis=auxAsisPer[c];
                            }
                        }
                        var fehcaNow=new Date();
                        var encontre=false;

                        //si resto la fecha de entrada menos la fecha actual y estoy dentro del mismo año para una semana el resultado es -7000000
                        //si resto la fecha de entrada menos la fecha actual y se cambia añ año siguiente para una semana el resultado es -8876000000
             
                        if(fehcaNow-ultimaAsis.createdAt>xxxxxxx)
                        for(var b=0,b<listaPer.length && !encontre;b++){
                            laPer=[b];
                            if(laPer.documento==laAfi.documento){
                                bandera=true;
                                var doc = laPer.documento;
                                var nom = laPer.nombre;
                                var ape = laPer.apellido;
                                var fech = laAsis.createdAt;
                                console.log(i);
                                var todo = {documento:doc, 
                                            nombre:nom, 
                                            apellido:ape, 
                                            fecha:fech
                                            };
                                $scope.listaAsistencia.push(todo);    
                            }
                        }

                            
                        
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
   
});