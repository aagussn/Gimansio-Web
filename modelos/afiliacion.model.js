//tabla afiliacion
module.exports = (sequelize, Sequelize) => {
	
  const plans=require('../modelos/planes.model.js')(sequelize, Sequelize);     
  const asis=require('../modelos/asistencia.model.js')(sequelize, Sequelize);
  const licencia=require('../modelos/licencia.model.js')(sequelize, Sequelize);


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

	Afiliacion.hasMany(plans, { onDelete: 'cascade' });
  Afiliacion.hasMany(asis, { onDelete: 'cascade' });
  Afiliacion.hasMany(licencia, { onDelete: 'cascade' });


	return Afiliacion;
}


