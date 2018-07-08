const db = require('../cfg/db.js');
const paramnum = db.paramnum;
 
// Post a paramnum
exports.create = (req, res) => {	
	// Save to MySQL database
	Paramnum.create({ 
	  id: req.body.id,
	  valor: req.body.tipoparamnum

	}).then(paramnum => {		
		// Send created paramnum to client
		res.send(paramnum);
	});
};
 
// FETCH all paramnums
exports.findAll = (req, res) => {
	Paramnum.findAll().then(paramnum => {
	  // Send all paramnums to Client
	  res.send(paramnum);
	});
};
 
// Find a paramnum by Id
exports.findById = (req, res) => {	
	Paramnum.findById(req.params.id).then(paramnum => {
		res.send(paramnum);
	})
};
 
// Update a paramnum
exports.update = (req, res) => {
	const id = req.params.id;
	Paramnum.update( { valor: req.body.valor},
					 { where: {id: req.params.id} }
				   ).then(() => {
					 res.status(200).send("updated successfully de la paramnum del  paramnum");
				   });
};
 
// Delete a paramnum by Id
exports.delete = (req, res) => {
	const id = req.params.id;
	Paramnum.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('deleted successfully a de la paramnum de paramnum');
	});
};