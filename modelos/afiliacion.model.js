//tabla afiliacion
module.exports = (sequelize, Sequelize) => {
	
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

	
	return Afiliacion;
}


