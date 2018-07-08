const db = require('../cfg/db.js');
const Afiliacion = db.afiliacion;
 
// Post a Usuario

exports.create = (req, res) => {	
	// creo una afiliacion
	Afiliacion.create({  
	  documento: req.body.documento,
	  estado:req.body.estado

	}).then(afiliacion => {		
		// Send created usuario to client
		res.send(afiliacion);
	});
};
 
// FETCH all Afiliacion
exports.findAll = (req, res) => {
	Afiliacion.findAll().then(afiliacion => {
	  // Send all usuarios to Client
	  res.send(afiliacion);
	});
};
 
// Find a Afiliacion by Id
exports.findById = (req, res) => {	
	Afiliacion.findById(req.params.id).then(afiliacion => {
		res.send(afiliacion);
	})
};
 
// Update a Usuario
exports.update = (req, res) => {
	const id = req.params.id;
	Afiliacion.update( { estado: req.body.estado }, 
					 { where: {id: req.params.id} }
				   ).then(() => {
					 res.status(200).send("updated successfully a usuario with id = " + id);
				   });
};
 
// Delete a Usuario by Id
exports.delete = (req, res) => {
	const id = req.params.id;
	Afiliacion.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('deleted successfully a usuario with id = ' + id);
	});
};