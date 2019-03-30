//tabla detalle comentarios
module.exports = (sequelize, Sequelize) => {
	
  const itemComentarios = sequelize.define('itemcomentarios', {
	 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      descripcion: {
        type: Sequelize.STRING(20),
      },
     
	});

	return itemComentarios;
}