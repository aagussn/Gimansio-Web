var app = angular.module('asistencia', ['ngCookies']);

app.controller('myController', function($scope, $http, $cookies) {
    $scope.data = [];
    
    var requestPersona = $http.get('http://localhost:3000/api/personas');  
    var requestAsistencia = $http.get('http://localhost:3000/api/asistencia');
    var requestAfiliacion = $http.get('http://localhost:3000/api/afiliacions');

    var auxPersona=null;
    var auxAsistencia=null;
    var auxAfiliacion=null;
    var listaResultado=null;

    //Lista de personas
    requestPersona.success(function(data) {
        //verifico que la lista no este vacia
        if(data.length>0){
            auxPersona=data;            //Ver de crear un array con los datos de personas y asistencias(un join de ambas)
            //Lista de asistencias
            requestAsistencia.success(function(data2) {
                if(data2.length>0){
                    auxAsistencia = data2;
                    requestAfiliacion.success(function(data3) {
                        if(data3.length>0) {   
                            auxAfiliacion=data3;            //Ver de crear un array con los datos de personas y asistencias(un join de ambas)
                        

                            //recorro la lista y armo una lista resultante.campos a tener en 
    //cuenta createdAt,updatedAt, id y documento
    //eligo una persona    
 
        for(var a=0;a<auxPersona.length;a++){
            laPersona=auxPersona[a];
            //busco si la persona tiene una afiliacion activa(estado=1)
            for( var b=0;b<auxAfiliacion.length;b++){
                laAfiliacion=auxAfiliacion[b];
                if(laAfiliacion.documento==laPersona.documento && laAfiliacion.estado==1){
                    //busco las asistencias del afiliado activo
                    for(var c=0;c<auxAfiliacion.length;c++){
                        laAsistencia=auxAfiliacion[c];
                        if(laAsistencia.documento==laPersona.documento){
                            if(laAsistencia.updatedAt>=laAfiliacion.updatedAt){
                                var paraMostrar = JSON.stringify({
                                    documento: laPersona.documento,
                                    nombre: laPersona.nombre,
                                    apellido:laPersona.apellido,    
                                    fecha: laAsistencia.createdAt,
                            });
                                listaResultado.push();
                                $scope.listaAsistencia=listaResultado;
                                //Cabiar el valor de la variable $scrope. que quiero luego de los segundos que quiera
                                setTimeuot(function(){
                                 $scope.$apply(function(){
                                    $scope.listaAsistencia=listaResultado;
                                    });
                                },2000);
                            }           
                        }
                    }
                }
            }
        }
        










                        }else{
                            console.log('Data afiliacion NO EXISTE ' + data3.length);
                        }
                    });requestAfiliacion.error(function(data3){
                        console.log('Error: ' + data3); 
    }); 


                }else{
                    console.log('Data asistencias NO EXISTE ' + data2.length);
                }
            });requestAsistencia.error(function(data2){
                console.log('Error: ' + data2);
                });


        }else{
            console.log('Data personas NO EXISTE ' + data.length);
        }
    }); requestPersona.error(function(data){
        console.log('Error: ' + data); 
        });






   

   
  
    

    // Orden de la tabla
    $scope.sortType     = 'documento'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order

    $scope.setCookie = function (cookie) {
        $cookies.put('Pagocookie', cookie);
        window.location.href = "http://localhost:3000/pagos";
    }
});