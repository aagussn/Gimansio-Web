const db = require('../cfg/db.js');
const paramnum = db.paramnum;
 
// Post a paramnum
exports.create = (req, res) => {	
	// Save to MySQL database
	paramnum.create({ 
	  id: req.body.id,
	  descripcion: req.body.descripcion,
	  valor: req.body.tipoparamnum

	}).then(paramnum => {		
		// Send created paramnum to client
		res.send(paramnum);
	}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};
 
// FETCH all paramnums
exports.findAll = (req, res) => {
	paramnum.findAll().then(paramnum => {
	  // Send all paramnums to Client
	  res.send(paramnum);
	}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};
 
// Find a paramnum by Id
exports.findById = (req, res) => {	
	paramnum.findById(req.params.id).then(paramnum => {
		res.send(paramnum);
	}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};
 
// Update a paramnum
exports.update = (req, res) => {
	const id = req.params.id;
	paramnum.update( { valor: req.body.valor},
					 { where: {id: req.params.id} }
				   ).then(() => {
					 res.status(200).send("updated successfully de la paramnum del  paramnum");
				   }).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};
 
// Delete a paramnum by Id
exports.delete = (req, res) => {
	const id = req.params.id;
	paramnum.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('deleted successfully a de la paramnum de paramnum');
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