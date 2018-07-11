var app = angular.module('ingreso', []);
app.controller('myController', function($scope, $http) {

 	//Busco la persona	
	$scope.submit = function() {
		
		$scope.list = 'http://localhost:3000/api/personas/';
		$scope.list +=  $scope.Documento;
		// Voy a buscar la persona
		var laPersona = $http.get($scope.list);
		laPersona.success(function(data) {
	       	$scope.persona = data;
   			// Si tiene afiliacion
	   		if ($scope.persona.afiliacionId) {
		   		var laAfiliacion = $http.get('http://localhost:3000/api/afiliacions/'+ data.afiliacionId );
			 	// Voy a buscar el estado de la afiliacion
			 	laAfiliacion.success(function(data2) {
			    	$scope.afiliacion = data2;
					    	// Si la afiliacion esta activo
			        		if($scope.afiliacion.estado==1){
			        			// Buscar ultimo pago
			        			var losPagos=$http.get('http://localhost:3000/api/pago?documento='+ $scope.afiliacion.documento);
	       				       	losPagos.success(function(data3) {
	       							$scope.pago = data3;
			        				var elPago=data3[0];
			      //console.log(" elPago "+ elPago+ ""  +elPago.documento+ " "+elPago.mes+elPago.anio);
			        				//aca controlo que la fecha del pago  sea mayor a la fecha de afiliacion activa
			        				if($scope.afiliacion.createdAt<=elPago.createdAt){
										$scope.pago=elPago;
											console.log('resultado previo final ' + $scope.pago);

			        				}	
			        				else{
			        					$scope.pago =null;
			        				}
			        		    });
			        		    losPagos.error(function(data3){
									console.log('Error: ' + data3);
									});
			        		}else {
			        			$scope.pago =null;
			        		}    
        	  	});
        		laAfiliacion.error(function(data2){
				console.log('Error: ' + data2);
				});
       		}else {
			    $scope.pago =null;
			} 	
	    });laPersona.error(function(data){
	     	console.log('Error: ' + data);
			});
	}

});
