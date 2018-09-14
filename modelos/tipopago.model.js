//tabla detalle tipos de pagos
module.exports = (sequelize, Sequelize) => {
	
  const TipoPago = sequelize.define('tipopago', {
	 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      descripcion: {
        type: Sequelize.STRING(30),
      },
     
	});

	return TipoPago;
}