//tabla profesion
module.exports = (sequelize, Sequelize) => {
	const Profesion = sequelize.define('profesion', {
	 
	    
      descripcion: {
      type: Sequelize.STRING
      },

      
	});
	
	return Profesion;
}