//tabla afiliacion
module.exports = (sequelize, Sequelize) => {
	const Afiliacion = sequelize.define('afiliacion', {
	 
      documento: {
        type: Sequelize.INTEGER,
      },
      estado: {
      type: Sequelize.INTEGER
      },
      
	});
	
	return Afiliacion;
}

