var app = angular.module('asistencia', ['ngCookies'])

app.controller('myController', function($scope, $http, $cookies, $q) {

    $scope.listaAsistencia = [];
    
    var lstPersonas=[];
    var lstAfiliacion=[];
    var lstAsistencia=[];


        var auxAfi = $http.get('/api/afiliacions/');
        var auxPer = $http.get('/api/personas');
        var auxAsis = $http.get('/api/asistencia/');



        auxPer.success(function(data){
            var promesaPer=new Promise((resolve,reject)=>{
                    
                for (var i = 0; i<data.length; i++) {
                    lstPersonas.push(data[i]);
                }
                if(lstPersonas.length>0){
                    promesasTotal.push(promesaPer);
                    resolve(lstPersonas);
                }else{
                    reject("Ocurrio un error al cargar la lista de personas ");   
                }   
            }); 
        });        
        auxAfi.success(function(data1){
            var promesaAfi=new Promise((resolve,reject)=>{
                for (var i = 0; i<data1.length; i++) {
                    lstAfiliacion.push(data1[i]);
                }
                if(lstAfiliacion.length>0){
                    promesasTotal.push(promesaAfi);
                    resolve(lstAfiliacion);
                }else{
                    reject("Ocurrio un error al cargar la lista de afiliaciones ");   
                }                  
            }); 
        });
        auxAsis.success(function(data2){
            var promesaAsis =new Promise((resolve,reject)=>{
                for (var i = 0; i<data2.length; i++) {
                    lstAsistencia.push(data2[i]);
                }
                if(lstAsistencia.length>0){
                    promesasTotal.push(promesaAsis);
                    //hasta aca tengo la lista
                    resolve(lstAsistencia);
                }else{
                    reject("Ocurrio un error al cargar la lista de asistencia ");   
                } 
            }); 

        });                                    


            

            Promise.all(promesasTotal).then(function(value){
                console.log("entre al promise.all");
                console.log(value);                

                var listaAfi=value[0];
                var listaPer=value[1];
                var listaAsis=value[2];



                    for(var a=0; a<listaAfi.length;a++){
                        laAfi=listaAfi[a];
                        for(var b=0; b<listaAsis.length;b++){
                            laAsis=listaAsis[a];
                            if(laAfi.documento==laAsis.documento && laAsis.createdAt>=laAfi.createdAt){
                                var encontre=false;
                                for(var b=0;b<listaPer.length && !encontre;b++){
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

