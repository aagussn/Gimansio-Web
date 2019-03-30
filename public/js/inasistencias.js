var app = angular.module('GimnasioWeb', ['ngMaterial', 'ngMessages', 'ngCookies']);

app.controller('inasistencia', function ($scope, $http, $mdToast, $q, $window, $rootScope, $mdDialog, $cookies) {

    var chkLogin = $cookies.get('login');
    //console.log(chkLogin);
    if (chkLogin==0 || !chkLogin) {
        console.log('bla');
        window.location.href = "/login";
    }
    
    //variables fecha del dia
    var f = new Date(); 
    var fechaDia=mostararFecha(f,2);

    $scope.lstInsasit = [];

    var request= $http.get("/api/lstAfi1Asis").then(function(asistenciasLs) {
        //verifico que la lista no este vacia
        if(asistenciasLs.data.length>0){
            var lstAsistencias=asistenciasLs.data;
            console.log("resultado de consulta " +lstAsistencias.length);
            //agrego los datos que quiero a la lista resultante
            for(var a=0;a<lstAsistencias.length;a++){
                var persona=lstAsistencias[a];
                console.log("tengo persona " + persona.documento);
                // busco las afiliacion activa y me quedo con la fecha
                for(var b=0;b<persona.afiliacions.length;b++){
                   // console.log("tiene afiliacion");
                    var laAfiliacion=persona.afiliacions[b];
                    console.log("tengo afiliacion");
                    if(laAfiliacion.estado==1){
                        console.log("afiliacion activa");
                        var cantidadAsistencias=laAfiliacion.asistencia.length;
                        //verifico que tenga asistencias
                        if(cantidadAsistencias>0){
                            console.log("asistencias de afiliacion, son: " + cantidadAsistencias);
                            //busco las asistencias mayores a la fecha de afiliacion activa
                            var encontreUltima=false;
                            for(var c=0; c<cantidadAsistencias && !encontreUltima ;c++){
                                var laAsistencia=laAfiliacion.asistencia[c];
                                console.log("tengo la asistencia" );
                                encontreUltima=true;
                                    //convierto fecha para comparar
                                    var fechaAsist = mostararFecha(laAsistencia.updatedAt,2);
                                    //console.log(fechaDia);
                                    //console.log("tengo la asistencia " +fechaAsist);
                                    //si resto la fecha de entrada menos la fecha actual y estoy dentro detach()l mismo año para una semana el resultado es -7000000
                                    //si resto la fecha de entrada menos la fecha actual y se cambia añ año siguiente para una semana el resultado es -8876000000                                
                                    //console.log((fechaDia-fechaAsist)+" la fecha " + fechaDia );
                                                         //694000 
                                    if(fechaDia-fechaAsist>616948454){
                                        console.log("hace mas de una semana que no va");
                                        //verifico si no tiene licencia activa
                                        var lstLicencias=laAfiliacion.licencia;
                                        var licencia=0;
                                        for(var d=0; d<lstLicencias.length;d++){
                                            var laLicencia=lstLicencias[d];
                                            var iniLicencia=mostararFecha(laLicencia.inicio,6);
                                            var finLicencia=mostararFecha(laLicencia.fin,6);
                                            //console.log(" licencia inicio "+iniLicencia + " licencia fin "+ finLicencia);
                                            console.log("variable licnecia " +licencia );
                                            console.log((fechaAsist>iniLicencia)+" inicio " );
                                            console.log((fechaAsist<finLicencia)+" fin " );
                                            if(fechaAsist>iniLicencia && fechaAsist<finLicencia){
                                                licencia=+1;
                                                console.log("esta de licencia " +licencia );

                                            }else{
                                                console.log(" no esta de licencia" );
                                                }
                                            }
                                            if(licencia==0){
                                                    var fechaMostar = mostararFecha(fechaAsist,1);
                                                    var datoValido = {
                                                    idAsis:laAsistencia.id,
                                                    documento:persona.documento,
                                                    nombre:persona.nombre, 
                                                    apellido:persona.apellido, 
                                                    tienedauda:laAsistencia.tipodeuda,
                                                    fecha:fechaMostar,
                                                };
                                                //lstCompleta.push(datoValido); 
                                                $scope.lstInsasit.push(datoValido);    
                                            }

                                               
                                    }else{ console.log("vino en la semana " );}
                                   
                            }     
                        }//fin verifico si tene asistencias
                    } //fin si tendo afiliacion en estado 1   
                }
            }
        }else{
            console.log('Data personas NO EXISTE ' + asistenciasLs.data.length);
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