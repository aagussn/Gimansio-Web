//tabla planes
module.exports = (sequelize, Sequelize) => {
	
  const motivo=require('../modelos/motivolicencia.model.js')(sequelize, Sequelize);   


  const Licencia = sequelize.define('licencia', {
	     
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      descripcion: {
        type: Sequelize.TEXT
      },
      inicio: { type: Sequelize.DATEONLY,  unique: 'licenciaunica' },
      fin: { type: Sequelize.DATEONLY,  unique: 'licenciaunica' },
	 
  

/*ejemplo 

      Orders.hasMany(models.lines, { onDelete: 'cascade' });


  Orders.hasMany(models.lines, { 
  onDelete: 'cascade',
  hooks: true, 
});

*/
    });

    Licencia.belongsTo(motivo);

	 return Licencia;
}
