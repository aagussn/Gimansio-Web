 //tabla personas
module.exports = (sequelize, Sequelize) => {
	
      var afi=  require('../modelos/afiliacion.model.js')(sequelize, Sequelize);


      const Persona = sequelize.define('persona', {
	 
	  documento: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false,
      },
      
      nombre: {
      type: Sequelize.STRING(20)
      },
      apellido: {
      type: Sequelize.STRING(20)
      },      
      fechaN: {
      type: Sequelize.DATEONLY
      },
      telefono: {
      type: Sequelize.INTEGER
      },
      email: {
      type: Sequelize.STRING(50)
      },
      sexo: {
      type: Sequelize.STRING(20)
      }, 
            emergencia: {
      type: Sequelize.STRING(20)
      },
      direccion: {
      type: Sequelize.STRING(50)
      },
      contactofamilia: {
      type: Sequelize.STRING(20)
      },
      nombrecontacto: {
      type: Sequelize.STRING(20)
      },           
      idprofesion: {
      type: Sequelize.INTEGER
      },
      idobjetivos: {
      type: Sequelize.INTEGER
      },
      idhorario: {
      type: Sequelize.INTEGER
      },
      idlogro: {
      type: Sequelize.INTEGER
      },
      idinteres: {
      type: Sequelize.INTEGER
      },
      identerado: {
      type: Sequelize.INTEGER
      },
      idaviso: {
      type: Sequelize.INTEGER
      },
     	});
	Persona.belongsTo(afi);

	return Persona;
}


