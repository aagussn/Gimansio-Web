//tabla pago
module.exports = (sequelize, Sequelize) => {
	
  const Pagos = sequelize.define('pago', {
	     
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      importe: {
        type: Sequelize.INTEGER
      },
      mes: {
        type: Sequelize.INTEGER
      },
      anio: {
        type: Sequelize.INTEGER
      },
      tipomovimiento: {
        type: Sequelize.INTEGER
      },
      tipopago: {
        type: Sequelize.INTEGER
      },
  });
	 
	return Pagos;
}
