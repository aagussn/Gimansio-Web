var app = require('./cfg/app');
var db = require('./cfg/db');
var path = require('path');
var port = process.env.PORT || 3000; //test
//var port = process.env.PORT || 49152; //produccion





require('./rutas/afiliacion.ruta.js')(app);
require('./rutas/afiliacions_hist.ruta.js')(app);
require('./rutas/asistencia.ruta.js')(app);
require('./rutas/categoria.ruta.js')(app);
require('./rutas/comentarios.ruta.js')(app);
require('./rutas/itemcomentarios.ruta.js')(app);
require('./rutas/itemcategoria.ruta.js')(app);
require('./rutas/objetivos.ruta.js')(app);
require('./rutas/pago.ruta.js')(app);
require('./rutas/pago_hist.ruta.js')(app);
require('./rutas/paramnum.ruta.js')(app);
require('./rutas/personas.ruta.js')(app);
require('./rutas/personas_hist.ruta.js')(app);
require('./rutas/profesion.ruta.js')(app);
require('./rutas/usuario.ruta.js')(app);
require('./rutas/planes.ruta.js')(app);
require('./rutas/tipoplanes.ruta.js')(app);
require('./rutas/licencia.ruta.js')(app);
require('./rutas/motivolicencia.ruta.js')(app);



// Ruta principal
    app.get('/', function (req, res) {
      res.sendFile(path.join(__dirname + '/public/html/index.html'));
    });

    // En algunos casos poner href="/" no anda y por eso hice esto
    app.get('/index', function (req, res) {
      res.redirect('/');
    });

    // Ruta barra principal
    app.get('/barra', function (req, res) {
      res.sendFile(path.join(__dirname + '/public/html/barra.html'));
    });

    // Ruta login
    app.get('/login', function (req, res) {
      res.sendFile(path.join(__dirname + '/public/html/login.html'));
    });

    // Ruta personas
    app.get('/personas', function (req, res) {
      res.sendFile(path.join(__dirname + '/public/html/personas.html'));
    });

    // Ruta afiliacion
    app.get('/afiliacion', function (req, res) {
      res.sendFile(path.join(__dirname + '/public/html/afiliacion.html'));
    });

    // Ruta ingreso
    app.get('/ingreso', function (req, res) {
      res.sendFile(path.join(__dirname + '/public/html/ingreso.html'));
    });
    // Ruta asistencia
    app.get('/asistencia', function (req, res) {
      res.sendFile(path.join(__dirname + '/public/html/asistencia.html'));
    });
    // Ruta asistencia
    app.get('/inasistencia', function (req, res) {
      res.sendFile(path.join(__dirname + '/public/html/inasistencia.html'));
    });

    // Ruta pago
    app.get('/pagos', function (req, res) {
      res.sendFile(path.join(__dirname + '/public/html/pagos.html'));
    });

try {
var server = app.listen(port, function() {
  console.log('Aplicacion ejecutandose en puerto: ' + port);
  
});
} catch(e) {
	
	console.log("nuestro error en server.log al asignar valor a var server  : "+e);
}


