const db = require('../cfg/db.js');
const Comentarios = db.comentarios;
 

exports.create = (req, res) => {	
  	console.log('json: ', req.body);
	
	Comentarios.sequelize.query('INSERT into comentarios (id,comentario,createdAt,updatedAt,personaDocumento) VALUES (DEFAULT,:pComentario, NOW(), NOW(),:pPersonaDocumento)',
    { replacements: {pComentario: req.body.comentario, pPersonaDocumento:req.body.personaDocumento}, 
       	type: Comentarios.sequelize.QueryTypes.INSERT
    }).then(comentarios => {
				// Send all usuarios to Client
				console.log(comentarios);
		  		res.send(comentarios);
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
			if (req.query.comentario) {
				condition.where.comentario = req.query.comentario
			}
			if (req.query.personaDocumento) {
				condition.where.personaDocumento = req.query.personaDocumento
			}
			

		
			Comentarios.findAll(condition)
				.then(comentarios => {
		  		res.send(comentarios);
			}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));	
};
 
// Find a Afiliacion by Id
exports.findById = (req, res) => {	
		Comentarios.findById(req.params.id).then(comentarios => {
		res.send(comentarios);
		}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};
 
// Update a Usuario
exports.update = (req, res) => {
		const id = req.params.id;
		Comentarios.update( { comentario: req.body.comentario }, 
			{ where: {id: req.params.id} }
			).then(() => {
				res.status(200).send("updated successfully a usuario with id = " + id);
			}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};


// Delete a Usuario by Id
exports.delete = (req, res) => {
		const id = req.params.id;
		Comentarios.destroy({
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