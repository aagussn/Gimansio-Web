const db = require('../cfg/db.js');
const Categoria = db.categoria;
 
// Post a Usuario
exports.create = (req, res) => {	
	// Save to MySQL database
	Categoria.create({  
	  descripcion: req.body.descripcion
	}).then(categoria => {		
		// Send created categoria to client
		res.send(categoria);
	});
};
 
// FETCH all Usuarios
exports.findAll = (req, res) => {
	Categoria.findAll().then(categoria => {
	  // Send all usuarios to Client
	  res.send(categoria);
	});
};
 
// Find a Usuario by Id
exports.findById = (req, res) => {	
	Categoria.findById(req.params.id).then(categoria => {
		res.send(categoria);
	})
};
 
// Update a Usuario
exports.update = (req, res) => {
	const id = req.params.id;
	Categoria.update( { descripcion: req.body.descripcion }, 
					 { where: {id: req.params.id} }
				   ).then(() => {
					 res.status(200).send("updated successfully a usuario with id = " + id);
				   });
};
 
// Delete a Usuario by Id
exports.delete = (req, res) => {
	const id = req.params.id;
	Categoria.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('deleted successfully a usuario with id = ' + id);
	});
};