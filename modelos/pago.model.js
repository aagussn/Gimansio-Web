//tabla pago
module.exports = (sequelize, Sequelize) => {
	
  const Mediopago=require('../modelos/mediopago.model.js')(sequelize, Sequelize);   


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
      concepto:{ type: Sequelize.INTEGER,  unique: 'pagounico' },
      pagoanulado: {type: Sequelize.INTEGER, unique: 'pagounico'},
      planId: {type: Sequelize.INTEGER, unique: 'pagounico'},
      
  });

	 
  Pagos.belongsTo(Mediopago);


	return Pagos;
}
