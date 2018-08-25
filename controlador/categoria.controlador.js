const db = require('../cfg/db.js');
const Categoria = db.categoria;
 
// Post a Usuario
exports.create = (req, res) => {	
  	console.log('json: ', req.body);
	
	Categoria.sequelize.query('INSERT into categoria (id,createdAt,updatedAt,personaDocumento) VALUES (DEFAULT, NOW(), NOW(),:ppersonaDocumento)',
    { replacements: {ppersonaDocumento: req.body.personaDocumento}, 
       	type: Categoria.sequelize.QueryTypes.INSERT
    }).then(categoria => {
				// Send all usuarios to Client
				console.log(categoria);
		  		res.send(categoria);
		}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};
 
// FETCH all Usuarios
exports.findAll = (req, res) => {
	Categoria.findAll().then(categoria => {
	  // Send all usuarios to Client
	  res.send(categoria);
	});
};
 
// Find a Usuario by Id
exports.findById = (req, res) => {	
	Categoria.findById(req.params.id).then(categoria => {
		res.send(categoria);
	}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};
 
// Update a Usuario
/*exports.update = (req, res) => {
	const id = req.params.id;
	Categoria.update( { descripcion: req.body.descripcion }, 
					 { where: {id: req.params.id} }
				   ).then(() => {
					 res.status(200).send("updated successfully a usuario with id = " + id);
				   }).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};*/
 
// Delete a Usuario by Id
exports.delete = (req, res) => {
	const id = req.params.id;
	Categoria.destroy({
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