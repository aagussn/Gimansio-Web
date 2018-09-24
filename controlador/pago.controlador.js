const db = require('../cfg/db.js');
const Pago = db.pago;
 
// Post a pago
exports.create = (req, res) => {	
  	console.log('json: ', req.body);
  	//var pEstado=req.body.estado;
  	//var pDocumento=req.body.personaDocumento;
  	//var consulta='INSERT into afiliacions (id,estado,createdAt,updatedAt,personaDocumento) VALUES (DEFAULT,"pEstado", NOW(), NOW(),"pDocumento")';
	Pago.sequelize.query('INSERT into pagos (id,importe,mes,anio,tipomovimiento,concepto,pagoanulado,createdAt,updatedAt,planId,mediopagoId) VALUES (DEFAULT,:pImporte,:pMes,:pAnio,:pTipomovimiento,:pConcepto,:pPagoanulado, NOW(), NOW(),:pPlanId,:pMediopagoId)',
    { replacements: {pPlanId: req.body.planId,pImporte:req.body.importe,pMes:req.body.mes,pAnio:req.body.anio,pTipomovimiento:req.body.tipomovimiento,pConcepto:req.body.pconcepto,pMediopagoId:req.body.mediopagoId,pPagoanulado:req.body.pagoanulado}, 
       	type: Pago.sequelize.QueryTypes.INSERT
    }).then(pago => {
				// Send all usuarios to Client 
				console.log(pago);
		  		//res.send(afiliacion);
		}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};

// FETCH all pagos
exports.findAll = (req, res) => {
	var condition =
	{
		where:
			{

			}
	}
	
	if (req.query.planesId) {
		condition.where.planesId = req.query.planesId
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
	if (req.query.concepto) {
			condition.where.concepto = req.query.concepto
	}		
	if (req.query.createdAt) {
		condition.where.createdAt = req.query.createdAt
	}
	if (req.query.updatedAt) {
		condition.where.updatedAt = req.query.updatedAt
	}
	if (req.query.planId) {
		condition.where.planId = req.query.planId
	}
	
	if (req.query.mediopagoId) {
		condition.where.mediopagoId = req.query.mediopagoId
	}
	if (req.query.pagoanulado) {
		condition.where.pagoanulado = req.query.pagoanulado
	}
	
	
	Pago.findAll(condition).then(pago => {
	  // Send all pagos to Client
	  if(pago.length>0){
	  	pago.reverse();
	  }
	  res.send(pago);
	}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};

// Find a pago by Id
exports.findById = (req, res) => {	
	Pago.findById(req.params.id).then(pago => {
		res.send(pago);
	}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};
 
// Update a pago
exports.update = (req, res) => {
	const id = req.params.id;
	Pago.update( { pagoanulado: req.body.pagoanulado},
					 { where: {id: req.params.id} }
				   ).then(() => {
					 res.status(200).send("updated successfully de la pago del  pago");
				   }).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};
 
// Delete a pago by Id
exports.delete = (req, res) => {
	const id = req.params.id;
	Pago.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('deleted successfully a de la pago de pago');
	}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};



function handleError(res, statusCode) {
  statusCode = statusCode || 500
  return function(err) {
    res.status(statusCode).send(err)
  }
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity)
    }
  }
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end()
      return null
    }
    return entity
  }
}