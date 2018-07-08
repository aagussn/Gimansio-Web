//tabla itemcategoria
module.exports = (sequelize, Sequelize) => {
	const Itemcategoria = sequelize.define('itemcategoria', {
	 
	 
      idcategoria: {
      type: Sequelize.INTEGER
      },
      
	});
	
	return Itemcategoria;
}