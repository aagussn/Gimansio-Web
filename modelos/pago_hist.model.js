//tabla pago-historial
module.exports = (sequelize, Sequelize) => {
	
      const HPago = sequelize.define('pago_hist', {
	 
	 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false,
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
	
	return HPago;
}