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
	Asistencia.findAll().then(asistencia => {
	  // Send all usuarios to Client
	  res.send(asistencia);
	});
};
 
// Find a Usuario by Id
exports.findById = (req, res) => {	
	Asistencia.findById(req.params.id).then(asistencia => {
		res.send(asistencia);
	})
};
// encontrar por documento
exports.findPorDocumento  = (req, res) => {// como le paso el documento
	Asistencia.findAll({where:{documento:req.body.documento} }).then(asistencia => {
	  // Send all usuarios to Client
	  res.send(asistencia);
	});
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