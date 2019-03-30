const db = require('../cfg/db.js');
const Licencia = db.licencia;
 

exports.create = (req, res) => {	
  	console.log('json: ', req.body);
	
	Licencia.sequelize.query('INSERT into licencia (id,descripcion,inicio,fin,createdAt,updatedAt,motivolicenciumId,afiliacionId) VALUES (DEFAULT,:pDescripcion,:pInicio,:pFin, NOW(), NOW(),:pMotivolicenciumId,:pAfiliacionId)',
    { replacements: { pDescripcion:req.body.descripcion, pInicio: req.body.inicio,pFin:req.body.fin ,pMotivolicenciumId:req.body.motivolicenciumId,pAfiliacionId:req.body.afiliacionId},  
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
			if (req.query.descripcion) {
				condition.where.descripcion = req.query.descripcion
			}
			if (req.query.inicio) {
				condition.where.inicio = req.query.inicio
			}
			if (req.query.fin) {
				condition.where.fin = req.query.fin
			}
			if (req.query.motivolicenciumId) {
				condition.where.motivolicenciumId = req.query.motivolicenciumId
			}
			if (req.query.afiliacionId) {
				condition.where.afiliacionId = req.query.afiliacionId
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
		Licencia.update( { descripcion: req.body.descripcion }, 
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
exports.licenciaConMotivo = (req, res) => {
		var condition =	{
	
			include: [
		   		
				{
        		model: db.motivolicencia ,	
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