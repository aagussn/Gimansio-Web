//tabla pago
module.exports = (sequelize, Sequelize) => {
	
      const Pago = sequelize.define('pago', {
	 
	   id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false,
      }, 
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
	
	return Pago;
}
