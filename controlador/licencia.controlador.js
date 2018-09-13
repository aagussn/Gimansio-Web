const db = require('../cfg/db.js');
const Licencia = db.licencia;
 

exports.create = (req, res) => {	
  	console.log('json: ', req.body);
	
	Licencia.sequelize.query('INSERT into licencia (id,titulo,comentario,createdAt,updatedAt,itemcomentarioId,personaDocumento) VALUES (DEFAULT,:ptitulo,:pComentario, NOW(), NOW(),:pitemcomentarioId,:pPersonaDocumento)',
    { replacements: { ptitulo:req.body.titulo,pComentario: req.body.comentario,pitemcomentarioId:req.body.itemcomentarioId ,pPersonaDocumento:req.body.personaDocumento}, 
       	type: Licencia.sequelize.QueryTypes.INSERT
    }).then(licencia => {
				// Send all usuarios to Client
				console.log(licencia);
		  		res.send(licencia);
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
			if (req.query.titulo) {
				condition.where.titulo = req.query.titulo
			}
			if (req.query.comentario) {
				condition.where.comentario = req.query.comentario
			}
			if (req.query.personaDocumento) {
				condition.where.personaDocumento = req.query.personaDocumento
			}
			if (req.query.itemcomentarioId) {
				condition.where.itemcomentarioId = req.query.itemcomentarioId
			}

		
			Licencia.findAll(condition)
				.then(licencia => {
		  		res.send(licencia);
			}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));	
};
 
// Find a Afiliacion by Id
exports.findById = (req, res) => {	
		Licencia.findById(req.params.id).then(licencia => {
		res.send(licencia);
		}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};
 
// Update a Usuario
exports.update = (req, res) => {
		const id = req.params.id;
		Licencia.update( { comentario: req.body.comentario }, 
			{ where: {id: req.params.id} }
			).then(() => {
				res.status(200).send("updated successfully a usuario with id = " + id);
			}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};


// Delete a Usuario by Id
exports.delete = (req, res) => {
		const id = req.params.id;
		Licencia.destroy({
	  						where: { id: id }
		}).then(() => {
	  		res.status(200).send('deleted successfully a usuario with id = ' + id);
		}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};



//veo el tipo de comentario
exports.categoriaComentarios = (req, res) => {
		var condition =	{
	
			include: [
		   		
				{
        		model: db.itemcomentarios ,	
    			},
    		]
		}
		Licencia.findAll(condition)
				.then(licencia => {
		  		res.send(licencia);
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