//tabla itemcategoria
module.exports = (sequelize, Sequelize) => {
	

	const Itemcategoria = sequelize.define('itemcategoria', {
	 
		id: {
        	type: Sequelize.INTEGER,
        	primaryKey: true,
        	autoIncrement: true,
      	},
      	tipo: {
      		type: Sequelize.INTEGER
      	},
      	descripcion: {
        	type: Sequelize.STRING,
      	},


	});
	
	return Itemcategoria;
}