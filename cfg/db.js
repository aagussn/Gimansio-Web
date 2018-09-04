const Sequelize = require('sequelize');
//const sequelize = new Sequelize('mysql://root:@localhost:3306/gimnasi1'); //conexion Test
//const sequelize = new Sequelize('mysql://alcuboah_arenasdelpinar:arenas2018@localhost:3306/alcuboah_arenasdelpinar');//produccion
const sequelize = new Sequelize('mysql://root:@localhost:3306/gim2'); //conexion Test
//const sequelize = new Sequelize('mysql://root:@localhost:3306/a'); //conexion Test


sequelize
  .authenticate()
  .then(() => {
    console.log('Se establecio coneccion a la base de datos.');
  })
  .catch(err => {
    console.error('Error: no se pudo establecer coneccion a la base de datos.', err);
  });
  //si la estructura de la base de datos no existe la crea
sequelize.sync();

// Forzado: true dropea las tablas si existen
//sequelize.sync({force: true}).then(() => {
//  console.log('Drop and Resync with { force: true }');
//});  
 
//Models/tables
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.usuarios   = require('../modelos/usuario.model.js')(sequelize, Sequelize);
db.comentarios = require('../modelos/comentarios.model.js')(sequelize, Sequelize);
db.itemcomentarios   = require('../modelos/itemcomentarios.model.js')(sequelize, Sequelize);
db.pago=require('../modelos/pago.model.js')(sequelize, Sequelize);
db.afiliacion = require('../modelos/afiliacion.model.js')(sequelize, Sequelize);
db.afiliacion_hist = require('../modelos/afiliacion_hist.model.js')(sequelize, Sequelize);
db.asistencia = require('../modelos/asistencia.model.js')(sequelize, Sequelize);
db.categoria = require('../modelos/categoria.model.js')(sequelize, Sequelize);
db.itemcategoria = require('../modelos/itemcategoria.model.js')(sequelize, Sequelize);
db.objetivos = require('../modelos/objetivos.model.js')(sequelize, Sequelize);
db.persona_hist=require('../modelos/persona_hist.model.js')(sequelize, Sequelize);
db.pago_hist=require('../modelos/pago_hist.model.js')(sequelize, Sequelize);
db.paramnum=require('../modelos/paramnum.model.js')(sequelize, Sequelize);
db.profesion=require('../modelos/paramnum.model.js')(sequelize, Sequelize);
db.itemcomentarios   = require('../modelos/itemcomentarios.model.js')(sequelize, Sequelize);
db.persona=require('../modelos/persona.model.js')(sequelize, Sequelize);



module.exports = db;