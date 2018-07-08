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
	var condition =
		{
			where:
				{

				}
		}
	
		if (req.query.documento) {
			condition.where.documento = req.query.documento
		}
		if (req.query.estado) {
			condition.where.estado = req.query.estado
		}
		if (req.query.createdAt) {
			condition.where.createdAt = req.query.createdAt
		}
		if (req.query.updatedAt) {
			condition.where.updatedAt = req.query.updatedAt
		}

	
		Afiliacion.findAll(condition)
			.then(afiliacion => {
			// Send all usuarios to Client
			//console.log(req.query.user);
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