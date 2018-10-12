var app = angular.module('Ingreso', ['ngCookies','ngMaterial']);
app.controller('myController', function($scope,$http,$timeout,$cookies){
	


	var chkLogin = $cookies.get('login');
	//console.log(chkLogin);
	if (chkLogin==0 || !chkLogin) {
		console.log('bla');
		window.location.href = "/login";
	}
	
	//variables globales
	var tiempo=4000;
	var f = new Date();
	var fecha= Date.parse( f.getFullYear() +"-" + (f.getMonth() +1)+ "-" + f.getDate());
	$scope.bandera=0;
	var bandera=0;
	$scope.ingreso = [];
	$scope.mostrar1 =true;
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
				        if(persona.afiliacions.length>0){
				        	var lstAfiliaciones=persona.afiliacions;
				        	console.log("asigne la lista de afiliaciones");
				        	for(var b=0;b<lstAfiliaciones.length && !encontrePlan ;b++ ){
				        		var afiliacion=lstAfiliaciones[0];
				        		//me quedo con los planes de la afiliacion vigente
				        		if(afiliacion.plans.length>0){
					        		var lstPlanes=afiliacion.plans;
					        		console.log("asigne lista de planes");
					        		for(var c=0;c<lstPlanes.length && !encontrePlan ;c++ ){
					        			plan=lstPlanes[0];
					        			var fechaPlan=Date.parse(plan.fin);
					        			if(plan.fin>=fecha){
					        				console.log("plan vigente");
					        				if(plan.importepago>0){
					        					console.log(" pago algo del plan");
					        					if(plan.importepago==plan.importeplan && pla.cuotasson==plan.cuotasvan){
					        						console.log(" pago total del plan");
					        						//marco como pago vigente, todo ok
							        				bandera=1;
							        			}else{
							        				if(plan.importepago<plan.importeplan && pla.cuotasson>plan.cuotasvan){
							        					console.log("no pago total del plan");
							        				//verificar si es correcto el impago o tiene margen para pagar
							        					bandera=2;
							        				
							        				}else{bandera=7;}// esto es una inconsistencia de datos revisar el codigo
							        			}
									       	}else{bandera=5;}//existe el plan pero no tiene pagos	
								      	}else{bandera=6;}//no tiene plan vigentes		
							       	
								      	//aca tengo todos los  datos armo e json para mostarr en pantalla
								      	if(bandera==1 || bandera==5 || bandera==2){
								      		
								      		var mostar1 = JSON.stringify({
												documento: persona.documento,
												nombre: persona.nombre+ " "+persona.apellido,
												importeplan:plan.importeplan,
												importepago:plan.importepago,
												fechaFin: plan.fin,
												});
								      		$scope.ingreso.push(mostar1);
								      		$scope.msjPer=persona;
								      		// msjPer.documento=persona.documento;
								      		$scope.msjPer.nombre= persona.nombre;
								      		// msjPer.apellido=persona.apellido;
								      		$scope.msjPer.importe=plan.importeplan-plan.importepago;
								      		$scope.msjPer.fechaFin=plan.fin;

								      		// inserto la asistencia de la persona 
											parameter = JSON.stringify({personaDocumento: persona.documento});
											var laAsistencia = $http.post('/api/asistencia',parameter);
						 					// ejecuto el insert afiliacion
						 					laAsistencia.success(function(data3) {
			           							console.log('Inserte la asisencia' + data3);
						 					});
						 					laAsistencia.error(function(data2){
						 						console.log('Error no ingrese asistencia');
						 					});	
						        			
					        			}else{
					        				if(bandera==6 || bandera==3 ){
					        					var mostar1 = JSON.stringify({
												documento: persona.documento,
												nombre: persona.nombre+ " "+persona.apellido,
												importeplan:"no tiene",
												importepago:"no tiene",
												fechaFin: "no tiene",
												});
								      		$scope.ingreso.push(mostar1);
								      		$scope.msjPer=persona;
								      		// msjPer.documento=persona.documento;
								      		$scope.msjPer.nombre= persona.nombre;
								      		// msjPer.apellido=persona.apellido;
								      		// msjPer.importe=plan.importeplan-plan.importepago;
								      		// msjPer.fechaFin=plan.fin;
					        				}
					        			}	
							       	}//aca termino el ultimo for
								}else{bandera=3;}//no tiene planes
							}
			   			}else{ bandera=4;}//no tiene afiliacion vigente   
			   			        		 
			       	}
			        	
			        	
			   
				}else{bandera=4;}//DATO NO estado VACIO
					switch (bandera) { 
	   								
								   		case 1: //aca el afiliado esta al dia 
								   			$scope.bandera=bandera;
											//$scope.antes=$scope.bandera;
											$timeout(function callAtTimeout() {
											$scope.bandera=0;
											$scope.$apply;;
											},tiempo);		
								      		break 

								   		case 2: //aca el afiliado esta atrasado
											$scope.bandera=bandera;
											$timeout(function callAtTimeout() {
											$scope.bandera=0;
											$scope.$apply;;
											},tiempo);	      	
											break 

								   		case 3: // no tiene plan creado 
								   			$scope.bandera=bandera;
											//$scope.antes=$scope.bandera;
											$timeout(function callAtTimeout() {
											$scope.bandera=0;
											$scope.$apply;;
											},tiempo);	
								      		break 

										case 4: // no existe la persona o no tiene afiliacion vigente
											$scope.bandera=bandera;
											$timeout(function callAtTimeout() {
											$scope.bandera=0;
											$scope.$apply;;
											},tiempo);	      	
											break 

										case 5: //no realizo el pago en el plan vigente
											$scope.bandera=bandera;
											$timeout(function callAtTimeout() {
											$scope.bandera=0;
											$scope.$apply;;
											},tiempo);	      	
											break 	

										case 6: //no tiene plan vigente
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


