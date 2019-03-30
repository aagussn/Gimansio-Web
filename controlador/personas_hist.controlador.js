
const db = require('../cfg/db.js');
const Persona_hist  = db.persona_hist;
 
// Post a Usuario

exports.create = (req, res) => {	
	// creo una persona_hist
	Persona_hist.create({  
	  documento : req.body.documento,
	  idafi: req.body.idafi,
	  nombre:req.body.nombre,
	  apellido:req.body.apellido,
	  telefono:req.body.telefono,
	  sexo:req.body.sexo,
	  email:req.body.email,
	  fnacimiento:req.body.fnacimiento,
	  emergencia:req.body.emergencia,
	  direccion:req.body.direccion,
	  contactofamilia:req.body.contactofamilia,
	  nombrecontacto:req.body.nombrecontacto,
	  idprofesion:req.body.idprofesion

	}).then(persona_hist => {		
		// Send created usuario to client
		res.send(persona_hist);
	});
};
 
// FETCH all Persona_hist
exports.findAll = (req, res) => {
	Persona_hist.findAll().then(persona_hist => {
	  // Send all usuarios to Client
	  res.send(persona_hist);
	});
};
 
// Find a persona_hist by Id
exports.findById = (req, res) => {	
	Persona_hist.findById(req.params.documento).then(persona_hist => {
		res.send(persona_hist);
	})
};
 
// Update a persona_hist
exports.update = (req, res) => {
	const id = req.params.id;
	Persona_hist.update( { 	documento: req.body.documento,
					  	idafi: req.body.idafi,
					  	nombre:req.body.nombre,
	 				  	apellido:req.body.apellido,
	  					telefono:req.body.telefono,
	  					sexo:req.body.sexo,
						email:req.body.email,
	  					fnacimiento:req.body.fnacimiento,
	  					emergencia:req.body.emergencia,
	  					direccion:req.body.direccion,
	  					contactofamilia:req.body.contactofamilia,
	  					nombrecontacto:req.body.nombrecontacto,
	  					idprofesion:req.body.idprofesion
					   }, 
					 { where: {documento: req.body.documento} }
				   ).then(() => {
					 res.status(200).send("updated successfully a usuario with id = " + id);
				   });
};
 
// Delete a Persona_hist by Id
exports.delete = (req, res) => {
	const documento = req.body.documento;
	Persona_hist.destroy({
	  where: { documento: documento }
	}).then(() => {
	  res.status(200).send('deleted successfully a usuario with id = ' + id);
	});
};