//tabla afiliacion
module.exports = (sequelize, Sequelize) => {
	
  //const pg=require('../modelos/pago.model.js')(sequelize, Sequelize);     


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

	//Afiliacion.hasMany(pg);

	return Afiliacion;
}


