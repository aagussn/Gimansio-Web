//tabla afiliacion
module.exports = (sequelize, Sequelize) => {
	
  const plans=require('../modelos/planes.model.js')(sequelize, Sequelize);     
  const asis=require('../modelos/asistencia.model.js')(sequelize, Sequelize);

  const Afiliacion = sequelize.define('afiliacion', {
	 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      estado: {
        type: Sequelize.INTEGER
      },
           
	});

	Afiliacion.hasMany(plans);
  Afiliacion.hasMany(asis);


	return Afiliacion;
}


