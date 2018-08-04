//tabla personas-historial
module.exports = (sequelize, Sequelize) => {
      
      //var per=  require('../modelos/persona.model.js')(sequelize, Sequelize); 

      const HPersonas = sequelize.define('persona_hist', {
        documento: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false,
      },
      idafi: {
        type: Sequelize.INTEGER,
      },
      nombre: {
      type: Sequelize.STRING(20)
      },
      apellido: {
      type: Sequelize.STRING(20)
      },      
      fechaN: {
      type: Sequelize.DATE
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
      intereses: {
      type: Sequelize.STRING(20)
      },
      });

     // HPersonas.belongsTo(per);

      return HPersonas;
}