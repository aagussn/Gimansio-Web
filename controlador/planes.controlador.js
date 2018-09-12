const db = require('../cfg/db.js');
const Plan = db.planes;
 
// Post a plan
exports.create = (req, res) => {	
  	console.log('json: ', req.body);
  	//var pEstado=req.body.estado;
  	//var pDocumento=req.body.personaDocumento;
  	//var consulta='INSERT into afiliacions (id,estado,createdAt,updatedAt,personaDocumento) VALUES (DEFAULT,"pEstado", NOW(), NOW(),"pDocumento")';
	Plan.sequelize.query('INSERT into plans (id,importeplan,duracion,inicio,fin,createdAt,updatedAt,tipoplanId,afiliacionId) VALUES (DEFAULT,:pImporteplan,:pDuracion,:pInicio,:pFin, NOW(), NOW(),:pAfiliacionId,:pTipoplanId)',
    { replacements: {pAfiliacionId: req.body.afiliacionId,pImporteplan:req.body.importeplan,pDuracion:req.body.duracion,pInicio:req.body.inicio,pFin:req.body.fin,pTipoplanId:req.body.tipoplanId}, 
       	type: Plan.sequelize.QueryTypes.INSERT
    }).then(plan => {
				// Send all usuarios to Client 
				console.log(plan);
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
	
	if (req.query.importeplan) {
		condition.where.importeplan = req.query.importeplan
	}
	if (req.query.duracion) {
			condition.where.duracion = req.query.duracion
	}
	if (req.query.inicio) {
			condition.where.inicio = req.query.inicio
	}
	if (req.query.fin) {
			condition.where.fin = req.query.fin
	}
	if (req.query.afiliacionId) {
			condition.where.afiliacionId = req.query.afiliacionId
	}
	if (req.query.tipoPlan) {
			condition.where.tipoPlan = req.query.tipopago
	}	
	if (req.query.createdAt) {
		condition.where.createdAt = req.query.createdAt
	}
	if (req.query.updatedAt) {
		condition.where.updatedAt = req.query.updatedAt
	}
	
	Plan.findAll(condition).then(plan => {
	  // Send all pagos to Client
	  if(plan.length>0){
	  	plan.reverse();
	  }
	  res.send(plan);
	}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};

// Find a pago by Id
exports.findById = (req, res) => {	
	Plan.findById(req.params.id).then(plan => {
		res.send(plan);
	}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};
 
// Update a pago
exports.update = (req, res) => {
	const id = req.params.id;
	Plan.update( { importeplan: req.body.importeplan,duracion: req.body.duracion,inicio: req.body.inicio,fin: req.body.fin,tipoPlan: req.body.tipoPlan},
					 { where: {id: req.params.id} }
				   ).then(() => {
					 res.status(200).send("updated successfully de la plan del  plan");
				   }).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};
 
// Delete a pago by Id
exports.delete = (req, res) => {
	const id = req.params.id;
	Plan.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('deleted successfully a de la plan de plan');
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