//tabla itemcategoria
module.exports = (sequelize, Sequelize) => {
	

  //const Persona=require('../modelos/persona.model.js')(sequelize, Sequelize);   

	const Empleado = sequelize.define('empleado', {
	 
		id: {
        	type: Sequelize.INTEGER,
        	primaryKey: true,
        	autoIncrement: true,
      	},
      	tipo: { // esto seria el tipo de categoria por ejemplo objetivo
      		type: Sequelize.INTEGER
      	},
      	descripcion: {
        	type: Sequelize.STRING,
      	},
	});
    
  //Empleado.belongsTo(Persona);

	
	return Empleado;
}