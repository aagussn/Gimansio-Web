const db = require('../cfg/db.js');
const Profesion = db.profesion;
 
// Post a Usuario
exports.create = (req, res) => {	
	// Save to MySQL database
	Profesion.create({  
	  descipcion: req.body.descipcion,
	}).then(profesion => {		
		// Send created usuario to client
		res.send(profesion);
	});
};
 
// FETCH all Usuarios
exports.findAll = (req, res) => {
	Profesion.findAll().then(profesion => {
	  // Send all usuarios to Client
	  res.send(profesion);
	});
};
 
// Find a Usuario by Id
exports.findById = (req, res) => {	
	Profesion.findById(req.params.id).then(profesion => {
		res.send(profesion);
	})
};
 
// Update a Usuario
exports.update = (req, res) => {
	const id = req.params.id;
	Profesion.update( { descripsion: req.body.descripsion }, 
					 { where: {id: req.params.id} }
				   ).then(() => {
					 res.status(200).send("updated successfully a usuario with id = " + id);
				   });
};
 
// Delete a Usuario by Id
exports.delete = (req, res) => {
	const id = req.params.id;
	Profesion.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('deleted successfully a usuario with id = ' + id);
	});
};