//tabla objetivos
module.exports = (sequelize, Sequelize) => {
	const Objetivos = sequelize.define('objetivos', {
	 
	 
      documento: {
      type: Sequelize.INTEGER
      },
      idafi: {
      type: Sequelize.INTEGER
      },
      idcategoria: {
      type: Sequelize.INTEGER
      },

      
	});
	
	return Objetivos;
}