const db = require('../cfg/db.js');
const Objetivos = db.objetinstallivos;
 
// Post a Objetivos

exports.create = (req, res) => {	
	// creo una Objetivos
	Objetivos.create({  
	  documento: req.body.documento,
	  idafi:req.body.idafi,
	  idcategoria:req.body.idcategoria

	}).then(objetivos => {		
		// Send created usuario to client
		res.send(objetivos);
	});
};
 
// FETCH all Objetivoss
exports.findAll = (req, res) => {
	Objetivos.findAll().then(objetivos => {
	  // Send all usuarios to Client
	  res.send(objetivos);
	});
};
 
// Find a Objetivos by Id
exports.findById = (req, res) => {	
	Objetivos.findById(req.params.id).then(objetivos => {
		res.send(objetivos);
	})
};
 
// Update a Objetivos
exports.update = (req, res) => {
	const id = req.params.afiid;
	Objetivos.update( { documento: req.body.documento,
						idafi: req.body.idafi,
						idcategoria: req.body.idcategoria
						 }, 
					 { where: {id: req.params.id} }
				   ).then(() => {
					 res.status(200).send("updated successfully a usuario with id = " + id);
				   });
};
 
// Delete a Objetivos by Id
exports.delete = (req, res) => {
	const id = req.params.afiid;
	Objetivos.destroy({
	  where: { afiid: afiid }
	}).then(() => {
	  res.status(200).send('deleted successfully a usuario with id = ' + id);
	});
};