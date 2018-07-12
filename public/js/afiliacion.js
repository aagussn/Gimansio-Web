var app = angular.module('afiliacion', ['ngCookies']);

app.controller('myController', function($scope, $http, $cookies) {
    // Si tiene cargada una persona es porque hace el upd entonces voy a buscar los datos y lo dejo todo para modificar
    var documento = $cookies.get('updPersona');
    if (documento) {
        $scope.list = 'http://localhost:3000/api/personas/'+ documento;        
        var request = $http.get($scope.list);
        request.success(function (persona) {
            $scope.documento    = persona.documento;     
            $scope.nombre       = persona.nombre;        
            $scope.apellido     = persona.apellido;      
            $scope.telefono     = persona.telefono;      
            $scope.sexo         = persona.sexo;          
            $scope.email        = persona.email;         
            $scope.fechan       = new Date(persona.fechaN);        
            $scope.emergencia   = persona.emergencia;    
            $scope.direccion    = persona.direccion;     
            $scope.telcontacto  = persona.contactofamilia;
            $scope.nomcontacto  = persona.nombrecontacto; 
            $scope.idobjetivos  = persona.idobjetivos;   
            $scope.idhorario    = persona.idhorario;     
            $scope.idlogro      = persona.idlogro;       
            $scope.idinteres    = persona.idinteres;     
            $scope.identerado   = persona.identerado;    
            $scope.idaviso      = persona.idaviso;       
            $scope.idprofesion  = persona.idprofesion;

            console.log('documento existe');
            console.log(persona);
        });    
    }
    $scope.submit = function() {
        console.log('submit afilacion');

        $scope.list = 'http://localhost:3000/api/personas';
        
        var parameter = JSON.stringify({
            documento : $scope.documento,
            nombre: $scope.nombre,
            apellido: $scope.apellido,
            telefono: $scope.telefono,
            sexo: $scope.sexo,
            email: $scope.email,
            fechaN: $scope.fechan,
            emergencia: $scope.emergencia,
            direccion: $scope.direccion,
            contactofamilia: $scope.telcontacto,
            nombrecontacto: $scope.nomcontacto,
            idobjetivos:$scope.idobjetivos,
            idhorario: $scope.idhorario,
            idlogro: $scope.idlogro,
            idinteres: $scope.idinteres,
            identerado: $scope.identerado,
            idaviso: $scope.idaviso,
            idprofesion: $scope.idprofesion
        });
        
        console.log(parameter);

        // Si no hay documento es porque es nuevo entonces hago insert
        if (!documento) {
            var request = $http.post($scope.list, parameter);

            request.success(function (data) {
                $scope.data = data;
                console.log('data afilacion');
                console.log(data);

                // Si esta bien creo la afiliacion
                $scope.list = 'http://localhost:3000/api/afiliacions';
                
                parameter = JSON.stringify({
                    documento : $scope.documento,
                    estado : 1
                });

                var request = $http.post($scope.list, parameter);
                // Si creo bien la afiliacion tengo que actualizar la persona con el idafi
                request.success(function (afiliacion) {
                    console.log('afilacion');
                    console.log(afiliacion);
                    
                    $scope.list = 'http://localhost:3000/api/personas/'+ $scope.documento;
                    
                    parameter = JSON.stringify({
                        afiliacionId: afiliacion.id
                    });
                    console.log('parameter afilacion');
                    console.log(parameter);

                    var request = $http.put($scope.list, parameter);

                    // Lo redirijo a la pagina principal
                    window.location.href = "http://localhost:3000/personas";
                });
            });

            request.error(function (data) {
                console.log('Error: ' + data);
            });
        } // Sino es nuevo hago el upd
        else {
            $scope.list += "/" + documento;
            var request = $http.put($scope.list, parameter);
            request.success(function (data) {
                window.location.href = "http://localhost:3000/personas";
            });
            // Borro la cookie
            $cookies.remove('updPersona');
        }
    };
});