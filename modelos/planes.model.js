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
      
      importepago: {
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
      cuotasson: {
        type: Sequelize.INTEGER
      },
      cuotasvan: {
        type: Sequelize.INTEGER
      },
      
  });
	 
  Planes.hasMany(pg, { onDelete: 'cascade' });
  Planes.belongsTo(tipoPlan);

/*ejemplo 

      Orders.hasMany(models.lines, { onDelete: 'cascade' });


  Orders.hasMany(models.lines, { 
  onDelete: 'cascade',
  hooks: true, 
});



*/


	return Planes;
}
