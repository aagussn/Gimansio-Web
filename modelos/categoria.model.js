//tabla categoria
module.exports = (sequelize, Sequelize) => {
	const Categoria = sequelize.define('categoria', {
		 
      descripcion: {
      type: Sequelize.STRING
      },
      
	});
	
	return Categoria;
}