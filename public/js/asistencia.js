var app = angular.module('Asistencia', ['ngCookies']);

app.controller('AsistenciaControl', function($scope, $http, $cookies) {
    $scope.data = [];
    
    var requestPersona = $http.get('/api/personas');  
    var requestAsistencia = $http.get('/api/asistencia');
    var auxPersona=null;
    var auxAsistencia=null;
    var auxAfiliacion=null;
    var listaResultado=null;

    //Lista de personas
    requestPersona.success(function(data) {
        auxPersona=data;            //Ver de crear un array con los datos de personas y asistencias(un join de ambas)
        console.log('Data personas.js');
    });
    requestPersona.error(function(data){
        console.log('Error: ' + data); 
    });

    //Lista de asistencias
     requestAsistencia.success(function(data2) {
        auxAsistencia = data2;
        console.log('Data asistencia.js');
    });
    requestAsistencia.error(function(data2){
        console.log('Error: ' + data2);
    });

    //Busco lista de afiliaciones
    requestAfiliacion.success(function(data3) {
        auxPersona=data3;            //Ver de crear un array con los datos de personas y asistencias(un join de ambas)
        console.log('Data personas.js');
    });
    requestAfiliacion.error(function(data3){
        console.log('Error: ' + data3); 
    });





    //recorro la lista y armo una lista resultante.campos a tener en 
    //cuenta createdAt,updatedAt, id y documento
    //eligo una persona    
    for(a=0;a<auxPersona.length;a++){
        laPersona=auxPersona[a];
        //busco si la persona tiene una afiliacion activa(estado=1)
        for(b=0;b<auxAfiliacion.length;b++){
            laAfiliacion=auxAfiliacion[b];
            if(laAfiliacion.documento==laPersona.documento && laAfiliacion.estado==1){
                //busco las asistencias del afiliado activo
                for(c=0;c<auxAfiliacion.length;c++){
                    laAsistencia=auxAfiliacion[c];
                    if(laAsistencia.updatedAt>=laAfiliacion.updatedAt){
                        var paraMostrar = JSON.stringify({
                            documento: laPersona.documento,
                            nombre: laPersona.nombre,
                            apellido:laPersona.apellido,    
                            fecha: laAsistencia.createdAt,
                       });
                        listaResultado.push();
                        $scope.listaAsistencia=listaResultado;
                    }
                }
            }
        }
    }


    // Orden de la tabla
    $scope.sortType     = 'documento'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order

    $scope.setCookie = function (cookie) {
        $cookies.put('Pagocookie', cookie);
        window.location.href = "http://localhost:3000/pagos";
    }
});