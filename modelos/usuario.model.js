
//tabla usuarios
module.exports = (sequelize, Sequelize) => {
	const Usuario = sequelize.define('usuario', {
	  user: {
		type: Sequelize.STRING
	  },
	  pswd: {
		type: Sequelize.STRING
	  }
	});
	
	return Usuario;
}

