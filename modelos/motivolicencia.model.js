//tabla detalle comentarios
module.exports = (sequelize, Sequelize) => {
	
  const Motivolicencia = sequelize.define('motivolicencia', {
	 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      descripcion: {
        type: Sequelize.STRING,
      },
     
	});

	return Motivolicencia;
}