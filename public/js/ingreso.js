var app = angular.module('ingreso', ['ngCookies']);

app.controller('myController', function($scope,$http,$timeout,$cookies){
	
	var chkLogin = $cookies.get('login');
	console.log(chkLogin);
	if (chkLogin==0 || !chkLogin) {
		console.log('bla');
		window.location.href = "/login";
	}
	
	//variables globales
	var f = new Date();
	var fecha=f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
	var mes=f.getMonth() +1;
	var anio=f.getFullYear();
	$scope.bandera=0;
	var bandera=0;
	console.log('valor inicial $scope.bandera: ' + $scope.bandera + " y bandera "+bandera );
	

 	//Busco la persona	
	$scope.submit = function() {
		$scope.list = '/api/listaF1';
		//console.log($scope.Documento);
		// lista completa de personas
		var lstPersonas = $http.get($scope.list);
		lstPersonas.success(function(data) {
	        if(data.length>0){
	        	console.log("data tiene datos");
	        	//recorro la lista buscando el afiliado
	        	var encontre=false;
	        	for(var a=0;a<data.length && !encontre ;a++ ){
	        		var persona=data[a];
	        		//busco a la persona si esta no tiene afiliacion vigente no la voy a encontrar
	        		if(persona.documento==$scope.Documento){
	        			console.log("encontre a la persona");
	        			$scope.persona=persona;
	        			encontre=true;
	        			//busco ultimo pago 
	        			if(persona.pagos.length>0){
	        				console.log("tiene uno o mas pagos");
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
								var elpago=listaPagos[c];
								if(elpago.anio==anioMax){
									if(elpago.mes>mesMax){
										mesMax=elpago.mes;
										indiceUltimoPago=c;	
									}
								}
							}
							//tengo id de posicion del array del ultimo pago de la persona
							var ultimoPago=listaPagos[indiceUltimoPago];
							$scope.pago=ultimoPago;	
							console.log("feha pago "+ ultimoPago.updatedAt);
							console.log("feha afi "+ persona.afiliacions[0].updatedAt);
							console.log("fecha actual "+ anio +" "+ mes);
							console.log("la fecha max "+anioMax+" "+ mesMax)
	        				//que ese pago sea de la filiacion activa
	        				if(persona.afiliacions[0].updatedAt<=ultimoPago.updatedAt){
	        					mesPago=ultimoPago.mes;
								anioPago=ultimoPago.anio;
								//controlo si el pago es mayor al anio en el que estoy
								if(anioPago>anio){
									//si el año es mayor no controlo mes y devuelvo exito
									console.log("el año es mayor");
									bandera=1;
								}else{
									if(anioPago==anio){
									  	console.log("el anio  es igual ");
									  	// si entro en if la persona esta atrasada
									  	if(mesPago<mes){
									  		console.log("el mes  es menor ");
									  		bandera=2;
									  	//si entro aca la persona esta al dia	
									  	}else{
									  		console.log("el mes no es menor ");
									  		bandera=1;
									  	}
									}else {
										console.log("el anio  es menor ");
										bandera=2;
									}	
								}	
	        				}else{console.log('No existe pagos para la ultima afi activa');//aca termino el if donde comparo el documento
	        					bandera=3;
        	  				}


	        				// inserto la asistencia de la persona 
							if(bandera==1 || bandera==2 || bandera==3 ){
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
			        		}
	        			}else{//si la persona tiene o no pagos
	        					console.log('Bienvenido '+persona.nombre+" "+persona.apellido+" recuarda pagar tu cuota de socio");
	        					bandera=4;
        	  			}
	        		}else{console.log('No existe afiliacion para el documento ingresado');//aca termino el if donde comparo el documento
	        				bandera=4;
        	  		} 
	        	}//aca termino for donde busco a la persona
	        var tiempo=3000;
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

						   		case 3: 
						   			$scope.bandera=bandera;
									//$scope.antes=$scope.bandera;
									$timeout(function callAtTimeout() {
									$scope.bandera=0;
									$scope.$apply;;
									},tiempo);	
						      		break 

								case 4: 
									$scope.bandera=bandera;
									$timeout(function callAtTimeout() {
									$scope.bandera=0;
									$scope.$apply;;
									},tiempo);	      	
									break 

						   		default: 
						      	console.log('la bandera no tiene valor ' + bandera); 
							}


	        }else{
	        	console.log('data vacio');//fin de verificacion que el data tenga datos
	        	bandera=4
	        }
	    });lstPersonas.error(function(data){
	    		console.log('Error no encontre persona: ' + data);
	    	});
	

		


	}


});


