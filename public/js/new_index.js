var app = angular.module('Gimnasio-Web', ['ngMaterial', 'ngMessages']);

app.controller('Main', function($scope,$http, $mdToast, $q, $window, $rootScope, $mdDialog) {
	
    $scope.busco = false;    
    var aux = false;
    var busqueda = '';

    $scope.cambioBusco = function(busco){
        $scope.busco = !busco;
        aux = $scope.busco;
    };

    $scope.cambioBusqueda = function(bus){
        busqueda = bus;
    };    

	$scope.hgt = $window.innerHeight * 0.81;
	
	$scope.cargando = 1;
	$scope.unaPersona = 0;

    $scope.sexos = ('Masculino Femenino').split(' ').map(function(sexo) {
        return {abbrev: sexo};
     });

    $scope.profesiones = [
        {value: 1, abbrev: 'Estudiante'},
        {value: 2, abbrev: 'Empleado'},
        {value: 3, abbrev: 'Desocupado'}
    ];

	getPersonas();

	// Funcion para seleccionar una persona
	$scope.BindSelPersona = function (persona){
        //$scope.busqueda = null;
        //$scope.busco = null;	
        
        
        if (aux) {
            $scope.busco = false;
            $scope.$apply;
        }

        if(busqueda.length>0){
            $scope.busqueda = '';
            $scope.$apply;
        }

        $mdToast.show(
			$mdToast.simple()
			.textContent('Usted selecciono: ' + persona.nombre)
			); 
		console.log('selecciono una linea');
		getUnaPersona(persona);
        

	}

	// Funcion para obtener todas las personas
	function getPersonas(){

		$scope.personas = {};

		var request = $http.get('/api/personas').then(function(personas) { 
			$scope.personas = personas.data;
			console.log(personas.data);
		});

		$q.all([request]);
		$scope.cargando = 0;
	}

	// Cargo los datos de una persona en la otra pantalla
	function getUnaPersona(persona){
        // Inicializo los datos en vacio para despues cargarle algo (si tienen) en los combos de Interees
        $scope.objetivos  = [];
        $scope.hacerlos   = [];
        $scope.lograrlos  = [];
        $scope.interesas  = [];
        $scope.enteres    = [];
        $scope.avisans    = [];

        $scope.unaPersona = 0;        
		
		// Tengo que ir a buscar los datos a la BD
		$scope.persona = angular.copy(persona);
        
        documento = $scope.persona.documento;

        // Voy a buscar los intereses/categorias cargados en la bd
        var request = $http.get('/api/itemcategoria').then(function(itemsCategoria) { 
            var categorias = itemsCategoria.data;
            console.log(itemsCategoria.data);

            for (var i = 0 ; i < categorias.length; i++) {
                
                var  insert = {name: categorias[i].descripcion, id: categorias[i].id };

                switch(categorias[i].tipo) {
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
        var selectedHacerlo   = [];
        var selectedLograrlo  = [];
        var selectedInteresa  = [];
        var selectedEntere    = [];
        var selectedAvisan    = [];        

        // Voy a buscar los datos cargados de la persona
        var request = $http.get('/api/listPerCategorias?documento='+ documento).then(function(perCategoria) {
            var categorias = perCategoria.data[0].categoria;

            for (var i = 0 ; i < categorias.length; i++) {

                var insert = categorias[i].itemcategorium.id ;

                switch(categorias[i].itemcategorium.tipo) {
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
        });

        $scope.selectedObjetivos = selectedObjetivos;
        $scope.selectedHacerlo   = selectedHacerlo;
        $scope.selectedLograrlo  = selectedLograrlo;
        $scope.selectedInteresa  = selectedInteresa;
        $scope.selectedEntere    = selectedEntere;
        $scope.selectedAvisan    = selectedAvisan;

        $scope.cambioObjetivo(selectedObjetivos);
        $scope.cambioHacerlo(selectedHacerlo);
        $scope.cambioLograrlo(selectedLograrlo);
        $scope.cambioInteresa(selectedInteresa);
        $scope.cambioEntere(selectedEntere);
        $scope.cambioAvisan(selectedAvisan);

        // Voy a buscar los comentarios de la persona
        var request = $http.get('/api/listPerComentarios?documento='+ documento).then(function(perComentario) {
            $scope.comentarios = perComentario.data[0].comentarios;
            console.log($scope.comentarios);
        });

        // Voy a buscar las afiliaciones con sus pagos de la persona
        var request = $http.get('/api/listTodosPagos?documento='+ documento).then(function(perPago) {
            $scope.afiliaciones = perPago.data[0].afiliacions;
            console.log($scope.afiliaciones);
            $scope.planActivo = perPago.data[0].afiliacions[0].plans[0];
        });

        // Voy a buscar las licencias de la persona
        var request = $http.get('/api/lstAfiLicencia?documento='+ documento).then(function(perLicencia) {
            $scope.afiLicencias = perLicencia.data[0].afiliacions;
            console.log($scope.afiLicencias);
        });

        $scope.unaPersona = 1;
	};

    $scope.actPersonales = function(){
        var parameter = JSON.stringify({
            nombre       : $scope.persona.nombre,
            apellido     : $scope.persona.apellido,
            sexo         : $scope.persona.sexo,            
            email        : $scope.persona.email,
            telefono     : $scope.persona.telefono,
            emergencia   : $scope.persona.emergencia,
            fechaN       : $scope.persona.fechaN,
            idprofesion  : $scope.persona.idprofesion,
            direccion    : $scope.persona.direccion
        });

        var request = $http.put('/api/personas/'+ documento, parameter).then(function(respuesta) {
            console.log(respuesta);
            getPersonas();
            getUnaPersona($scope.persona);
        });
    };

    $scope.actContacto = function(){
        var parameter = JSON.stringify({
            contactofamilia       : $scope.persona.contactofamilia,
            nombrecontacto        : $scope.persona.nombrecontacto
        });

        var request = $http.put('/api/personas/'+ documento, parameter).then(function(respuesta) {
            console.log(respuesta);
            //getPersonas();
            //getUnaPersona($scope.persona);
        });

        // Borro todo lo que ya tiene cargado
        var request = $http.delete('/api/categoria/' + documento).then(function(respuesta) {
            console.log(respuesta);
        });

        // Inserto los combo de objetivos  
        selectedObjetivos = $scope.objs;

        for (var i = 0 ; i < selectedObjetivos.length; i++) {
            var parameter = JSON.stringify({
                personaDocumento : $scope.persona.documento,
                itemcategoriumId : selectedObjetivos[i]
            });

            console.log(parameter);

            var request = $http.post('/api/categoria', parameter).then(function(respuesta) {
                console.log(respuesta);
            });
        }

        // Inserto los combo de Hacerlo  
        selectedHacerlo = $scope.hcrl;  

        for (var i = 0 ; i < selectedHacerlo.length; i++) {
            var parameter = JSON.stringify({
                personaDocumento : $scope.persona.documento,
                itemcategoriumId : selectedHacerlo[i]
            });

            console.log(parameter);

            var request = $http.post('/api/categoria', parameter).then(function(respuesta) {
                console.log(respuesta);
            });
        }

        // Inserto los combo de Lograrlo
        selectedLograrlo = $scope.lgrl;
        if (selectedLograrlo.length > 0 ) {
            for (var i = 0 ; i < selectedLograrlo.length; i++) {
                var parameter = JSON.stringify({
                    personaDocumento : $scope.persona.documento,
                    itemcategoriumId : selectedLograrlo[i]
                });

                console.log(parameter);

                var request = $http.post('/api/categoria', parameter).then(function(respuesta) {
                    console.log(respuesta);
                });
            }
        }

        // Inserto los combo de Interesa 
        selectedInteresa = $scope.int;
        if (selectedInteresa.length > 0) {
            for (var i = 0 ; i < selectedInteresa.length; i++) {
                var parameter = JSON.stringify({
                    personaDocumento : $scope.persona.documento,
                    itemcategoriumId : selectedInteresa[i]
                });

                console.log(parameter);

                var request = $http.post('/api/categoria', parameter).then(function(respuesta) {
                    console.log(respuesta);
                });
            }
        }

        // Inserto los combo de Entere  
        selectedEntere = $scope.ent;
        if (selectedEntere.length > 0) {
            for (var i = 0 ; i < selectedEntere.length; i++) {
                var parameter = JSON.stringify({
                    personaDocumento : $scope.persona.documento,
                    itemcategoriumId : selectedEntere[i]
                });

                console.log(parameter);

                var request = $http.post('/api/categoria', parameter).then(function(respuesta) {
                    console.log(respuesta);
                });
            }
        }

        // Inserto los combo de Avisan  
        selectedAvisan = $scope.avi;
        if (selectedAvisan.length > 0 ) {
            for (var i = 0 ; i < selectedAvisan.length; i++) {
                var parameter = JSON.stringify({
                    personaDocumento : $scope.persona.documento,
                    itemcategoriumId : selectedAvisan[i]
                });

                console.log(parameter);

                var request = $http.post('/api/categoria', parameter).then(function(respuesta) {
                    console.log(respuesta);
                });
            }        
        }
    }

    $scope.showAdvanced = function(ev) {
        // Voy a buscar los valores del codigo de comentarios
        var request = $http.get('/api/itemcomentarios').then(function(itemcomentarios) { 

            console.log(itemcomentarios.data);

            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'insertComentario',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: $scope.customFullscreen,
                locals: {
                    tipos: itemcomentarios.data,
                    documento: $scope.persona.documento
                }
            })
            .then(function() {
                getUnaPersona($scope.persona);
            });

        });        
    };

    function DialogController($scope, $mdDialog, tipos, documento) {
        $scope.tipos = tipos;

        $scope.hide = function() {
          $mdDialog.hide();
        };

        $scope.cancel = function() {
          $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
            
            var parameter = JSON.stringify({
                titulo: answer.titulo,
                comentario: answer.comentario,
                itemcomentarioId: answer.itemcomentarioId,
                personaDocumento: documento
            });
            console.log(parameter);
            // inserto el nuevo comentario
            var request = $http.post('/api/comentarios', parameter).then(function(respuesta) {
                console.log(respuesta);
            });
        };

    };

    $scope.showPago = function(ev) {
        // Voy a buscar los valores que tengo hasta ahora
        // Voy a buscar los valores del codigo de comentarios
        var request = $http.get('/api/mediopago').then(function(mediospagos) { 
            console.log(mediospagos.data);

            $mdDialog.show({
                controller: PagoController,
                templateUrl: 'insertPago',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: $scope.customFullscreen,
                locals: {
                    planActivo: $scope.planActivo,
                    mediospagos: mediospagos.data
                }
            })
            .then(function() {
                getUnaPersona($scope.persona);
            });
        });
            
    };

    function PagoController($scope, $mdDialog, planActivo, mediospagos) {
        $scope.plan = planActivo;
        $scope.cuota = planActivo.cuotasvan + 1;
        $scope.importe = (planActivo.importeplan - planActivo.importepago) / (planActivo.cuotasson - planActivo.cuotasvan);
        $scope.mediospagos = mediospagos;

        $scope.hide = function() {
          $mdDialog.hide();
        };

        $scope.cancel = function() {
          $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
            
            let importePago = planActivo.importepago + answer.importe;

            if (importePago >= planActivo.importeplan){
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
            var request = $http.put('/api/planes/' + planActivo.id, parameter).then(function(respuesta) {
                console.log(respuesta);
            });

            let d = new Date();
            let mes = d.getMonth()+1;
            let anio= d.getFullYear();

            // Inserto el pago
            var parameter = JSON.stringify({
                mes:  mes,
                anio: anio,
                importe: answer.importe,
                tipomovimiento: 1,
                concepto: 1,
                pagoanulado: 0,
                planId: planActivo.id,
                mediopagoId: answer.mediopago
            }); 

            console.log(parameter);

            var request = $http.post('/api/pago' , parameter).then(function(respuesta) {
                console.log(respuesta);
            });           
        };

    };

    $scope.newPlan = function(ev) {
        // Voy a buscar los valores del codigo de comentarios
        var request = $http.get('/api/mediopago').then(function(mediospagos) { 
            console.log(mediospagos.data);
            var request = $http.get('/api/tipoplan').then(function(tipoplanes) { 
                console.log(tipoplanes.data);

                $mdDialog.show({
                    controller: PlanController,
                    templateUrl: 'insertPlan',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true,
                    fullscreen: $scope.customFullscreen,
                    locals: {
                        tipoplanes: tipoplanes.data,
                        mediospagos: mediospagos.data,
                        afi: $scope.afiliaciones[0].id
                    }
                })
                .then(function() {
                    getUnaPersona($scope.persona);
                });
            });
        });
            
    };

    function PlanController($scope, $mdDialog, tipoplanes, mediospagos, afi) {

        $scope.tipoplanes = tipoplanes;
        $scope.mediospagos = mediospagos;
        $scope.afi = afi;


        $scope.hide = function() {
          $mdDialog.hide();
        };

        $scope.cancel = function() {
          $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
/*
            // Inserto el pago
            var parameter = JSON.stringify({
                mes:  mes,
                anio: anio,
                importe: answer.importe,
                tipomovimiento: 1,
                concepto: 1,
                pagoanulado: 0,
                planId: planActivo.id,
                mediopagoId: answer.mediopago
            }); 

            console.log(parameter);

            var request = $http.post('/api/pago' , parameter).then(function(respuesta) {
                console.log(respuesta);
            });           
            */
        };

    };

    $scope.cambioObjetivo = function(objetivos){
        $scope.objs = objetivos;
    };

    $scope.cambioHacerlo = function(hacerlo){
        $scope.hcrl = hacerlo;
    };

    $scope.cambioLograrlo = function(logro){
        $scope.lgrl = logro;
    };

    $scope.cambioInteresa = function(interes){
        $scope.int = interes;
    };

    $scope.cambioEntere = function(entere){
        $scope.ent = entere;
    };

    $scope.cambioAvisan = function(avisa){
        $scope.avi = avisa;
    };                    
    

});

app.config(function($mdThemingProvider){
	$mdThemingProvider.theme('default');
});

