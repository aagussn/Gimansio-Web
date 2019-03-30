const db = require('../cfg/db.js');
const Categoria = db.categoria;
 
// Post a Usuario
exports.create = (req, res) => {	
  	console.log('json: ', req.body);
	
	Categoria.sequelize.query('INSERT into categoria (id,createdAt,updatedAt,itemcategoriumId,personaDocumento) VALUES (DEFAULT, NOW(), NOW(),:pItemcategoriumId,:pPersonaDocumento)',
    { replacements: {pPersonaDocumento: req.body.personaDocumento, pItemcategoriumId:req.body.itemcategoriumId}, 
       	type: Categoria.sequelize.QueryTypes.INSERT
    }).then(categoria => {
				// Send all usuarios to Client
				console.log(categoria);
		  		res.send(categoria);
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
	if (req.query.personaDocumento) {
		condition.where.personaDocumento = req.query.personaDocumento
	}

	Categoria.findAll(condition)
	.then(categoria => {
	   res.send(categoria);
	}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
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
 
// Delete a Usuario by Id     ****** no puedo borrar verificar por que******
exports.delete = (req, res) => {
	const id = req.params.id;
	write(req.params.id);
	Categoria.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('deleted successfully a usuario with id = ' + id);
	}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};

// Delete a Usuario by Id     ****** no puedo borrar verificar por que******
exports.deleteCI = (req, res) => {
	const documento = req.params.documento;
	//write(req.params.documento);
	Categoria.destroy({
	  where: { personaDocumento: documento }
	}).then(() => {
	  res.status(200).send('deleted successfully a usuario with documento = ' + documento);
	}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};


//veo el tipo de categoria
exports.categoriaTipo = (req, res) => {
		var condition =	{
	
			include: [
		   		
				{
        		model: db.itemcategoria ,	
    			},
    		]
		}
		Categoria.findAll(condition)
				.then(categoria => {
		  		res.send(categoria);
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