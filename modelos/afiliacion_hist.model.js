//tabla afiliacion-historial
module.exports = (sequelize, Sequelize) => {

  var afi=  require('../modelos/afiliacion.model.js')(sequelize, Sequelize);

	const HAfiliacion = sequelize.define('afiliacion_hist', {
	 
	  id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      documento: {
        type: Sequelize.INTEGER,
      },
      estado: {
      type: Sequelize.INTEGER
      },
      
	});
	     HAfiliacion.belongsTo(afi);

	return HAfiliacion;
}