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
	if (req.query.importe) {
			condition.where.importe = req.query.importe
	}
	if (req.query.anio) {
			condition.where.anio = req.query.anio
	}
	if (req.query.mes) {
			condition.where.mes = req.query.mes
	}
	if (req.query.tipomovimiento) {
			condition.where.tipomovimiento = req.query.tipomovimiento
	}
	if (req.query.tipopago) {
			condition.where.tipopago = req.query.tipopago
	}		
	if (req.query.createdAt) {
		condition.where.createdAt = req.query.createdAt
	}
	if (req.query.updatedAt) {
		condition.where.updatedAt = req.query.updatedAt
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
// ultimopago
/*exports.findUltimoPago = (req, res) => {	
	Pago.query("select * from  pagos where documento="+req.params.documento+" and id=(select max(id) from pagos where documento="+req.params.documento: DOMString).then(pago => {
		res.send(pago);
	})
};*/
// ultimopago
exports.findUltimoPago = (req, res) => {	
	var condition =
	{
		where:
			{
				documento:req.params.documento
			}
	}
	
	
	Pago.findAll(condition).then(pago => {
		var max=0;
		var a=0;
		var elPago=null;
		if(pago){
			do{
				if(max>0){
					a+=1;
					elPago=pago[a];
					if(elPago.id>max){
						max=elPago.id;
					}	
				}else {
					elPago=pago[a];
					max=elPago.id;
				}
				
			}
			while(a < pago.length);
			
		}

	  res.send(elPago);
	});
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