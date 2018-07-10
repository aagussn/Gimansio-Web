
angular.module(Ingreso,[]).controller("IngresoControl", function($scope, $http){

//var app = angular.module('Ingreso',[]);
//var app = angular.module('test', []);
/* http://embed.plnkr.co/AI4qn8/
	// this represents the state of the dialog: a visible flag and the person being edited
	var EditPersonDialogModel = function () {
		  this.visible = false;
		};
		EditPersonDialogModel.prototype.open = function(person) {
		  this.person = person;
		  this.visible = true;
		};
		EditPersonDialogModel.prototype.close = function() {
		  this.visible = false;
		};

		app.controller('ctrl', ['$scope', function ($scope) {
		  $scope.editDialog = new EditPersonDialogModel();
		  
		  $scope.persons = [{name: 'John'}, {name: 'Barbara'}];
		  
		  $scope.add = function() {
		    $scope.persons.push({name: 'New Person'});
		  };
		}]);

		app.directive('editPersonDialog', [function() {
		  return {
		    restrict: 'E',
		    scope: {
		      model: '=',
		    },
		    link: function(scope, element, attributes) {
		      scope.$watch('model.visible', function(newValue) {
		        var modalElement = element.find('.modal');
		        modalElement.modal(newValue ? 'show' : 'hide');
		      });
		      
		      element.on('shown.bs.modal', function() {
		        scope.$apply(function() {
		          scope.model.visible = true;
		        });
		      });

		      element.on('hidden.bs.modal', function() {
		        scope.$apply(function() {
		          scope.model.visible = false;
		        });
		      });
		      
		    },
		    templateUrl: 'edit-person-dialog.html',
		  };
		}]);    	
*/
//app.controller('IngresoControl',  function($scope, $http) {
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
			EditPersonDialogModel();
	   	});
	   	laPersona.error(function(data){
	     	console.log('Error: ' + data);
		}); 
	}		
});
