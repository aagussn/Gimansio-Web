const db = require('../cfg/db.js');
const Persona  = db.persona;
 
// Post a Usuario

exports.create = (req, res) => {	
	// creo una persona
	Persona.create({  
	  documento : req.body.documento,
	  idafi: req.body.idafi,
	  nombre:req.body.nombre,
	  apellido:req.body.apellido,
	  telefono:req.body.telefono,
	  sexo:req.body.sexo,
	  email:req.body.email,
	  fechaN:req.body.fechaN,
	  emergencia:req.body.emergencia,
	  direccion:req.body.direccion,
	  contactofamilia:req.body.contactofamilia,
	  nombrecontacto:req.body.nombrecontacto,
	  idprofesion:req.body.idprofesion

	}).then(persona => {		
		// Send created usuario to client
		res.send(persona);
	});
};
 
// FETCH all Persona
exports.findAll = (req, res) => {
	Persona.findAll().then(persona => {
	  // Send all usuarios to Client
	  res.send(persona);
	});
};
 
// Find a persona by Id
exports.findById = (req, res) => {	
	Persona.findById(req.params.documento).then(persona => {
		res.send(persona);
	})
};
 
// Update a persona
exports.update = (req, res) => {
	const id = req.params.id;
	Persona.update( { 	documento: req.body.documento,
					  	idafi: req.body.idafi,
					  	nombre:req.body.nombre,
	 				  	apellido:req.body.apellido,
	  					telefono:req.body.telefono,
	  					sexo:req.body.sexo,
						email:req.body.email,
	  					fechaN:req.body.fechaN,
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
 
// Delete a Persona by Id
exports.delete = (req, res) => {
	const documento = req.body.documento;
	Persona.destroy({
	  where: { documento: documento }
	}).then(() => {
	  res.status(200).send('deleted successfully a usuario with id = ' + id);
	});
};