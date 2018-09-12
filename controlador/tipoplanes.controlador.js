const db = require('../cfg/db.js');
const Tipoplanes = db.tipoplanes;
 

exports.create = (req, res) => {	
	// creo una tipoplan
		Tipoplanes.create({  
		  id : req.body.id,
		  descripcion:req.body.descripcion,
		  duracion:req.body.duracion,
	 			  	
	  	}).then(tipoplan => {		
			// Send created usuario to client
			res.send(tipoplan);
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
				condition.where.duracion = req.query.duracion
			}
			if (req.query.descripcion) {
				condition.where.duracion = req.query.duracion
			}
			

		
			Tipoplanes.findAll(condition)
				.then(tipoplan => {
		  		res.send(tipoplan);
			}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));	
};
 
// Find a Afiliacion by Id
exports.findById = (req, res) => {	
		Tipoplanes.findById(req.params.id).then(tipoplan => {
		res.send(tipoplan);
		}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};
 
// Update a Usuario
exports.update = (req, res) => {
		const id = req.params.id;
		Tipoplanes.update( { descripcion: req.body.descripcion,duracion: req.body.duracion }, 
			{ where: {id: req.params.id} }
			).then(() => {
				res.status(200).send("updated successfully a usuario with id = " + id);
			}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};


// Delete a Usuario by Id
exports.delete = (req, res) => {
		const id = req.params.id;
		Itemcomentarios.destroy({
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