var app = angular.module('Pagos', ['ngCookies']);
app.controller('myController', function($scope, $http, $cookies) {
    
    var chkLogin = $cookies.get('login');
    console.log(chkLogin);
    if (chkLogin==0 || !chkLogin) {
        console.log('bla');
        window.location.href = "/login";
    }

    $scope.documento = $cookies.get('Pagocookie');
    $scope.banderaPago=1;


    if (!$scope.documento) {
        window.location.href = "/";
    }

    console.log($scope.documento);
    
    $scope.list = '/api/personas/';
    $scope.list += $scope.documento;
    var request = $http.get($scope.list);
    
    request.success(function(personas) {
        $scope.personas = personas;
        console.log('pago personas.js');
    });
    
    request.error(function(personas){
        console.log('Error: ' + personas);
    });

    $scope.pagos = [];
    
    $scope.list = '/api/pago?';
    $scope.list += 'documento=' + $scope.documento;

    var request = $http.get($scope.list);    
    
    request.success(function(pagos) {
        $scope.pagos = pagos;
        console.log('pago pagos.js');
    });
    
    request.error(function(pagos){
        console.log('Error: ' + pagos);
    });

    $scope.submit = function() {
        $scope.list = '/api/pago';
        
        var parameter = JSON.stringify({
            importe: $scope.search.importe,
            mes: $scope.search.mes,
            anio:$scope.search.anio,
            tipomovimiento: $scope.search.tipomovimiento,
            tipopago: $scope.search.tipopago,
            personaDocumento: $scope.documento,
        });
        $scope.banderaPago=2;
        var request = $http.post($scope.list, parameter);

        request.success(function (data) {
            $scope.data = data;
            console.log(data);
        });

        request.error(function (data) {
            console.log('Error: ' + data);
        });
        window.location.reload();
    };

});