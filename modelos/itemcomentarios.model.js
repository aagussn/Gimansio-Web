//tabla detalle comentarios
module.exports = (sequelize, Sequelize) => {
	
  //const Comentarios=require('../modelos/comentarios.model.js')(sequelize, Sequelize);   

  const itemComentarios = sequelize.define('itemcomentarios', {
	 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      descripcion: {
        type: Sequelize.STRING,
      },
      
     
     
      
	});

 //itemComentarios.hasMany(Comentarios);
  //itemComentarios.belongsTo(Comentarios);


	return itemComentarios;
}