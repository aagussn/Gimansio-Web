var app = angular.module('Ingreso', []);
app.controller('myController', function($scope,$http,$timeout){
	


	/*var chkLogin = $cookies.get('login');
	//console.log(chkLogin);
	if (chkLogin==0 || !chkLogin) {
		console.log('bla');
		window.location.href = "/login";
	}*/
	
	//variables globales
	var tiempo=3000;
	var f = new Date();
	var fecha= Date.parse( f.getFullYear() +"-" + (f.getMonth() +1)+ "-" + f.getDate());
	$scope.bandera=0;
	var bandera=0;
	console.log('valor inicial $scope.bandera: ' + $scope.bandera + " y bandera "+bandera +" "+ $scope.Documento );
	

 	//Busco la persona	
	$scope.submit = function() {
		if($scope.Documento===undefined){
			var consulta ='/api/controlIngreso';
			console.log(consulta);
		}else{
			var consulta = "/api/controlIngreso?documento="+$scope.Documento;
			console.log(consulta);
		
			var lstPersonas = $http.get(consulta);
			lstPersonas.success(function(data) {
			    if(data.length>0){
			        console.log("tiene afiliacion vigente y existe la persona");
			        //Me quedo con el ultimo plan
			        var encontrePlan=false;
			        for(var a=0;a<data.length && !encontrePlan ;a++ ){
			        	//la persona
			        	var persona=data[0];
			        	console.log("asigne a la persona");
			        	//lista afiliaciones
			        	var lstAfiliaciones=persona.afiliacions;
			        	for(var b=0;b<lstAfiliaciones.length && !encontrePlan ;b++ ){
			        		var afiliacion=lstAfiliaciones[0];
			        		//me quedo con los planes de la afiliacion vigente
			        		if(afiliacion.plans.length>0){
				        		var lstPlanes=;
				        		for(var c=0;c<lstPlanes.length && !encontrePlan ;c++ ){
				        			plan=lstPlanes[0];
				        			var fechaPlan=Date.parse(plan.fin);
				        			if(plan.finn>=fecha){
				        				if(plan.importepago>0 && plan.pagos.length>0){
				        					if(plan.importepago==plan.importeplan){
				        						/*if(pla.cuotasson==plan.cuotasvan){
						        					//armo el elemento a mostrar
						        					bandera=1;
						        					var mostar1 = JSON.stringify({
												            documento: persona.documento,
												            nombre: persona.nombre+ " "+persona.apellido,
												            importeplan:plan.importeplan,
												            importepago:plan.importepago,
												            fechaFin: $scope.documento,
												    });
						        					$scope.ingreso.push(mostar1); 
						        				}else{
						        					if(pla.cuotasson!=plan.cuotasvan){
		           										console.log('fecha del plan' + fechaPlan);


						        					}else{bandera=7;}// esto es una inconsistencia de datos revisar el codigo

							       				}	*/
						      			}else{bandera=5;}//no tiene pagos en el plan vigentes		
					       			}else{bandera=6;}//no tiene planes vigentes
						       	}		
					       	}else{ bandera=3;}//no tiene planes
			        	}
			        }





			        				// inserto la asistencia de la persona 
									/*if(bandera==1 || bandera==2 || bandera==3 ){
					        			// Hago el insert
		        						parameter = JSON.stringify({
		                        			personaDocumento: persona.documento
		                    			});
										var laAsistencia = $http.post('/api/asistencia',parameter);
					 					// Voy a buscar el estado de la afiliacion
					 					laAsistencia.success(function(data4) {
		           							console.log('Inserte la asisencia' + data);
					 					});
					 					laAsistencia.error(function(data2){
					 						console.log('Error no ingrese asistencia');
					 					});	
					        		}*/
			        			
		        	  			
			        		 
			       	}else{ console.log('No esiste la persona o no tiene afiliacion activa'); bandera=4 }//la persona no tiene afiliacion activa
			        	
			        	
			    	switch (bandera) { 
		   		
								   		case 1: 
								   			$scope.bandera=bandera;
											//$scope.antes=$scope.bandera;
											$timeout(function callAtTimeout() {
											$scope.bandera=0;
											$scope.$apply;;
											},tiempo);		
								      		break 

								   		case 2: 
											$scope.bandera=bandera;
											$timeout(function callAtTimeout() {
											$scope.bandera=0;
											$scope.$apply;;
											},tiempo);	      	
											break 

								   		case 3: //el documento no tiene plan creado
								   			$scope.bandera=bandera;
											//$scope.antes=$scope.bandera;
											$timeout(function callAtTimeout() {
											$scope.bandera=0;
											$scope.$apply;;
											},tiempo);	
								      		break 

										case 4: //el documento no existe o la persona no tiene afiliacion vigente
											$scope.bandera=bandera;
											$timeout(function callAtTimeout() {
											$scope.bandera=0;
											$scope.$apply;;
											},tiempo);	      	
											break 

										case 5: //el documento no realizo el pago del plan vigente
											$scope.bandera=bandera;
											$timeout(function callAtTimeout() {
											$scope.bandera=0;
											$scope.$apply;;
											},tiempo);	      	
											break 	

										case 6: //el documento no tiene plan vigente
											$scope.bandera=bandera;
											$timeout(function callAtTimeout() {
											$scope.bandera=0;
											$scope.$apply;;
											},tiempo);	      	
											break 	

										case 7 ://incosistencia en el sistema comuniquese con un tecnico
											$scope.bandera=bandera;
											$timeout(function callAtTimeout() {
											$scope.bandera=0;
											$scope.$apply;;
											},tiempo);	      	
											break 		

								   		default: 
											$scope.bandera=bandera;
								      		console.log('la bandera no tiene valor ' + bandera); 
				}
			});	lstPersonas.error(function(data){ console.log('Error no encontre persona: ' + data);});
		}//el documento no es null
	}
});


