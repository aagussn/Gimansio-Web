//tabla planes
module.exports = (sequelize, Sequelize) => {
	
  const pg=require('../modelos/pago.model.js')(sequelize, Sequelize);    
  const tipoPlan=require('../modelos/tipoplanes.model.js')(sequelize, Sequelize);   


  const Planes = sequelize.define('plan', {
	     
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      importeplan: {
        type: Sequelize.INTEGER
      },
      duracion: {
        type: Sequelize.INTEGER
      },
      inicio: {
        type: Sequelize.DATEONLY
      },
      fin: {
        type: Sequelize.DATEONLY
      },
      
  });
	 
  Planes.hasMany(pg);
  Planes.belongsTo(tipoPlan);

	return Planes;
}
