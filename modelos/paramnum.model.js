//tabla paramnum
module.exports = (sequelize, Sequelize) => {
	const Paramnum = sequelize.define('paramnum', {
	 
      valor: {
      type: Sequelize.INTEGER
      },
      descripcion: {
      type: Sequelize.STRING(20)
      }, 
	});
	
	return Paramnum;
}