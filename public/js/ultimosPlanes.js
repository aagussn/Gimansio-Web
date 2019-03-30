var app = angular.module('GimnasioWeb', ['ngMaterial', 'ngMessages', 'ngCookies']);

app.controller('ultimosplanes', function ($scope, $http, $mdToast, $q, $window, $rootScope, $mdDialog, $cookies) {

   var chkLogin = $cookies.get('login');
    //console.log(chkLogin);
    if (chkLogin==0 || !chkLogin) {
        console.log('bla');
        window.location.href = "/login";
    }
    
    //variables fecha del dia
    //var f = new Date(); 
    //var fechaDia=mostararFecha(f,2);

    $scope.lstInsasit = [];

    var request= $http.get("/api/lstAfiPln")
        .then(function(listaResultado) {
        //verifico que la lista no este vacia
        if(listaResultado.data.length>0){
            var lista=listaResultado.data;
            console.log("resultado de consulta " +lista.length);
            //agrego los datos que quiero a la lista resultante
            for(var a=0;a<lista.length;a++){
                var persona=lista[a];
                console.log("tengo persona " + persona.documento);
                // busco las afiliacion activa y me quedo con la fecha
                    var laAfiliacion=persona.afiliacions[0];
                    console.log("tengo afiliacion");
                    if(laAfiliacion.estado==1){
                        console.log("afiliacion activa");
                        //el ultimo plan de la persona
                        var planes=laAfiliacion.plans;
                        if(planes.length>0){


                        var ultimoPlan =planes[0];                                      
                        //convierto fecha para mostrar
                        //var fechaAsist = mostararFecha(ultimoPlan.incio,2);
                        //var fechaMostar = mostararFecha(fechaAsist,1);
                        var datoValido = {
                            documento:persona.documento,
                            nombre:persona.nombre, 
                            apellido:persona.apellido, 
                            finPlan:ultimoPlan.fin,
                            tipoPlan:ultimoPlan.tipoplan.descripcion,
                            cuotas:ultimoPlan.cuotasvan+"/"+ultimoPlan.cuotasson,
                            importe:ultimoPlan.importepago+"/"+ultimoPlan.importeplan,
                            medioPago:ultimoPlan.mediopago.descripcion
                        };
                        //lstCompleta.push(datoValido); 
                        $scope.lstInsasit.push(datoValido);
                    }else{
                                   console.log('no tiene plan ');
 
                    }
                    }// fin if(laAfiliacion.estado==1   
            }//fin for lista
        } //fin if(asistenciasLs.data.length>0)
        else{
            console.log('Data personas NO EXISTE ' + lista.data.length);
        }
    });


    

    $scope.setCookie = function (cookie) {
        $cookies.put('inasistenciacookie', cookie);
        window.location.href = "/inasistencia";
    }             
  
    $scope.updPersona = function (cookie) {
        var now = new Date();
        var exp = new Date(now);
        exp.setMinutes(now.getMinutes()+1)
        $cookies.put('updPersona', cookie, {'expires': exp});
        window.location.href = "/afiliacion";
    }

    function  mostararFecha(cadenaADividir1,opcion) {
            var cadenaADividir=new Date(cadenaADividir1);
           // console.log(cadenaADividir);

            var meses31=[1,3,5,7,8,10,12];
            var anio= cadenaADividir.getFullYear();
            var mes=cadenaADividir.getMonth();
            var dia=cadenaADividir.getDate();
            var hora=cadenaADividir.getHours();
            var minutos=cadenaADividir.getMinutes();
            var segundos=cadenaADividir.getSeconds();
            //var devuelvo = anio+"-"+(mes)+"-"+dia+ " "+ hora+":"+ minutos+":"+segundos;

            if(opcion==1){
                var devuelvo = anio+"-"+(mes+1)+"-"+dia+ " "+ hora+":"+ minutos+":"+segundos;
                //console.log("opcion 1 " + devuelvo);
            }   
            if(opcion==2){
                var devuelvo = new Date(anio,(mes),dia,hora,minutos,segundos) ;
               // console.log("opcion 2 " + devuelvo);
            }   
            if(opcion==3){
                //inicioDia
                var devuelvo=anio+"-"+(mes+1)+"-"+dia+ " 00:00:00";
               //console.log("opcion 3 " + devuelvo);
            }   
            if(opcion==4){
                //mediodia
                var devuelvo=anio+"-"+(mes+1)+"-"+dia+ " 13:00:00";
                //console.log("opcion 4 " + devuelvo);
            }
            if(opcion==5){
                //finDia
                var devuelvo=0;
                for(var a=0;a<7;a++){
                    m=meses31[a];
                    if(m==mes){
                        if(dia==31){
                            devuelvo=anio+"-"+(mes+2)+"-"+ 1 + " 00:00:00";
                        }else{
                            devuelvo=anio+"-"+(mes+1)+"-"+ (dia+1) + " 00:00:00";
                        }   
                    }else{
                    }
                }
                if(mes==2){
                    devuelvo=anio+"-"+(mes+2)+"-"+ 1 + " 00:00:00";
                    //console.log("opcion 5 " + devuelvo);
                }else{
                    devuelvo=anio+"-"+(mes+1)+"-"+ (dia+1) + " 00:00:00";
                    //console.log("opcion 5 " + devuelvo);
                }   
            }

             if(opcion==6){
                //para calculo fecha de licencia
                var devuelvo = new Date(anio,mes,dia,"00","00","00") ;
                //console.log("opcion 6 " + dia+" "+mes);
            }


            return devuelvo;
    }


   



  


    // Orden de la tabla
    $scope.sortType     = 'documento'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
});