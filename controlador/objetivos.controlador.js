const db = require('../cfg/db.js');
const Objetivos = db.objetinstallivos;
 
// Post a Objetivos

exports.create = (req, res) => {	
	// creo una Objetivos
	Objetivos.create({  
	  documento: req.body.documento,
	  idafi:req.body.idafi,
	  idcategoria:req.body.idcategoria

	}).then(objetivos => {		
		// Send created usuario to client
		res.send(objetivos);
	}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};
 
// FETCH all Objetivoss
exports.findAll = (req, res) => {
	Objetivos.findAll().then(objetivos => {
	  // Send all usuarios to Client
	  res.send(objetivos);
	}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};
 
// Find a Objetivos by Id
exports.findById = (req, res) => {	
	Objetivos.findById(req.params.id).then(objetivos => {
		res.send(objetivos);
	}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};
 
// Update a Objetivos
exports.update = (req, res) => {
	const id = req.params.afiid;
	Objetivos.update( { documento: req.body.documento,
						idafi: req.body.idafi,
						idcategoria: req.body.idcategoria
						 }, 
					 { where: {id: req.params.id} }
				   ).then(() => {
					 res.status(200).send("updated successfully a usuario with id = " + id);
				   }).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};
 
// Delete a Objetivos by Id
exports.delete = (req, res) => {
	const id = req.params.afiid;
	Objetivos.destroy({
	  where: { afiid: afiid }
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