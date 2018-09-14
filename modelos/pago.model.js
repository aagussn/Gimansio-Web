//tabla pago
module.exports = (sequelize, Sequelize) => {
	
  const Pagos = sequelize.define('pago', {
	     
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      
      importe: { type: Sequelize.INTEGER,  unique: 'pagounico' },
      mes: { type: Sequelize.INTEGER,  unique: 'pagounico' },
      anio:{ type: Sequelize.INTEGER,  unique: 'pagounico' },
      tipomovimiento:{ type: Sequelize.INTEGER,  unique: 'pagounico' },
      tipopago:{ type: Sequelize.INTEGER,  unique: 'pagounico' },
  });
	 
	return Pagos;
}
