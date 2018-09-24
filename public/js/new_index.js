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
        $scope.objetivos = {types:[],};
        $scope.hacerlo = {types:[],};
        $scope.lograrlo = {types:[],};
        $scope.interesa = {types:[],};
        $scope.entere = {types:[],};
        $scope.avisan = {types:[],};

        $scope.unaPersona = 0;        
		
		// Tengo que ir a buscar los datos a la BD
		$scope.persona = angular.copy(persona);
        
        documento = $scope.persona.documento;

        // Voy a buscar los intereses/categorias cargados de la persona
        var request = $http.get('/api/listCategorias?documento='+ documento).then(function(perCategoria) { 
            var categorias = perCategoria.data[0].categoria;

            for (var i = 0 ; i < categorias.length; i++) {
                
                console.log(categorias[i].itemcategorium.id);
                var  insert = {name: categorias[i].itemcategorium.descripcion, value: categorias[i].itemcategorium.id };

                switch(categorias[i].itemcategorium.tipo) {
                    case 1:
                        $scope.objetivos.types.push(insert);
                        break;
                    case 2:
                        $scope.hacerlo.types.push(insert);
                        break;
                    case 3:
                        $scope.lograrlo.types.push(insert);
                        break;
                    case 4:
                        $scope.interesa.types.push(insert);
                        break;
                    case 5:
                        $scope.entere.types.push(insert);
                        break;                                                
                    case 6:
                        $scope.avisan.types.push(insert);
                        break;                        
                }
            }

        });

        $q.all([request]);

        $scope.unaPersona = 1;
	};

});


// <!-- Objetivos -->
app.controller('objetivos', function($scope,$http,$q) {
    var vom = this;
    vom.selectedOption = '';
    vom.searchText = '';
    vom.launchAPIQueryParams = $scope.objetivos;
    var launchTypeOptions = [];

    var request = $http.get('/api/itemcategoria?tipo=1').then(function(items) { 
        var item_insert = {};
        for(i in items.data) {
            item_insert = {name: items.data[i].descripcion, value: items.data[i].id};
            launchTypeOptions.push(item_insert);
        }

    })

    vom.launchTypeOptions = launchTypeOptions; 

    $scope.objetivos = vom.launchAPIQueryParams;
});

// <!-- Voy a hacerlo -->
app.controller('hacerlo', function($scope,$http) {
    var vm = this;
    vm.selectedOption = '';
    vm.searchText = '';
    vm.launchAPIQueryParams = $scope.hacerlo;

    var launchTypeOptions = [];

    var request = $http.get('/api/itemcategoria?tipo=2').then(function(items) { 
    	var item_insert = {};
    	for(i in items.data) {
    		item_insert = {name: items.data[i].descripcion, value: items.data[i].id};
    		launchTypeOptions.push(item_insert);
    	}

    });

    vm.launchTypeOptions = launchTypeOptions;

});

// <!-- Voy a lograrlo en -->
app.controller('lograrlo', function($scope,$http) {
    var vm = this;
    vm.selectedOption = '';
    vm.searchText = '';
    vm.launchAPIQueryParams = $scope.lograrlo;

    var launchTypeOptions = [];

    var request = $http.get('/api/itemcategoria?tipo=3').then(function(items) { 
    	var item_insert = {};
    	for(i in items.data) {
    		item_insert = {name: items.data[i].descripcion, value: items.data[i].id};
    		launchTypeOptions.push(item_insert);
    	}

    });

    vm.launchTypeOptions = launchTypeOptions;

});

// <!-- Me interesa -->
app.controller('interesa', function($scope,$http) {
    var vm = this;
    vm.selectedOption = '';
    vm.searchText = '';
    vm.launchAPIQueryParams = $scope.interesa;

    var launchTypeOptions = [];

    var request = $http.get('/api/itemcategoria?tipo=4').then(function(items) { 
    	var item_insert = {};
    	for(i in items.data) {
    		item_insert = {name: items.data[i].descripcion, value: items.data[i].id};
    		launchTypeOptions.push(item_insert);
    	}

    });

    vm.launchTypeOptions = launchTypeOptions;

});

// <!-- Me entere por -->
app.controller('entere', function($scope,$http) {
    var vm = this;
    vm.selectedOption = '';
    vm.searchText = '';
    vm.launchAPIQueryParams = $scope.entere;

    var launchTypeOptions = [];

    var request = $http.get('/api/itemcategoria?tipo=5').then(function(items) { 
    	var item_insert = {};
    	for(i in items.data) {
    		item_insert = {name: items.data[i].descripcion, value: items.data[i].id};
    		launchTypeOptions.push(item_insert);
    	}

    });

    vm.launchTypeOptions = launchTypeOptions;

});

// <!-- Me avisan por -->
app.controller('avisan', function($scope,$http) {

    var vm = this;
    vm.selectedOption = '';
    vm.searchText = '';
    vm.launchAPIQueryParams = $scope.avisan;

    var launchTypeOptions = [];

    var request = $http.get('/api/itemcategoria?tipo=6').then(function(items) { 
    	var item_insert = {};
    	for(i in items.data) {
    		item_insert = {name: items.data[i].descripcion, value: items.data[i].id};
    		launchTypeOptions.push(item_insert);
    	}

    });

    vm.launchTypeOptions = launchTypeOptions;

});

app.config(function($mdThemingProvider){
	$mdThemingProvider.theme('default');
});

