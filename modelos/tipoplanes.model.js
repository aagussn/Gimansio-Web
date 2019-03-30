//tabla detalle tipoplanes
module.exports = (sequelize, Sequelize) => {
	
  const tiposPlanes = sequelize.define('tipoplan', {
	 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      descripcion: {
        type: Sequelize.STRING,
      },
      duracion: {
        type: Sequelize.INTEGER
      },
           
	});
 
	return tiposPlanes;
}