//tabla comentarios
module.exports = (sequelize, Sequelize) => {
	

  const itemComentarios=require('../modelos/itemcomentarios.model.js')(sequelize, Sequelize);   


  const Comantarios = sequelize.define('comentarios', {
	 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      comentario: {
        type: Sequelize.TEXT                        
      },
     
     
      
	});
  
  Comantarios.hasMany(itemComentarios);

	return Comantarios;
}