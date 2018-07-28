//tabla afiliacion
module.exports = (sequelize, Sequelize) => {
	const Afiliacion = sequelize.define('afiliacion', {
	 
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
	
	return Afiliacion;
}

