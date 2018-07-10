var app = angular.module('afiliacion', ['ngCookies']);

app.controller('myController', function($scope, $http, $cookies) {
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
            nombrecontacto: $scope.nomcontacto
        });
        
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

    };
});