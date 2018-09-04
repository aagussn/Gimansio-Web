const db = require('../cfg/db.js');
const Itemcategoria = db.itemcategoria;
 
// Post a Usuario
exports.create = (req, res) => {	
  	console.log('json: ', req.body);
	
	Itemcategoria.sequelize.query('INSERT into itemcategoria (id,tipo,descripcion,createdAt,updatedAt,categoriumId) VALUES (DEFAULT,:ptipo,:pdescripcion, NOW(), NOW(),:pcategoriumId)',
    { replacements: {ptipo: req.body.tipo, pdescripcion:req.body.descripcion, pcategoriumId: req.body.categoriumId}, 
       	type: Itemcategoria.sequelize.QueryTypes.INSERT
    }).then(itemcategoria => {
				// Send all usuarios to Client
				console.log(itemcategoria);
		  		res.send(itemcategoria);
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
			if (req.query.tipo) {
				condition.where.tipo = req.query.tipo
			}
			if (req.query.descripcion) {
				condition.where.descripcion = req.query.descripcion
			}
			if (req.query.categoriumId) {
				condition.where.categoriumId = req.query.categoriumId
			}

			

		
			Itemcategoria.findAll(condition)
				.then(itemcategoria => {
		  		res.send(itemcategoria);
			}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));	
};
 
// Find a Usuario by Id
exports.findById = (req, res) => {	
	Itemcategoria.findById(req.params.id).then(itemcategoria => {
		res.send(itemcategoria);
	}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};
 
// Update a Usuario
exports.update = (req, res) => {
	const id = req.params.id;
	Itemcategoria.update( { descripcion: req.body.descripcion }, 
					 { where: {id: req.params.id} }
				   ).then(() => {
					 res.status(200).send("updated successfully a usuario with id = " + id);
				   }).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};
 
// Delete a Usuario by Id
exports.delete = (req, res) => {
	const id = req.params.id;
	Itemcategoria.destroy({
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