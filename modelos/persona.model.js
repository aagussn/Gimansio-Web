 //tabla personas
module.exports = (sequelize, Sequelize) => {
      
      const afi=require('../modelos/afiliacion.model.js')(sequelize, Sequelize);
      const asis=require('../modelos/asistencia.model.js')(sequelize, Sequelize);
      const pg=require('../modelos/pago.model.js')(sequelize, Sequelize);    
      const coment=require('../modelos/comentarios.model.js')(sequelize, Sequelize);   
      const catego=require('../modelos/categoria.model.js')(sequelize, Sequelize);   


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
                  type: Sequelize.STRING(20)
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
                  type: Sequelize.STRING(50)
            },
            nombrecontacto: {
                  type: Sequelize.STRING(50)
            },           
            idprofesion: {
                  type: Sequelize.STRING(20)
            },
            idobjetivos: {
                  type: Sequelize.STRING(20)
            },
            idhorario: {
                  type: Sequelize.STRING(20)
            },
            idlogro: {
                  type: Sequelize.STRING(20)
            },
            idinteres: {
                  type: Sequelize.STRING(20)
            },
            identerado: {
                  type: Sequelize.STRING(20)
            },
            idaviso: {
                  type: Sequelize.STRING(20)
            },
      });
      Persona.hasMany(afi);
      Persona.hasMany(asis);
      Persona.hasMany(pg);
      Persona.hasMany(coment);
      Persona.hasMany(catego);



	return Persona;
}



