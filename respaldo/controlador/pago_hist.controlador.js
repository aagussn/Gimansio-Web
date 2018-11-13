const db = require('../cfg/db.js');
const Pago_hist = db.pago_hist;
 
// Post a pago_hist
exports.create = (req, res) => {	
	// Save to MySQL database
	Pago_hist.create({ 
	  id: req.body.id,
	  documento: req.body.documento,
	  importe: req.body.importe,
	  mes: req.body.mes,
	  anio: req.body.anio,
	  tipomovimiento: req.body.tipomovimiento,
	  tipopago_hist: req.body.tipopago_hist

	}).then(pago_hist => {		
		// Send created pago_hist to client
		res.send(pago_hist);
	});
};
 
// FETCH all pago_hists
exports.findAll = (req, res) => {
	Pago_hist.findAll().then(pago_hist => {
	  // Send all pago_hists to Client
	  res.send(pago_hist);
	});
};
 
// Find a pago_hist by Id
exports.findById = (req, res) => {	
	Pago_hist.findById(req.params.id).then(pago_hist => {
		res.send(pago_hist);
	})
};
 
// Update a pago_hist
exports.update = (req, res) => {
	const id = req.params.id;
	Pago_hist.update( { tipomovimiento: req.body.tipomovimiento},
					 { where: {id: req.params.id} }
				   ).then(() => {
					 res.status(200).send("updated successfully de la pago_hist del  pago_hist");
				   });
};
 
// Delete a pago_hist by Id
exports.delete = (req, res) => {
	const id = req.params.id;
	Pago_hist.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('deleted successfully a de la pago_hist de pago_hist');
	});
};