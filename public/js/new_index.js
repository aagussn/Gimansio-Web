var app = angular.module('Gimnasio-Web', ['ngMaterial', 'ngMessages']);

app.controller('Main', function($scope,$http, $mdToast, $q, $window) {
	
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

	function getUnaPersona(persona){
		$scope.unaPersona = 1;
		$scope.persona = persona;
	};

});

app.config(function($mdThemingProvider){
	$mdThemingProvider.theme('default');
});