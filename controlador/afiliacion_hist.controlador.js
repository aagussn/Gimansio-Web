const db = require('../cfg/db.js');
const Afiliacion_hist = db.afiliacion_hist;
 
// Post a Usuario

exports.create = (req, res) => {	
	// creo una afiliacion_hist
	Afiliacion_hist.create({  
	  documento: req.body.documento,
	  estado:req.body.estado

	}).then(afiliacion_hist => {		
		// Send created usuario to client
		res.send(afiliacion_hist);
	});
};
 
// FETCH all Afiliacion_hist
exports.findAll = (req, res) => {
	Afiliacion_hist.findAll().then(afiliacion_hist => {
	  // Send all usuarios to Client
	  res.send(afiliacion_hist);
	});
};
 
// Find a Afiliacion_hist by Id
exports.findById = (req, res) => {	
	Afiliacion_hist.findById(req.params.id).then(afiliacion_hist => {
		res.send(afiliacion_hist);
	})
};
 
// Update a Usuario
exports.update = (req, res) => {
	const id = req.params.id;
	Afiliacion_hist.update( { estado: req.body.estado }, 
					 { where: {id: req.params.id} }
				   ).then(() => {
					 res.status(200).send("updated successfully a usuario with id = " + id);
				   });
};
 
// Delete a Usuario by Id
exports.delete = (req, res) => {
	const id = req.params.id;
	Afiliacion_hist.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('deleted successfully a usuario with id = ' + id);
	});
};