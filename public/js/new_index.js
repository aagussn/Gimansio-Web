var app = angular.module('Gimnasio-Web', ['ngMaterial', 'ngMessages']);

app.controller('Main', function($scope,$http, $mdToast, $q, $window, $rootScope) {
	
	$scope.hgt = $window.innerHeight * 0.89;
	
	$scope.cargando = 1;
	$scope.unaPersona = 0;

    $scope.sexos = ('Masculino Femenino').split(' ').map(function(sexo) {
        return {abbrev: sexo};
     });

    $scope.profesiones = ('Estudiante Empleado Desocupado').split(' ').map(function(sexo) {
        return {abbrev: sexo};
     });

	getPersonas();

	// Funcion para seleccionar una persona
	$scope.BindSelPersona = function (persona){
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
                
                var  insert = {name: categorias[i].descripcion, value: categorias[i].id };

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

        // Voy a buscar los comentarios de la persona
        var request = $http.get('/api/listPerComentarios?documento='+ documento).then(function(perComentario) {
            $scope.comentarios = perComentario.data[0].comentarios;
            console.log($scope.comentarios);
        });

        // Voy a buscar los pagos de la persona
        var request = $http.get('/api/listTodosPagos?documento='+ documento).then(function(perPago) {
            $scope.afiliaciones = perPago.data[0].afiliacions;
            console.log($scope.afiliaciones);
        });

        // Voy a buscar los pagos de la persona
        var request = $http.get('/api/lstAfiLicencia?documento='+ documento).then(function(perLicencia) {
            $scope.afiLicencias = perLicencia.data[0].afiliacions;
            console.log($scope.afiLicencias);
        });

        $scope.unaPersona = 1;
	};

    $scope.actPersonales = function(){
        var parameter = JSON.stringify({
            nombre     : $scope.persona.nombre,
            apellido   : $scope.persona.apellido,
            sexo       : $scope.persona.sexo,            
            email      : $scope.persona.email,
            telefono   : $scope.persona.telefono,
            emergencia : $scope.persona.emergencia,
            fechaN     : $scope.persona.fechaN,
            idprofesion  : $scope.persona.profesion,
            direccion  : $scope.persona.direccion
        });

        var request = $http.put('/api/personas/'+ documento, parameter).then(function(respuesta) {
            console.log(respuesta);
            getPersonas();
            getUnaPersona($scope.persona);
        });

    }

});

app.config(function($mdThemingProvider){
	$mdThemingProvider.theme('default');
});

