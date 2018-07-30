//tabla pago
module.exports = (sequelize, Sequelize) => {
	
  var persona=  require('../modelos/persona.model.js')(sequelize, Sequelize);

  const Pago = sequelize.define('pago', {
	 
    	id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      }, 
      /*documento: {
          type: Sequelize.INTEGER
          },*/
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
	    
  Pago.belongsTo(persona);

	return Pago;
}
