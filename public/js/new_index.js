var app = angular.module('Gimnasio-Web', ['ngMaterial', 'ngMessages', 'ngCookies']);

app.controller('Main', function ($scope, $http, $mdToast, $q, $window, $rootScope, $mdDialog, $cookies) {

   var chkLogin = $cookies.get('login');
    //console.log(chkLogin);
    if (chkLogin==0 || !chkLogin) {
        console.log('bla');
        window.location.href = "/login";
    }
    
    $scope.busco = false;
    var aux = false;
    var busqueda = '';

    $scope.cambioBusco = function (busco) {
        $scope.busco = !busco;
        aux = $scope.busco;
    };

    $scope.cambioBusqueda = function (bus) {
        busqueda = bus;
    };

    $scope.hgt = $window.innerHeight * 0.81;

    $scope.cargando = 1;
    $scope.unaPersona = 0;

    $scope.sexos = ('Masculino Femenino').split(' ').map(function (sexo) {
        return { abbrev: sexo };
    });

    $scope.profesiones = [
        { value: 1, abbrev: 'Estudiante' },
        { value: 2, abbrev: 'Empleado' },
        { value: 3, abbrev: 'Desocupado' }
    ];

    getPersonas();

    // Funcion para seleccionar una persona
    $scope.BindSelPersona = function (persona) {
        //$scope.busqueda = null;
        //$scope.busco = null;	


        if (aux) {
            $scope.busco = false;
            $scope.$apply;
        }

        if (busqueda.length > 0) {
            $scope.busqueda = '';
            $scope.$apply;
        }

        if (persona) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Usted selecciono: ' + persona.nombre)
            );
            console.log('selecciono una linea');
        } else {
            console.log('creando una persona');
        }

        getUnaPersona(persona);

    }


    // Funcion para seleccionar una persona
    $scope.addPersona = function () {
        $scope.unaPersona = 2;
        $scope.validar = false;
    }

    // Funcion para obtener todas las personas
    function getPersonas() {

        $scope.personas = {};

        var request = $http.get('/api/personas').then(function (personas) {
            $scope.personas = personas.data;
            console.log(personas.data);
        });

        $q.all([request]);
        $scope.cargando = 0;
    }

    // Cargo los datos de una persona en la otra pantalla
    function getUnaPersona(persona) {
        // Inicializo los datos en vacio para despues cargarle algo (si tienen) en los combos de Interees
        $scope.objetivos = [];
        $scope.hacerlos = [];
        $scope.lograrlos = [];
        $scope.interesas = [];
        $scope.enteres = [];
        $scope.avisans = [];
        $scope.planActivo = null;
        $scope.unaPersona = 0;

        // Tengo que ir a buscar los datos a la BD
        $scope.persona = angular.copy(persona);

        // Voy a buscar los intereses/categorias cargados en la bd
        var request = $http.get('/api/itemcategoria').then(function (itemsCategoria) {
            var categorias = itemsCategoria.data;
            console.log(itemsCategoria.data);

            for (var i = 0; i < categorias.length; i++) {

                var insert = { name: categorias[i].descripcion, id: categorias[i].id };

                switch (categorias[i].tipo) {
                    case 1:
                        $scope.objetivos.push(insert);
                        break;
                    case 2:
                        $scope.hacerlos.push(insert);
                        break;
                    case 3:
                        $scope.lograrlos.push(insert);
                        break;
                    case 4:
                        $scope.interesas.push(insert);
                        break;
                    case 5:
                        $scope.enteres.push(insert);
                        break;
                    case 6:
                        $scope.avisans.push(insert);
                        break;
                }
            }

        });

        var selectedObjetivos = [];
        var selectedHacerlo = [];
        var selectedLograrlo = [];
        var selectedInteresa = [];
        var selectedEntere = [];
        var selectedAvisan = [];

        if (persona) {
            documento = $scope.persona.documento;

            // Voy a buscar los datos cargados de la persona
            var request = $http.get('/api/listPerCategorias?documento=' + documento).then(function (perCategoria) {

                if (perCategoria.data[0]) {
                    var categorias = perCategoria.data[0].categoria;

                    for (var i = 0; i < categorias.length; i++) {

                        var insert = categorias[i].itemcategorium.id;

                        switch (categorias[i].itemcategorium.tipo) {
                            case 1:
                                selectedObjetivos.push(insert);
                                break;
                            case 2:
                                selectedHacerlo.push(insert);
                                break;
                            case 3:
                                selectedLograrlo.push(insert);
                                break;
                            case 4:
                                selectedInteresa.push(insert);
                                break;
                            case 5:
                                selectedEntere.push(insert);
                                break;
                            case 6:
                                selectedAvisan.push(insert);
                                break;
                        }
                    }
                }
            });

            $scope.selectedObjetivos = selectedObjetivos;
            $scope.selectedHacerlo = selectedHacerlo;
            $scope.selectedLograrlo = selectedLograrlo;
            $scope.selectedInteresa = selectedInteresa;
            $scope.selectedEntere = selectedEntere;
            $scope.selectedAvisan = selectedAvisan;

            $scope.cambioObjetivo(selectedObjetivos);
            $scope.cambioHacerlo(selectedHacerlo);
            $scope.cambioLograrlo(selectedLograrlo);
            $scope.cambioInteresa(selectedInteresa);
            $scope.cambioEntere(selectedEntere);
            $scope.cambioAvisan(selectedAvisan);

            // Voy a buscar los comentarios de la persona
            var request = $http.get('/api/listPerComentarios?documento=' + documento).then(function (perComentario) {
                if (perComentario.data[0]) {
                    $scope.comentarios = perComentario.data[0].comentarios;
                    console.log($scope.comentarios);
                }

            });

            // Voy a buscar las afiliaciones con sus pagos de la persona
            var request = $http.get('/api/listTodosPagos?documento=' + documento).then(function (perPago) {
                if (perPago.data[0]) {
                    $scope.afiliaciones = perPago.data[0].afiliacions;
                    console.log($scope.afiliaciones);
                    $scope.planActivo = perPago.data[0].afiliacions[0].plans[0];
                }
            });

            // Voy a buscar las licencias de la persona
            var request = $http.get('/api/lstAfiLicencia?documento=' + documento).then(function (perLicencia) {
                if (perLicencia.data[0]) {
                    $scope.afiLicencias = perLicencia.data[0].afiliacions;
                    console.log($scope.afiLicencias);
                }
            });
        }
        $scope.unaPersona = 1;
    };

    // Funcion para insertar CI una persona
    $scope.insertPersona = function (documento) {
        var parameter = JSON.stringify({
            documento: documento,
        });

        var request = $http.post('/api/insPersonaAfi/', parameter).then(function (respuesta) {
            $scope.persona = respuesta;   
            console.log(respuesta); 
            getUnaPersona(respuesta.data);
            //getPersonas();
        });

    }

    function validation_digit (ci) {
        var a = 0;
        var i = 0;

        for (i = 0; i < 7; i++) {
            a += (parseInt("2987634"[i]) * parseInt(ci[i])) % 10;
        }
        if (a % 10 === 0) {
            return 0;
        } else {
            return 10 - a % 10;
        }
    }

    $scope.validate_ci = function(ci) {
        ci = clean_ci(ci);
        var dig = ci[ci.length - 1];
        ci = ci.replace(/[0-9]$/, '');
        validar = (dig == validation_digit(ci));
        console.log(validar);
        $scope.validar = validar ;
    }

    function random_ci() {
        var ci = Math.floor(Math.random() * 10000000).toString();
        ci = ci.substring(0, 7) + validation_digit(ci);
        return ci;
    }

    function clean_ci(ci) {
        return ci.replace(/\D/g, '');
    }

    // ------------------------------------------------
    // Actualizacion de datos

    $scope.actPersonales = function () {
        var parameter = JSON.stringify({
            nombre: $scope.persona.nombre,
            apellido: $scope.persona.apellido,
            sexo: $scope.persona.sexo,
            email: $scope.persona.email,
            telefono: $scope.persona.telefono,
            emergencia: $scope.persona.emergencia,
            fechaN: $scope.persona.fechaN,
            idprofesion: $scope.persona.idprofesion,
            direccion: $scope.persona.direccion
        });

        var request = $http.put('/api/personas/' + documento, parameter).then(function (respuesta) {
            console.log(respuesta);
            getPersonas();
            getUnaPersona($scope.persona);
        });
    };

    $scope.actContacto = function () {
        var parameter = JSON.stringify({
            contactofamilia: $scope.persona.contactofamilia,
            nombrecontacto: $scope.persona.nombrecontacto
        });

        var request = $http.put('/api/personas/' + documento, parameter).then(function (respuesta) {
            console.log(respuesta);
        });

        // Borro todo lo que ya tiene cargado
        var request = $http.delete('/api/categoria/' + documento).then(function (respuesta) {
            console.log(respuesta);
        });

        // Inserto los combo de objetivos  
        selectedObjetivos = $scope.objs;

        for (var i = 0; i < selectedObjetivos.length; i++) {
            var parameter = JSON.stringify({
                personaDocumento: $scope.persona.documento,
                itemcategoriumId: selectedObjetivos[i]
            });

            console.log(parameter);

            var request = $http.post('/api/categoria', parameter).then(function (respuesta) {
                console.log(respuesta);
            });
        }

        // Inserto los combo de Hacerlo  
        selectedHacerlo = $scope.hcrl;

        for (var i = 0; i < selectedHacerlo.length; i++) {
            var parameter = JSON.stringify({
                personaDocumento: $scope.persona.documento,
                itemcategoriumId: selectedHacerlo[i]
            });

            console.log(parameter);

            var request = $http.post('/api/categoria', parameter).then(function (respuesta) {
                console.log(respuesta);
            });
        }

        // Inserto los combo de Lograrlo
        selectedLograrlo = $scope.lgrl;
        if (selectedLograrlo.length > 0) {
            for (var i = 0; i < selectedLograrlo.length; i++) {
                var parameter = JSON.stringify({
                    personaDocumento: $scope.persona.documento,
                    itemcategoriumId: selectedLograrlo[i]
                });

                console.log(parameter);

                var request = $http.post('/api/categoria', parameter).then(function (respuesta) {
                    console.log(respuesta);
                });
            }
        }

        // Inserto los combo de Interesa 
        selectedInteresa = $scope.int;
        if (selectedInteresa.length > 0) {
            for (var i = 0; i < selectedInteresa.length; i++) {
                var parameter = JSON.stringify({
                    personaDocumento: $scope.persona.documento,
                    itemcategoriumId: selectedInteresa[i]
                });

                console.log(parameter);

                var request = $http.post('/api/categoria', parameter).then(function (respuesta) {
                    console.log(respuesta);
                });
            }
        }

        // Inserto los combo de Entere  
        selectedEntere = $scope.ent;
        if (selectedEntere.length > 0) {
            for (var i = 0; i < selectedEntere.length; i++) {
                var parameter = JSON.stringify({
                    personaDocumento: $scope.persona.documento,
                    itemcategoriumId: selectedEntere[i]
                });

                console.log(parameter);

                var request = $http.post('/api/categoria', parameter).then(function (respuesta) {
                    console.log(respuesta);
                });
            }
        }

        // Inserto los combo de Avisan  
        selectedAvisan = $scope.avi;
        if (selectedAvisan.length > 0) {
            for (var i = 0; i < selectedAvisan.length; i++) {
                var parameter = JSON.stringify({
                    personaDocumento: $scope.persona.documento,
                    itemcategoriumId: selectedAvisan[i]
                });

                console.log(parameter);

                var request = $http.post('/api/categoria', parameter).then(function (respuesta) {
                    console.log(respuesta);
                });
            }
        }
    getPersonas();
    getUnaPersona($scope.persona);
    }

    // ------------------------------------------------
    // Modales para insertar
    $scope.showAdvanced = function (ev) {
        // Voy a buscar los valores del codigo de comentarios
        var request = $http.get('/api/itemcomentarios').then(function (itemcomentarios) {

            console.log(itemcomentarios.data);

            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'insertComentario',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen,
                locals: {
                    tipos: itemcomentarios.data,
                    documento: $scope.persona.documento
                }
            })
                .then(function () {
                    getUnaPersona($scope.persona);
                });

        });
    };

    function DialogController($scope, $mdDialog, tipos, documento) {
        $scope.tipos = tipos;

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.answer = function (answer) {
            $mdDialog.hide(answer);

            var parameter = JSON.stringify({
                titulo: answer.titulo,
                comentario: answer.comentario,
                itemcomentarioId: answer.itemcomentarioId,
                personaDocumento: documento
            });
            console.log(parameter);
            // inserto el nuevo comentario
            var request = $http.post('/api/comentarios', parameter).then(function (respuesta) {
                console.log(respuesta);
            });
        };

    };

    $scope.showPago = function (ev) {
        // Voy a buscar los valores que tengo hasta ahora
        // Voy a buscar los valores del codigo de comentarios
        var request = $http.get('/api/mediopago').then(function (mediospagos) {
            console.log(mediospagos.data);

            $mdDialog.show({
                controller: PagoController,
                templateUrl: 'insertPago',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen,
                locals: {
                    planActivo: $scope.planActivo,
                    mediospagos: mediospagos.data
                }
            })
                .then(function () {
                    getUnaPersona($scope.persona);
                });
        });

    };

    function PagoController($scope, $mdDialog, planActivo, mediospagos) {
        $scope.plan = planActivo;
        $scope.cuota = planActivo.cuotasvan + 1;
        $scope.importe = (planActivo.importeplan - planActivo.importepago) / (planActivo.cuotasson - planActivo.cuotasvan);
        $scope.mediospagos = mediospagos;

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.answer = function (answer) {
            $mdDialog.hide(answer);

            let importePago = planActivo.importepago + answer.importe;

            if (importePago >= planActivo.importeplan) {
                // Tengo que actualizar las cuotas por el total
                var parameter = JSON.stringify({
                    cuotasvan: planActivo.cuotasson,
                    importepago: importePago
                });
            } else {
                var parameter = JSON.stringify({
                    cuotasvan: answer.cuota,
                    importepago: importePago
                });
            }


            console.log(parameter);
            // Actualizo los datos del plan
            var request = $http.put('/api/planes/' + planActivo.id, parameter).then(function (respuesta) {
                console.log(respuesta);
            });

            let d = new Date();
            let mes = d.getMonth() + 1;
            let anio = d.getFullYear();

            // Inserto el pago
            var parameter = JSON.stringify({
                mes: mes,
                anio: anio,
                importe: answer.importe,
                tipomovimiento: 1,
                concepto: 1,
                pagoanulado: 0,
                planId: planActivo.id,
                mediopagoId: answer.mediopago
            });

            console.log(parameter);

            var request = $http.post('/api/pago', parameter).then(function (respuesta) {
                console.log(respuesta);
            });
        };

    };

    $scope.newPlan = function (ev) {
        // Voy a buscar los valores del codigo de comentarios
        var request = $http.get('/api/mediopago').then(function (mediospagos) {
            console.log(mediospagos.data);
            var request = $http.get('/api/tipoplan').then(function (tipoplanes) {
                console.log(tipoplanes.data);

                $mdDialog.show({
                    controller: PlanController,
                    templateUrl: 'insertPlan',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: $scope.customFullscreen,
                    locals: {
                        tipoplanes: tipoplanes.data,
                        mediospagos: mediospagos.data,
                        afi: $scope.afiliaciones[0].id
                    }
                })
                    .then(function () {
                        getUnaPersona($scope.persona);
                    });
            });
        });

    };

    function PlanController($scope, $mdDialog, tipoplanes, mediospagos, afi) {

        $scope.tipoplanes = tipoplanes;
        $scope.mediospagos = mediospagos;
        $scope.afi = afi;
        let d = new Date();
        $scope.inicio = d;

        $scope.cambioPlan = function (id) {

            if (id) {
                var duracion_aux = tipoplanes.filter(function (item) {
                    return item.id == id;
                })[0];

                $scope.duracion = duracion_aux.duracion;

                let aux = $scope.inicio;
                let otro = new Date();
                otro.setDate(aux.getDate() + duracion_aux.duracion * 30);
                $scope.fin = otro;
            };
        };
        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.answer = function (answer) {
            $mdDialog.hide(answer);

            // Inserto el plan
            var parameter = JSON.stringify({
                importeplan: answer.importe,
                importepago: 0,
                duracion: answer.duracion,
                inicio: moment(answer.inicio).format('YYYY-MM-DD'),
                fin: moment(answer.fin).format('YYYY-MM-DD'),
                cuotasson: answer.cuotas,
                cuotasvan: 0,
                tipoplanId: answer.tipoplan,
                mediopagoId: answer.mediopago,
                afiliacionId: afi
            });

            console.log(parameter);

            var request = $http.post('/api/planes', parameter).then(function (respuesta) {
                console.log(respuesta);
            });

        };

    };

    $scope.newLicencia = function (ev) {
        // Voy a buscar los valores de tipos de licencia
        var request = $http.get('/api/motivolicencia').then(function (tiposlic) {
            console.log(tiposlic.data);

            $mdDialog.show({
                controller: LicenciaController,
                templateUrl: 'insertLicencia',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen,
                locals: {
                    tiposlic: tiposlic.data,
                    afi: $scope.afiliaciones[0].id
                }
            })
                .then(function () {
                    getUnaPersona($scope.persona);
                });

        });

    };

    function LicenciaController($scope, $mdDialog, tiposlic, afi) {

        $scope.tipos = tiposlic;
        $scope.afi = afi;

        let d = new Date();
        $scope.desde = d;
        $scope.hasta = d;

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
            console.log(answer);
            // Inserto la licencia
            var parameter = JSON.stringify({
                descripcion: answer.comentario,
                inicio: moment(answer.desde).format('YYYY-MM-DD'),
                fin: moment(answer.hasta).format('YYYY-MM-DD'),
                motivolicenciumId: answer.itemcomentarioId,
                afiliacionId: afi
            });

            console.log(parameter);

            var request = $http.post('/api/licencia', parameter).then(function (respuesta) {
                console.log(respuesta);
            });

        };

    };

    // ------------------------------------------------
    // Eliminar    
    $scope.deleteComentario = function (id) {
        var request = $http.delete('/api/comentarios/' + id).then(function (respuesta) {
            console.log(respuesta);
            getPersonas();
            getUnaPersona($scope.persona);
        });
    };

    $scope.deletePago = function (pago, plan) {
        
        var parameter = JSON.stringify({
            planId: plan.id,
            id: pago.id,
            flag: 0
        });

        console.log(parameter);
        
        // Actualizar total del plan
        var request = $http.put('/api/pago/', parameter).then(function (respuesta) {
            console.log(respuesta);
            getPersonas();
            getUnaPersona($scope.persona);
        });
    };

    $scope.deletePlan = function (id) {
        var request = $http.delete('/api/planes/' + id).then(function (respuesta) {
            console.log(respuesta);
            getPersonas();
            getUnaPersona($scope.persona);
        });
    };

    $scope.deleteLicencia = function (id) {
        var request = $http.delete('/api/licencia/' + id).then(function (respuesta) {
            console.log(respuesta);
            getPersonas();
            getUnaPersona($scope.persona);
        });
    };

    // ------------------------------------------------
    // Actualizacion datos en la pantalla    
    $scope.cambioObjetivo = function (objetivos) {
        $scope.objs = objetivos;
    };

    $scope.cambioHacerlo = function (hacerlo) {
        $scope.hcrl = hacerlo;
    };

    $scope.cambioLograrlo = function (logro) {
        $scope.lgrl = logro;
    };

    $scope.cambioInteresa = function (interes) {
        $scope.int = interes;
    };

    $scope.cambioEntere = function (entere) {
        $scope.ent = entere;
    };

    $scope.cambioAvisan = function (avisa) {
        $scope.avi = avisa;
    };

});

app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default');

    var xoMap = $mdThemingProvider.extendPalette('purple', {
        '500': '833A96'
    });

    $mdThemingProvider.definePalette('XO-Main', xoMap);

    $mdThemingProvider.theme('forest')
        .primaryPalette('XO-Main')
        .accentPalette('light-blue', {
            "default": "500",
            "hue-1": "50"
        });
});


app.controller('asistencia', function ($scope, $http, $mdToast, $q, $window, $rootScope, $mdDialog, $cookies) {
 console.log('HOLAAAA');
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
                                //encontreUltima=true;
                                    //convierto fecha para comparar
                                    var fechaAsist = mostararFecha(laAsistencia.updatedAt,2);
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

app.config(function ($mdDateLocaleProvider) {

    $mdDateLocaleProvider.months = ['enero', 'febrero', 'marzo', 'abril','mayo', 'junio', 'julio','agosto', 'setiembre', 'octubre', 'noviembre', 'diciembre'];
    $mdDateLocaleProvider.shortMonths = ['ene', 'feb', 'mar', 'abr','may', 'jun', 'jul','ago', 'set', 'oct', 'nov', 'dic'];
    $mdDateLocaleProvider.days = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
    $mdDateLocaleProvider.shortDays = ['dom', 'lun', 'mar', 'mier', 'jue', 'vie', 'sab'];

    // Can change week display to start on Monday.
    $mdDateLocaleProvider.firstDayOfWeek = 1;

    $mdDateLocaleProvider.formatDate = function(date) {
        return moment(date).format('DD/MM/YYYY');
      };
});
