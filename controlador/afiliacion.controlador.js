const db = require('../cfg/db.js');
const Afiliacion = db.afiliacion;
 
/*// Post a Usuario
exports.create = (req, res) => {	
	// creo una afiliacion
	Afiliacion.create({ 

		persona_id: req.body.persona_id,
		estado:req.body.estado
		//references: { model: 'users', key: 'id' }
	  		
	}).then(afiliacion => {		
		// Send created usuario to client
		res.send(afiliacion);
		}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};*/
 
exports.create = (req, res) => {	
  	console.log('json: ', req.body);
  	//var pEstado=req.body.estado;
  	//var pDocumento=req.body.personaDocumento;
  	//var consulta='INSERT into afiliacions (id,estado,createdAt,updatedAt,personaDocumento) VALUES (DEFAULT,"pEstado", NOW(), NOW(),"pDocumento")';
	Afiliacion.sequelize.query('INSERT into afiliacions (id,estado,createdAt,updatedAt,personaDocumento) VALUES (DEFAULT,"pEstado", NOW(), NOW(),"pDocumento")',
    { replacements: {pDocumento: req.body.personaDocumento}, 
       	type: Afiliacion.sequelize.QueryTypes.INSERT
    }).then(afiliacion => {
				// Send all usuarios to Client
				//console.log(req.query.user);
		  		res.send(afiliacion);
		}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};








// FETCH all Afiliacion
exports.findAll = (req, res) => {
		var condition =
			{
				where:
					{

					}
			}
		
			if (req.query.personaDocumento) {
				condition.where.personaDocumento = req.query.personaDocumento
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
			}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));	
};
 
// Find a Afiliacion by Id
exports.findById = (req, res) => {	
		Afiliacion.findById(req.params.id).then(afiliacion => {
		res.send(afiliacion);
		}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};
 
// Update a Usuario
exports.update = (req, res) => {
		const id = req.params.id;
		Afiliacion.update( { estado: req.body.estado }, 
			{ where: {id: req.params.id} }
			).then(() => {
				res.status(200).send("updated successfully a usuario with id = " + id);
			}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};


// Delete a Usuario by Id
exports.delete = (req, res) => {
		const id = req.params.id;
		Afiliacion.destroy({
	  						where: { id: id }
		}).then(() => {
	  		res.status(200).send('deleted successfully a usuario with id = ' + id);
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