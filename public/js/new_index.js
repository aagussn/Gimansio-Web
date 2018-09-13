var app = angular.module('Gimnasio-Web', ['ngMaterial', 'ngMessages']);

app.controller('Main', function($scope,$http, $mdToast) {
	getPersonas();

	// Funcion para seleccionar una persona
	$scope.BindSelPersona = function (persona){
		$mdToast.show(
			$mdToast.simple()
			.textContent('Usted selecciono: ' + persona.nombre)
			); 
		console.log('selecciono una linea')
	}

	// Funcion para obtener todas las personas
	function getPersonas(){
		$scope.data = {};

		var request = $http.get('/api/personas');

		request.then(function(personas) { 
			$scope.data = personas.data;
			console.log(personas.data);
		});

	}

});