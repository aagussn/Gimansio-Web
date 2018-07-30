//tabla afiliacion
module.exports = (sequelize, Sequelize) => {
	
  var persona= require('../modelos/persona.model.js')(sequelize, Sequelize);

  const Afiliacion = sequelize.define('afiliacion', {
	 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      /*documento: {
        type: Sequelize.INTEGER,
      },*/
      estado: {
        type: Sequelize.INTEGER
      },
      
	});
   Afiliacion.belongsTo(persona);

	
	return Afiliacion;
}


