const db = require('../cfg/db.js');
const Asistencia = db.asistencia;
 
/*// Post a Asistencia
exports.create = (req, res) => {	
	
		// Save to MySQL database
		Asistencia.create({  
		  documento: req.body.documento,
		}).then(asistencia => {		
			// Send created usuario to client
			res.send(asistencia);
		}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res))
};*/
 
exports.create = (req, res) => {	
  	console.log('json: ', req.body);
  	//var pEstado=req.body.estado;
  	//var pDocumento=req.body.personaDocumento;
  	//var consulta='INSERT into afiliacions (id,estado,createdAt,updatedAt,personaDocumento) VALUES (DEFAULT,"pEstado", NOW(), NOW(),"pDocumento")';
	Asistencia.sequelize.query('INSERT into asistencia (id,tipodeuda,createdAt,updatedAt,afiliacionId) VALUES (DEFAULT,:pTipodeuda, NOW(), NOW(),:pAfiliacionId)',
    { replacements: {pAfiliacionId: req.body.afiliacionId ,pTipodeuda: req.body.tipodeuda}, 
       	type: Asistencia.sequelize.QueryTypes.INSERT
    }).then(asistencia => {
				// Send all usuarios to Client 
				console.log(asistencia);
		  		//res.send(afiliacion);
		}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};


// FETCH all Usuarios
exports.findAll = (req, res) => {
		var condition =
			{
				where:
					{

					}
			}
		
			if (req.query.afiliacionId) {
				condition.where.afiliacionId = req.query.afiliacionId
			}
			if (req.query.createdAt) {
				condition.where.createdAt = req.query.createdAt
			}
			if (req.query.updatedAt) {
				condition.where.updatedAt = req.query.updatedAt
			}
			if (req.query.tipodeuda) {
				condition.where.tipodeuda = req.query.tipodeuda
			}

		
			Asistencia.findAll(condition)
				.then(asistencia => {
				// Send all usuarios to Client
				//console.log(req.query.user);
		  		res.send(asistencia);
			}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));	
};
 
// Find a Usuario by Id
exports.findById = (req, res) => {	
		Asistencia.findById(req.params.id).then(asistencia => {
			res.send(asistencia);
		}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};
 
// Update a Asistencia
exports.update = (req, res) => {
		const id = req.params.id;
		Asistencia.update( { asistencia: req.body.asistencia},
						 { where: {id: req.params.id} }
					   ).then(() => {
						 res.status(200).send("updated successfully de la asistencia del  usuario");
					   }).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};
 
// Delete a Usuario by Id
exports.delete = (req, res) => {
		const id = req.params.id;
		Asistencia.destroy({
		  where: { id: id }
		}).then(() => {
		  res.status(200).send('deleted successfully a de la asistencia de usuario');
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