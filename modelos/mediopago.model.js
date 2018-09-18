//tabla detalle tipos de pagos
module.exports = (sequelize, Sequelize) => {
	
  const Mediopago = sequelize.define('mediopago', {
	 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      descripcion: {
        type: Sequelize.STRING(30),
      },
      tipo: { 
        type: Sequelize.INTEGER
      },

     
	});

	return Mediopago;
}