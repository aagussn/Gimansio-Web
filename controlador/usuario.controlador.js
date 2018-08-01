const db = require('../cfg/db.js');
const Usuario = db.usuarios;

// Post a Usuario
exports.create = (req, res) => {	
	// Save to MySQL database
	Usuario.create({  
	  user: req.body.user,
	  pswd: req.body.pswd
	}).then(usuario => {		
		// Send created usuario to client
		res.send(usuario);
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
	
	if (req.query.user) {
		condition.where.user = req.query.user
	}
	
	if (req.query.pswd) {
		condition.where.pswd = req.query.pswd
	}
	
	Usuario.findAll(condition)
	.then(usuarios => {
	  // Send all usuarios to Client
//	  console.log(req.query.user);
	  res.send(usuarios);
	}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};
 
// Find a Usuario by Id
exports.findById = (req, res) => {	
	Usuario.findById(req.params.usuarioId).then(usuario => {
		res.send(usuario);
	}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};
 
// Update a Usuario
exports.update = (req, res) => {
	const id = req.params.usuarioId;
	Usuario.update( { user: req.body.user, pswd: req.body.pswd }, 
					 { where: {id: req.params.usuarioId} }
				   ).then(() => {
					 res.status(200).send("updated successfully a usuario with id = " + id);
				   }).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};
 
// Delete a Usuario by Id
exports.delete = (req, res) => {
	const id = req.params.usuarioId;
	Usuario.destroy({
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