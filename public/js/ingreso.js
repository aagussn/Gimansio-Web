var app = angular.module('Ingreso', []);

app.controller('IngresoControl', function($scope, $http) {

    //Busco la persona	
		$scope.submit = function() {
		$scope.list = 'http://localhost:3000/api/personas/';
		$scope.list +=  $scope.Documento;


		// Voy a buscar la persona
		var laPersona = $http.get($scope.list);

		laPersona.success(function(data) {
	       	$scope.persona = data;
	       	console.log('persona.afiliacionId: ' + $scope.persona.afiliacionId);
	   		
	   		// Si tiene afiliacion
	   		if ($scope.persona.afiliacionId) {
		   		var laAfiliacion = $http.get('http://localhost:3000/api/afiliacions/'+ data.afiliacionId );
			 	// Voy a buscar el estado de la afiliacion
			 	laAfiliacion.success(function(data2) {
			    	$scope.afiliacion = data2;
			    	console.log($scope.afiliacion); 	
					if (data2) {
						// Si la afiliacion esta activo
			        	if(data2.estado==1){
			        		

							// Buscar ultimo pago
			        		var elPago=$http.get('http://localhost:3000/api/pago/?documento='+ data.documento);
			        		var pPago=null;
			        	
			        		//si lo que me devuelve el get es una lista entro al if, sino voy por el else que quiere decir que el mismo es un objeto
			        		if(elPago.length>0){
								pPago=elPago[0];

			        		}else{
			        			if(elPago){
			        				pPago=elPago;
			        			}
			        		}
			        		
			        		//aca controlo que la fecha del pago  sea mayor a la fecha de afiliacion activa
			        		if(laAfiliacion.createdAt>=pPago.createdAt){
								$scope.pago =pPago;
			        		}else{
			        			$scope.pago =null;
			        		}
			        	}else{
			        		console.log("no esta activo");
			        		$scope.pasa = 'No se encuentra activo';
			        	}
			        }




			    });
			    
			    laAfiliacion.error(function(data2){
			   		console.log('Error: ' + data2);
				}); 				
			}
			else {
				console.log('No tiene afiliacion');
				$scope.pasa = 'No tiene afiliacion';
			}
			
	   	});
	   	laPersona.error(function(data){
	     	console.log('Error: ' + data);
		}); 
	}		
});
