const db = require('../cfg/db.js');
const Itemcategoria = db.itemcategoria;
 
// Post a Usuario
exports.create = (req, res) => {	
	// Save to MySQL database
	Itemcategoria.create({  
	  	  idcategoria: req.body.idcategoria,
	}).then(itemcategoria => {		
		// Send created usuario to client
		res.send(itemcategoria);
	});
};
 
// FETCH all Usuarios
exports.findAll = (req, res) => {
	Itemcategoria.findAll().then(itemcategoria => {
	  // Send all usuarios to Client
	  res.send(itemcategoria);
	});
};
 
// Find a Usuario by Id
exports.findById = (req, res) => {	
	Itemcategoria.findById(req.params.id).then(itemcategoria => {
		res.send(itemcategoria);
	})
};
 
// Update a Usuario
exports.update = (req, res) => {
	const id = req.params.id;
	Itemcategoria.update( { idcategoria: req.body.idcategoria }, 
					 { where: {id: req.params.id} }
				   ).then(() => {
					 res.status(200).send("updated successfully a usuario with id = " + id);
				   });
};
 
// Delete a Usuario by Id
exports.delete = (req, res) => {
	const id = req.params.id;
	Itemcategoria.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('deleted successfully a usuario with id = ' + id);
	});
};