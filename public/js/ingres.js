var app = angular.module('ingreso', []);
app.controller('myController', function($scope, $http,$timeout){

//variables globales
var f = new Date();
var fecha=f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
var mes=f.getMonth() +1;
var anio=f.getFullYear();

//console.log(fecha);
//console.log(año);
//console.log(mes);

$scope.bandera=0;
console.log('valor de la bandera: ' + $scope.bandera);


 	//Busco la persona	
	$scope.submit = function() {
		
		$scope.list = '/api/personas/';
		console.log($scope.list);
		console.log($scope.Documento);
		$scope.list +=  $scope.Documento;
console.log($scope.list);		// Voy a buscar la persona
		var laPersona = $http.get($scope.list);
		laPersona.success(function(data) {
	        if(data){
	       		$scope.persona = data;
				console.log('resultado Persona ' + $scope.persona.nombre+" "+$scope.persona.documento);
   				// Si tiene afiliacion
	   			//if ($scope.persona.afiliacionId) {
		   			var laAfiliacion = $http.get('/api/afiliacions?personaDocumento='+ data.documento );
			 		console.log(laAfiliacion);

			 		// Voy a buscar el estado de la afiliacion
			 		laAfiliacion.success(function(data2) {
			 			if(data2){
			 				for(var a=0;a<data.length;a++){
			 					pAfi=data[a];
			 					if(pAfi==1){
			 						$scope.afiliacion = pAfi;
			    					console.log('resultado Afiliacion ' + $scope.afiliacion.personaDocumento+" estado "+ $scope.afiliacion.estado+" id "+ $scope.afiliacion.id);
			 						// Si la afiliacion esta activo
			        				if($scope.afiliacion.estado==1){
			        					// Buscar ultimo pago
			        					var losPagos=$http.get('/api/pago?documento='+ $scope.afiliacion.personaDocumento);
	       				       			losPagos.success(function(data3) {
	       				       				console.log("lo que voy a comprarar en if  "+ data3.length+" largo y objeto "+data3.id );
	       									if(data3.id>0 || data3.length>0){
	       									
	
	       										console.log("entre data3 tiene un largo de "+ data3.length);
												var indiceUltimoPago=0;
												var anioMax=0;
												var mesMax=0;

												//busco el año del ultimo pago

												for(var a = 0 ; a<data3.length ; a++){
													if(data3[a].anio>anioMax){
														if(data3[a].tipomovimiento==1 && data3[a].tipopago==1){
															anioMax=data3[a].anio;
														}
													}	
												}
													//teniendo el año del ultimo pago busco el ultimo
													for(var a=0;a<data3.length;a++){
														if(data3[a].anio==anioMax){
															if(data3[a].mes>mesMax){
																if(data3[a].tipomovimiento==1 &&  data3[a].tipopago==1){
																	mesMax=data3[a].mes;
																	indiceUltimoPago=a;	
																}	
															}
														}
													}	
			
			        							var elPago=data3[indiceUltimoPago];
			     								console.log('resultado Pago ' + data3.length);
			      								//console.log(" elPago "+ elPago+ ""  +elPago.documento+ " "+elPago.mes+elPago.anio);
			        							//aca controlo que la fecha del pago  sea mayor a la fecha de afiliacion activa
			        							if($scope.afiliacion.updatedAt<=elPago.createdAt){
													$scope.pago=elPago;
													console.log('resultado previo final ' + $scope.pago.mes +" "+$scope.pago.anio);
													$scope.bandera=1;
												  	mesPago=elPago.mes;
												  	anioPago=elPago.anio;

													console.log("fecha del dia "+ anio+mes);
													console.log("fecha del pago "+ anioPago+mesPago);

												  	if(anioPago==anio){
												  		console.log("el año es igual");
												  		if(mesPago==mes ||mesPago>mes ){
												  			console.log("el mes es igual");
												  			$scope.bandera=1;
												  			$scope.antes=$scope.bandera;
												  			  $timeout(function callAtTimeout() {
   																$scope.bandera=0;
    															$scope.$apply;;
																}, 2000);
									  				    }else{
									  				    	console.log("el mes no es igual ");
												  			if(mesPago<mes){
												  				$scope.bandera=2;
												  				$timeout(function callAtTimeout() {
   																$scope.bandera=0;
    															$scope.$apply;;
																}, 2000);
												  			}
												  		}
										  			}else{
										  				if(anioPago<anio){
									  				    	console.log("el anio  es menor ");
															$scope.bandera=2;
															$timeout(function callAtTimeout() {
   																$scope.bandera=0;
    															$scope.$apply;;
																}, 2000);
										  				}
										  			}
     
			        							if($scope.bandera==1 ||$scope.bandera==2 || $scope.bandera==3 ){
			        								// Hago el insert
        											parameter = JSON.stringify({
                        								personaDocumento: $scope.persona.documento
                    								});
												  	var laAsistencia = $http.post('/api/asistencia',parameter);
			 										// Voy a buscar el estado de la afiliacion
			 										laAsistencia.success(function(data4) {
           												console.log('Inserte la asisencia' + data);
			 										});
			 											laAsistencia.error(function(data2){console.log('Error no ingrese asistencia');
			 											});	
			        							}	
			        							}	
			        							else{
			        								$scope.bandera=3;
													$timeout(function callAtTimeout() {
   														$scope.bandera=0;
    													$scope.$apply;;
													}, 2000);
			        								$scope.pago =null;
			        							}
			        		   				}else{console.log('Error la persona no tiene pagos');$scope.bandera=4;
			        		   						$timeout(function callAtTimeout() {
   																$scope.bandera=0;
    															$scope.$apply;;
																}, 2000);
			        		   					} 
			        		   			}); losPagos.error(function(data3){console.log('Erroraaaaa: ' + data3);});



			        				}else {console.log('El estado de la afiliación es 0(inactivo)'); $scope.bandera=4;
			        						$timeout(function callAtTimeout() {
   												$scope.bandera=0;
    											$scope.$apply;;
												}, 2000);
			        					}
			        			}
			 				}	    
        	  			}else{console.log('No existe afiliacion para el documento ingresado');$scope.bandera=4;
        	  					$timeout(function callAtTimeout() {
   									$scope.bandera=0;
    								$scope.$apply;;
								}, 2000);
        	  				} 
        	  		});laAfiliacion.error(function(data2){onsole.log('Error no encontre afiliacion');});


       			
       			/*}else{console.log('No existe afiliación, puede ser una inconsistencia');$scope.bandera=4;
       					$timeout(function callAtTimeout() {
   							$scope.bandera=0;
    						$scope.$apply;;
						}, 2000);
       				}*/	
	    	}else {console.log('Error la persona no existe');$scope.bandera=4; 
	    			$timeout(function callAtTimeout() {
   							$scope.bandera=0;
    						$scope.$apply;;
						}, 2000);
	    		}
	    });laPersona.error(function(data){console.log('Error no encontre persona: ' + data);});
	}



});


