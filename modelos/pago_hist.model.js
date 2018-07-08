//tabla pago-historial
module.exports = (sequelize, Sequelize) => {
	
      var pagos =require('../modelos/pago.model.js')(sequelize, Sequelize);


      const HPago = sequelize.define('pago_hist', {
	 
	 
      documento: {
      type: Sequelize.INTEGER
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
	
      HPago.belongsTo(pagos);

	return HPago;
}