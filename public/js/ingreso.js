var app = angular.module('ingreso', []);
app.controller('myController', function($scope,$http,$timeout){

	//variables globales
	var f = new Date();
	var fecha=f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
	var mes=f.getMonth() +1;
	var anio=f.getFullYear();
	$scope.bandera=0;
	console.log('valor inicial bandera: ' + $scope.bandera);
	

 	//Busco la persona	
	$scope.submit = function() {
		$scope.list = '/api/listaF1';
		//console.log($scope.Documento);
		// lista completa de personas
		var lstPersonas = $http.get($scope.list);
		lstPersonas.success(function(data) {
	        if(data.length>1){
	        	//recorro la lista buscando el afiliado
	        	var encontre=false;
	        	for(var a=0;a<data.length;a++ && !encontre){
	        		var persona=data[a];
	        		//busco a la persona si esta no tiene afiliacion vigente no la voy a encontrar
	        		if(persona.documento==$scope.Documento){
	        			encontre=true;
	        			//busco ultimo pago 
	        			if(persona.pagos.length>0){
	        				var listaPagos=persona.pagos;
	        				var indiceUltimoPago=0;
							var anioMax=0;
							var mesMax=0;
							//busco el año del ultimo pago
							for(var b=0;b<listaPagos.length;b++){
								var elpago=listaPagos[b];
								if(elpago.anio>anioMax){
										anioMax=elpago.anio;
								}
							}
							//teniendo el año del ultimo pago busco el ultimo
							for(var c=0;c<listaPagos.length;c++){
								var elpago=listaPagos[b];
								if(elpago.anio==anioMax){
									if(elpago.mes>mesMax){
										mesMax=elpago.mes;
										indiceUltimoPago=c;	
									}
								}
							}
							//tengo id de posicion del array del ultimo pago de la persona
							var elpago=listaPagos[indiceUltimoPago];	

	        				//que ese pago sea de la filiacion activa
	        				if(persona.afiliacion.updatedAt<elpago.updatedAt){
	        					mesPago=elPago.mes;
								anioPago=elPago.anio;
								//controlo si el pago es mayor al anio en el que estoy
								if(anioPago>anio){
									//si el año es mayor no controlo mes y devuelvo exito
									console.log("el año es mayor");
										$scope.bandera=1;
										$scope.antes=$scope.bandera;
										 $timeout(function callAtTimeout() {
   											$scope.bandera=0;
    										$scope.$apply;;
										},2000);
									
								}else{
									if(anioPago==anio){
									  	console.log("el anio  es igual ");
									  	// si entro en if la persona esta atrasada
									  	if(mesPago<mes){
									  		$scope.bandera=2;
											$timeout(function callAtTimeout() {
   												$scope.bandera=0;
    											$scope.$apply;;
											},2000);	
										//si entro aca la persona esta al dia	
									  	}else{
									  		$scope.bandera=1;
											$scope.antes=$scope.bandera;
												$timeout(function callAtTimeout() {
		   											$scope.bandera=0;
    												$scope.$apply;;
												},2000);		
									  	}
									}
								}	
	        				}
	        				// inserto la asistencia de la persona 
							if($scope.bandera==1 ||$scope.bandera==2 || $scope.bandera==3 ){
			        			// Hago el insert
        						parameter = JSON.stringify({
                        			personaDocumento: persona.documento;
                    			});
								var laAsistencia = $http.post('/api/asistencia',parameter);
			 					// Voy a buscar el estado de la afiliacion
			 					laAsistencia.success(function(data4) {
           							console.log('Inserte la asisencia' + data);
			 					});
			 					laAsistencia.error(function(data2){
			 						console.log('Error no ingrese asistencia');
			 					});	
			        		}
	        			}else{
	        				//fin busqueda ultimo pago, la persona no tiiene pagos
	        				console.log('Bienvenido '+persona.nombre+" "+persona.apellido+" recuarda pagar tu cuota de socio");
	        				$scope.bandera=4;
        	  				$timeout(function callAtTimeout() {
   								$scope.bandera=0;
    							$scope.$apply;;
							},2000);
        	  			}
	        		}else{console.log('No existe afiliacion para el documento ingresado');
	        				$scope.bandera=4;
        	  				$timeout(function callAtTimeout() {
   								$scope.bandera=0;
    							$scope.$apply;;
							},2000);
        	  		} 
	        	}//aca termino if deonde encontre a la persona
	        }//fin de verificacion que el data tenga datos
	    });
	    lstPersonas.error(function(data){
	    	console.log('Error no encontre persona: ' + data);
	    });
	}
});


