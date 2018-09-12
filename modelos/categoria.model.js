//tabla categoria
module.exports = (sequelize, Sequelize) => {
	
	const itemCategoria=require('../modelos/itemcategoria.model.js')(sequelize, Sequelize);   

	const Categoria = sequelize.define('categoria', {
		id: {
        	type: Sequelize.INTEGER,
        	primaryKey: true,
        	autoIncrement: true,
      	},	 
     });
	
	Categoria.belongsTo(itemCategoria);

	return Categoria;
}