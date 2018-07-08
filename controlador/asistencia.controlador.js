const db = require('../cfg/db.js');
const Asistencia = db.asistencia;
 
// Post a Asistencia
exports.create = (req, res) => {	
	// Save to MySQL database
	Asistencia.create({  
	  documento: req.body.documento,
	}).then(asistencia => {		
		// Send created usuario to client
		res.send(asistencia);
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
	
		if (req.query.documento) {
			condition.where.documento = req.query.documento
		}
		if (req.query.createdAt) {
			condition.where.createdAt = req.query.createdAt
		}
		if (req.query.updatedAt) {
			condition.where.updatedAt = req.query.updatedAt
		}

	
		Asistencia.findAll(condition)
			.then(asistencia => {
			// Send all usuarios to Client
			//console.log(req.query.user);
	  		res.send(asistencia);
		});	
};
 
// Find a Usuario by Id
exports.findById = (req, res) => {	
	Asistencia.findById(req.params.id).then(asistencia => {
		res.send(asistencia);
	})
};
 
// Update a Asistencia
exports.update = (req, res) => {
	const id = req.params.id;
	Asistencia.update( { asistencia: req.body.asistencia},
					 { where: {id: req.params.id} }
				   ).then(() => {
					 res.status(200).send("updated successfully de la asistencia del  usuario");
				   });
};
 
// Delete a Usuario by Id
exports.delete = (req, res) => {
	const id = req.params.id;
	Asistencia.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('deleted successfully a de la asistencia de usuario');
	});
};