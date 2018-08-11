var app = angular.module('inasistencia', ['ngCookies'])

app.controller('myController', function($scope, $http, $cookies, $q) {

    //variable para front end
    $scope.data = [];

    //variables fecha del dia
    var f = new Date(); 
    var fecha=  f.getFullYear()+ "-" +(f.getMonth() +1)+"-"+f.getDate()+" "+ f.getHours()+":"+f.getMinutes()+":"+f.getSeconds()+"."+f.getMilliseconds();
    var fechaDia=new Date(fecha);

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
                                //convierto fecha para comparar
                                var fechaAsist = new Date(laAsistencia.updatedAt);
                                console.log(fechaDia-fechaAsist );
                                //si resto la fecha de entrada menos la fecha actual y estoy dentro del mismo año para una semana el resultado es -7000000
                                //si resto la fecha de entrada menos la fecha actual y se cambia añ año siguiente para una semana el resultado es -8876000000                                
                                if(fechaDia-fechaAsist>616948454){
                                    //console.log("hace una semana q no viene");
                                    var auxFecha = laAsistencia.updatedAt.toString();
                                    var fechaMostar=auxFecha.slice(0, 10)+ " " + auxFecha.slice(11, 16);
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
                }
            }  //console.log($scope.data.length);
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
        $cookies.put('Pagocookie', cookie);
        window.location.href = "/pagos";
    }             
                    
   


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