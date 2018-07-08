var app = require('./cfg/app');
var db = require('./cfg/db');
var port = process.env.PORT || 3000;
 
require('./rutas/afiliacion.ruta.js')(app);
require('./rutas/afiliacions_hist.ruta.js')(app);
require('./rutas/asistencia.ruta.js')(app);
require('./rutas/categoria.ruta.js')(app);
require('./rutas/itemcategoria.ruta.js')(app);
require('./rutas/objetivos.ruta.js')(app);
require('./rutas/pago.ruta.js')(app);
require('./rutas/pago_hist.ruta.js')(app);
require('./rutas/paramnum.ruta.js')(app);
require('./rutas/personas.ruta.js')(app);
require('./rutas/personas_hist.ruta.js')(app);
require('./rutas/profesion.ruta.js')(app);
require('./rutas/usuario.ruta.js')(app);

var server = app.listen(port, function() {
  console.log('Aplicacion ejecutandose en puerto: ' + port);
  
});

