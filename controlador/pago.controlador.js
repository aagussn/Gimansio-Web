const db = require('../cfg/db.js');
const Pago = db.pago;
 
// Post a pago
exports.create = (req, res) => {	
	// Save to MySQL database
	Pago.create({ 
	  id: req.body.id,
	  documento: req.body.documento,
	  importe: req.body.importe,
	  mes: req.body.mes,
	  anio: req.body.anio,
	  tipomovimiento: req.body.tipomovimiento,
	  tipopago: req.body.tipopago

	}).then(pago => {		
		// Send created pago to client
		res.send(pago);
	});
};
 
// FETCH all pagos
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
	
	Pago.findAll(condition).then(pago => {
	  // Send all pagos to Client
	  res.send(pago);
	});
};
 
// Find a pago by Id
exports.findById = (req, res) => {	
	Pago.findById(req.params.id).then(pago => {
		res.send(pago);
	})
};
 
// Update a pago
exports.update = (req, res) => {
	const id = req.params.id;
	Pago.update( { tipomovimiento: req.body.tipomovimiento},
					 { where: {id: req.params.id} }
				   ).then(() => {
					 res.status(200).send("updated successfully de la pago del  pago");
				   });
};
 
// Delete a pago by Id
exports.delete = (req, res) => {
	const id = req.params.id;
	Pago.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('deleted successfully a de la pago de pago');
	});
};