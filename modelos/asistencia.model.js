//tabla asistencia
module.exports = (sequelize, Sequelize) => {
	
	const Asistencia = sequelize.define('asistencia', {
	 
	  id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tipodeuda: {
        type: Sequelize.INTEGER
      },
           

	});
	

	return Asistencia;
}

