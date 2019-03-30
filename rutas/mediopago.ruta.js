module.exports = function(app) {
 
  const mediopago = require('../controlador/mediopago.controlador.js');
  
    // Create a new itemcategoria
    app.post('/api/mediopago', mediopago.create);
 
    // Retrieve all itemcategoria
    app.get('/api/mediopago', mediopago.findAll);
 
    // Retrieve a single itemcategoria by Id
    app.get('/api/mediopago/:id', mediopago.findById);
 
    // Update a itemcategoria with Id
    app.put('/api/mediopago/:id', mediopago.update);
 
    // Delete a itemcategoria with Id
    app.delete('/api/mediopago/:id', mediopago.delete);
}