const db = require('../cfg/db.js');
const Itemcomentarios = db.itemcomentarios;
 

exports.create = (req, res) => {	
	// creo una itemcomentario
		Itemcomentarios.create({  
		  id : req.body.id,
		  descripcion:req.body.descripcion,
		 			  	
	  	}).then(itemcomentarios => {		
			// Send created usuario to client
			res.send(itemcomentarios);
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
			
			

		
			Itemcomentarios.findAll(condition)
				.then(itemcomentarios => {
		  		res.send(itemcomentarios);
			}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));	
};
 
// Find a Afiliacion by Id
exports.findById = (req, res) => {	
		Itemcomentarios.findById(req.params.id).then(itemcomentarios => {
		res.send(itemcomentarios);
		}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};
 
// Update a Usuario
exports.update = (req, res) => {
		const id = req.params.id;
		Itemcomentarios.update( { descripcion: req.body.descripcion }, 
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