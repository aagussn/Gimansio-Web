const db = require('../cfg/db.js');
const Usuario = db.usuarios;

// Post a Usuario
exports.create = (req, res) => {	
	// Save to MySQL database
	Usuario.create({  
	  user: req.body.user,
	  pswd: req.body.pswd
	}).then(usuario => {		
		// Send created usuario to client
		res.send(usuario);
	});
};
 
// FETCH all Usuarios
exports.findAll = (req, res) => {
	var condition =
	{
		where:
			{

			}
	}
	
	if (req.query.user) {
		condition.where.user = req.query.user
	}
	
	if (req.query.pswd) {
		condition.where.pswd = req.query.pswd
	}
	
	Usuario.findAll(condition)
	.then(usuarios => {
	  // Send all usuarios to Client
//	  console.log(req.query.user);
	  res.send(usuarios);
	});
};
 
// Find a Usuario by Id
exports.findById = (req, res) => {	
	Usuario.findById(req.params.usuarioId).then(usuario => {
		res.send(usuario);
	})
};
 
// Update a Usuario
exports.update = (req, res) => {
	const id = req.params.usuarioId;
	Usuario.update( { user: req.body.user, pswd: req.body.pswd }, 
					 { where: {id: req.params.usuarioId} }
				   ).then(() => {
					 res.status(200).send("updated successfully a usuario with id = " + id);
				   });
};
 
// Delete a Usuario by Id
exports.delete = (req, res) => {
	const id = req.params.usuarioId;
	Usuario.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('deleted successfully a usuario with id = ' + id);
	});
};