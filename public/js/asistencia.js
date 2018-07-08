

var app = angular.module('Asistencia',[]);
var estadoAfiliacion



app.controller('LoginControl',  function($scope, $http) {

    //Busco la persona	
	$scope.submit = function() {
		$scope.list = 'http://localhost:3000/api/personas/';
		$scope.list +=  $scope.Documento;
		
		var laPersona = $http.get($scope.list);

		laPersona.success(function(data) {
	       	$scope.persona = data;// ---> aca paso el resultado al html
        	

	   		if (data) {
		   		var laAfiliacion=$http.get('http://localhost:3000/api/afiliacions/'+ data.afiliacionIdafi );
			    console.log("exito");
			 	laAfiliacion.success(function(data2) {
			    	$scope.afiliacion = data2;
					if (data2) {
			        	console.log("exito2");
			        	if(data2.estado==1){
			        		var elPago=$http.get('http://localhost:3000/api/afiliacions/'+ data.afiliacionIdafi );



			        	}else{

			        		catch(error){
			        		console.log("no esta activo");

			        		}
			        	}
			        }
			    });
			    laAfiliacion.error(function(data2){
			   		console.log('Error: ' + data2);
				}); 				
			}    

	   	});
	   	laPersona.error(function(data){
	     	console.log('Error: ' + data);
		}); 
	}		
});