//tabla asistencia
module.exports = (sequelize, Sequelize) => {
	
  	//var persona=  require('../modelos/persona.model.js')(sequelize, Sequelize);


	const Asistencia = sequelize.define('asistencia', {
	 
	  
      /*documento: {
        type: Sequelize.INTEGER,
      },*/
        
	});
	
	//Asistencia.belongsTo(persona);

	return Asistencia;
}

