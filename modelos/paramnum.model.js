//tabla paramnum
module.exports = (sequelize, Sequelize) => {
	const Paramnum = sequelize.define('paramnum', {
	 
      valor: {
      type: Sequelize.INTEGER
      },

      
	});
	
	return Paramnum;
}