//tabla asistencia
module.exports = (sequelize, Sequelize) => {
	const Asistencia = sequelize.define('asistencia', {
	 
	  
      documento: {
        type: Sequelize.INTEGER,
      },
        
	});
	
	return Asistencia;
}