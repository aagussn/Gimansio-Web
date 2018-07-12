var app = angular.module('ingreso', []);
app.controller('myController', function($scope, $http) {

$scope.bandera=0;
console.log('valor de la bandera: ' + $scope.bandera);


 	//Busco la persona	
	$scope.submit = function() {
		
		$scope.list = 'http://localhost:3000/api/personas/';
		$scope.list +=  $scope.Documento;
		// Voy a buscar la persona
		var laPersona = $http.get($scope.list);
		laPersona.success(function(data) {
	       	$scope.persona = data;
			console.log('resultado Persona ' + $scope.persona.nombre+" "+$scope.persona.documento+" "+$scope.persona.afiliacionId );
   			// Si tiene afiliacion
	   		if ($scope.persona.afiliacionId) {
		   		var laAfiliacion = $http.get('http://localhost:3000/api/afiliacions/'+ data.afiliacionId );
			 	// Voy a buscar el estado de la afiliacion
			 	laAfiliacion.success(function(data2) {
			    	$scope.afiliacion = data2;
			    	console.log('resultado Afiliacion ' + $scope.afiliacion.documento+" estado "+ $scope.afiliacion.estado+" id "+ $scope.afiliacion.id);
					    	// Si la afiliacion esta activo
			        		if($scope.afiliacion.estado==1){
			        			// Buscar ultimo pago
			        						        			console.log("por que entres");

			        			var losPagos=$http.get('http://localhost:3000/api/pago?documento='+ $scope.afiliacion.documento);
	       				       	losPagos.success(function(data3) {
	       							$scope.pago = data3;
			        				var elPago=data3[0];
			     					console.log('resultado Pago ' + data3.length);
			      					//console.log(" elPago "+ elPago+ ""  +elPago.documento+ " "+elPago.mes+elPago.anio);
			        				//aca controlo que la fecha del pago  sea mayor a la fecha de afiliacion activa
			        				if($scope.afiliacion.updatedAt<=elPago.createdAt){
										$scope.pago=elPago;
											console.log('resultado previo final ' + $scope.pago);

			        				}	
			        				else{
			        					$scope.pago =null;
			        				}
			        		    });
			        		    losPagos.error(function(data3){
									console.log('Erroraaaaa: ' + data3);
									});
			        		}else {
			        			$scope.bandera=4;
			        			console.log('valor de la bandera: ' + $scope.bandera);
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

//Actualizo el valor de las variables en la vista cuando se hace click
/*document.querySelector("submit").addEventListener("click",function(){
	$scope.$apply(function(){
		$scope.bandera=0;
	});
});*/

	/*//Cabiar el valor de la variable $scrope. que quiero luego de los segundos que quiera
	setTimeuot(function(){
		$scope.$apply(function(){
			$scope.bandera=0;
		});
	},2000);*/

});
