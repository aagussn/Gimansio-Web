var app = angular.module('Ingreso', ['ngCookies','ngMaterial']);
app.controller('myController', function($scope,$http,$timeout, $q,$cookies){
	


	var chkLogin = $cookies.get('login');
	//console.log(chkLogin);
	if (chkLogin==0 || !chkLogin) {
		console.log('bla');
		window.location.href = "/login";
	}
	
		//variables 
	 	var fechaCompleta = new Date(); //fecha del dia 
		var anio= fechaCompleta.getFullYear();
		var mes=fechaCompleta.getMonth();
		var dia=fechaCompleta.getDate();
		var hora=fechaCompleta.getHours();
		var minutos=fechaCompleta.getMinutes();
		var segundos=fechaCompleta.getSeconds();
		var fecha = new Date(anio,(mes),dia,hora,minutos,segundos) ;
		//la diferencia de peses, es la resta
		var lstMesesDiferencia=[0,2592000000,5270400000,7948800000,10540800000,13219200000,15811200000,18489600000,20908800000,23587200000,26265600000,28857600000,31536000000 ];
		var meses31=[1,3,5,7,8,10,12];
		var tiempo =5000;
		var personaAsistencia=0;
	 	var deuda= -1 ;   // 0=pago   1=impago deuda   2=no tine plan  
		$scope.bandera=0;
		var bandera=0;
		
		$scope.mostrar1 =true;

		var inicioDia=anio+"-"+(mes+1)+"-"+dia+ " 00:00:00";
		var mediodia=anio+"-"+(mes+1)+"-"+dia+ " 13:00:00";
		var finDia=0;
		for(var a=0;a<7;a++){
			m=meses31[a];
			if(m==mes){
				if(dia==31){
					
					finDia=anio+"-"+(mes+2)+"-"+ 1 + " 00:00:00";
				}else{
					finDia=anio+"-"+(mes+1)+"-"+ (dia+1) + " 00:00:00";
				}	
			}else{
			}
		}
		if(mes==2){
			finDia=anio+"-"+(mes+2)+"-"+ 1 + " 00:00:00";
		}else{
			
			finDia=anio+"-"+(mes+1)+"-"+ (dia+1) + " 00:00:00";

		}
		/*var pru=anio+"-"+(mes+1)+"-"+dia+ " 12:00:01";
		console.log("inicioDia "+ inicioDia );
		console.log("mediodia "+ mediodia );
		console.log("finDia "+ finDia );
		console.log("pru " +pru );

		if(inicioDia<pru){
		console.log("es mayor");
		}else{
			console.log("es menor");
		}

		var a =  new Date(anio,8,20,00,00,00) ; //fecha del plan 
		var b =  new Date(anio,9,17,00,00,00) ; //fecha del pago 
		var c =  new Date(anio,mes,dia,00,00,00) ; //fecha del pago 
		console.log("a " + a);
		console.log("b " + b);
		console.log("c " + c);
		restaA=c - a;
		restaB=c - b; 
		console.log("c-a= " +restaA + "  c-b= " + restaB );
		*/

		
		//console.log('valor inicial $scope.bandera: ' + $scope.bandera + " y bandera "+bandera +" "+ $scope.Documento );
	
	$scope.ingreoManianals=getIngresoMat();
	$scope.ingreoTardels=getIngresoDesp();
 	//Busco la persona	
	$scope.submit = function() {
		if($scope.Documento===undefined){
			var consulta ='/api/controlIngreso';
			console.log(consulta);
		}else{
			var documentoPer=$scope.Documento;
			//var consulta = $http.get('/api/controlIngreso?documento='+documentoPer);
		    var request= $http.get("/api/controlIngreso?documento="+documentoPer).then(function(data) {
			//console.log(data);

			//consulta.success(function(data) {
			    if(data.data.length>0){
			        console.log("tiene afiliacion vigente y existe la persona");
			        //Me quedo con el ultimo plan
			        var encontrePlan=false;
			        for(var a=0;a<data.data.length && !encontrePlan ;a++ ){
			        	//la persona
			        	var persona=data.data[a];
			        	console.log("asigne a la persona");
			        	//lista afiliaciones
				        if(persona.afiliacions.length>0){
				        	var lstAfiliaciones=persona.afiliacions;
				        	console.log("lista afiliaciones" );
				        	for(var b=0;b<lstAfiliaciones.length && !encontrePlan ;b++ ){
				        		var afiliacion=lstAfiliaciones[b];
				        		//creo lo que voy a insertar, resta actualizar solo el tipo de deuda dependiendo de la situacion del afiliado
								personaAsistencia = {
												afiliacionId: afiliacion.id,
												tipodeuda:deuda,
											};
								$scope.msjPer=persona;
													        		console.log(afiliacion.plans.length);

				        		//me quedo con los planes de la afiliacion vigente
				        		if(afiliacion.plans.length>0){
					        		var lstPlanes=afiliacion.plans;
					        		console.log("tengo lista de planes");
					        		for(var c=0;c<lstPlanes.length && !encontrePlan ;c++ ){
					        			var plan=lstPlanes[c];
					        			$scope.msjplan=plan;
					       				console.log("tengo el plan");
					       				var lstfechaPLan =dividirCadena(plan.fin, "-",0);
					       				if(lstfechaPLan>=fecha){
					        				console.log("plan vigente");
					        				if(plan.importepago>0 && plan.pagos.length>0){
					        					console.log("pago algo del plan");
					        					if(plan.importepago==plan.importeplan && plan.cuotasson==plan.cuotasvan){
					        						console.log("total del plan pago");
					        						//marco como pago vigente, todo ok
							        				bandera=1;
							        				personaAsistencia.tipodeuda=0;
							        				encontrePlan=true;
							        			}else{
							        				if(plan.importepago<plan.importeplan && plan.cuotasson>plan.cuotasvan){
							        					console.log("no pago total del plan");
							        					//verificar si es correcto el impago o tiene margen para pagar
							        					var lstPagos=plan.pagos;	
							        					for(var d=0;d<lstPagos.length && !encontrePlan ;d++ ){
							        						var pago=lstPagos[d];
							        							//console.log("plan.inicio " +dividirCadena(plan.inicio,"-",0));
							        							//console.log("pago.createdAt" +dividirCadena(pago.createdAt,"-",1));
																var fechaUltimoPago=dividirCadena(pago.createdAt,"-",1)
							        						if(fecha-fechaUltimoPago>=lstMesesDiferencia[1]){
							        							console.log("hace mas de un mes q no paga");
							        							$scope.faltaPagar=plan.importeplan-plan.importepago;
							        							bandera=2;
							        							encontrePlan=true;
							        							personaAsistencia.tipodeuda=1;

							        						}else{
							        							console.log("no hace mas de un mes q pago");
							        							bandera=1;
							        							personaAsistencia.tipodeuda=0;
							        							encontrePlan=true;
							        						}
							        					}
													}else{bandera=7; encontrePlan=true;}// esto es una inconsistencia de datos revisar el codigo
							        			}
									       	}else{bandera=5; personaAsistencia.tipodeuda=1; encontrePlan=true; }//existe el plan pero no tiene pagos	
								      	}else{bandera=6; personaAsistencia.tipodeuda=2; encontrePlan=true;}//no tiene plan vigentes		
							       	
								      
								      	//aca tengo todos los  datos armo e json para mostarr en pantalla
								      	if(bandera==1 || bandera==5 || bandera==2 || bandera==6 || bandera==3 ){
								      		
								      		// inserto la asistencia de la persona 
								      		var insAsis = JSON.stringify(personaAsistencia);
											var laAsistencia= $http.post('/api/asistencia',insAsis).then(function(asistencia) {
			           							console.log('Inserte la asisencia');
						 					});

					        			}	
							       	}//aca termino el ultimo for*********************************************************************hasta aca tengo toda las variables *********************************************
								}else{bandera=3;}//no tiene planes
							}//termino el for de afiliaciones 
			   			}else{ bandera=4;}//no tiene afiliacion vigente   
			   			        		 
			       	}
			        
			   
				}else{bandera=4;}//DATO NO estado VACIO
					switch (bandera) { 
	   								
								   		case 1: //aca el afiliado esta al dia 
								   			$scope.bandera=bandera;
											//$scope.antes=$scope.bandera;
											$timeout(function callAtTimeout() {
											$scope.bandera=0;
											$scope.Documento = null ;
											$scope.$apply;;
											},tiempo);		
								      		break 

								   		case 2: //aca el afiliado esta atrasado
											$scope.bandera=bandera;
											$timeout(function callAtTimeout() {
											$scope.bandera=0;
											$scope.Documento = null ;
											$scope.$apply;;
											},tiempo);	      	
											break 

								   		case 3: // no tiene plan creado 
								   			$scope.bandera=bandera;
											//$scope.antes=$scope.bandera;
											$timeout(function callAtTimeout() {
											$scope.bandera=0;
											$scope.Documento = null ;
											$scope.$apply;;
											},tiempo);	
								      		break 

										case 4: // no existe la persona o no tiene afiliacion vigente
											$scope.bandera=bandera;
											$timeout(function callAtTimeout() {
											$scope.bandera=0;
											$scope.Documento = null ;
											$scope.$apply;;
											},tiempo);	      	
											break 

										case 5: //no realizo el pago en el plan vigente
											$scope.bandera=bandera;
											$timeout(function callAtTimeout() {
											$scope.bandera=0;
											$scope.Documento =null;
											$scope.$apply;;
											},tiempo);	      	
											break 	

										case 6: //no tiene plan vigente
											$scope.bandera=bandera;
											$timeout(function callAtTimeout() {
											$scope.bandera=0;
											$scope.Documento = null ;
											$scope.$apply;;
											},tiempo);	      	
											break 	

										case 7 ://incosistencia en el sistema comuniquese con un tecnico
											$scope.bandera=bandera;
											$timeout(function callAtTimeout() {
											$scope.bandera=0;
											$scope.Documento = null ;
											$scope.$apply;;
											},tiempo);	      	
											break 		

								   		default: 
											$scope.bandera=bandera;
											$scope.Documento = null ;
								      		console.log('la bandera no tiene valor ' + bandera); 
					}

			});//,error(function(data){ console.log('Error no encontre persona: ' + data);});
		}//el documento no es null
	}

	function getIngresoMat(){

 		var createdAtInicio=inicioDia;
 		var createdAtFin=mediodia;
		var request = $http.get('/api/lstIngresoPorFecha?createdAtInicio='+createdAtInicio+'&createdAtFin='+createdAtFin).then(function(personas) { 
		$scope.ingreoManianals = [];

			if(personas.data.length>0){
				var lstAsist=personas.data[0].afiliacions[0].asistencia.length;
				for(var a=0; a<lstAsist; a++){
				var documento= personas.data[0].documento;
				var nombre=personas.data[0].nombre;
				var tienedauda=personas.data[0].afiliacions[0].asistencia[a].tipodeuda;
				var fecha=personas.data[0].afiliacions[0].asistencia[a].createdAt;
				var persona1 ={documento:documento,nombre:nombre,tienedauda:tienedauda,fecha:fecha};
				console.log(persona1);
				$scope.ingreoManianals.push(persona1);
				}
			}else{
				console.log('No hay ingresos matutino');
			}
		});
	}
	

	function getIngresoDesp(){

 		var createdAtInicio=mediodia;
 		var createdAtFin=finDia;
		var request1 = $http.get('/api/lstIngresoPorFecha?createdAtInicio='+createdAtInicio+'&createdAtFin='+createdAtFin).then(function(personas) { 
		$scope.ingreoTardels = [];

		if(personas.data.length>0){	
				var lstAsist=personas.data[0].afiliacions[0].asistencia.length;
				console.log("ada "+lstAsist);
			for(var a=0; a<lstAsist; a++){
				console.log(a);
				var documento= personas.data[0].documento;
				var nombre=personas.data[0].nombre;
				var tienedauda=personas.data[0].afiliacions[0].asistencia[a].tipodeuda;
				var fech=personas.data[0].afiliacions[0].asistencia[a].createdAt;
				var fecha =dividirCadena(fech,"-",2);
				var persona2 ={documento:documento,nombre:nombre,tienedauda:tienedauda,fecha:fecha};
				console.log(persona2);
				$scope.ingreoTardels.push(persona2);
				}
			}else{
				console.log('No hay ingresos despertino'); 
			}
		});
	}

	function  dividirCadena(cadenaADividir,separador,opcion) {
   		
		if(opcion==1){
			var arrayDeCadenas = cadenaADividir.split("T");
			var arrayDeCadenas2 = arrayDeCadenas[0].split(separador);
			var anio1=arrayDeCadenas2[0];
      		var mes1=arrayDeCadenas2[1];
      		var dia1=arrayDeCadenas2[2];

      		//console.log(anio1 + " "+mes1 +" "+dia1)
      		var devuelvo = new Date(anio1,(mes1-1),dia1,"00","00","00")

		}else{
			if(opcion==2){
			var arrayDeCadenas = cadenaADividir.split("T");
			var arrayDeCadenas2 = arrayDeCadenas[0].split(separador);
			var arrayDeCadenas3 = arrayDeCadenas[1].split(":");

			var anio1=arrayDeCadenas2[0];
      		var mes1=arrayDeCadenas2[1];
      		var dia1=arrayDeCadenas2[2];
      		var hora1=arrayDeCadenas3[0];
      		var minutos1=arrayDeCadenas3[1];
      		var segundos1=arrayDeCadenas3[2];

			}else{
				var arrayDeCadenas = cadenaADividir.split(separador);
	   			var anio1=arrayDeCadenas[0];
	      		var mes1=arrayDeCadenas[1];
	      		var dia1=arrayDeCadenas[2];
	      		var arrayDeCadenas = cadenaADividir.split(separador);
      			var devuelvo = new Date(anio1,(mes1-1),dia1,"00","00","00")
			}
      	}

      	return devuelvo;

		}

   
});


