module.exports = function(app) {
 

  const itemcategoria = require('../controlador/itemcategoria.controlador.js');
  
    // Create a new itemcategoria
    app.post('/api/itemcategoria', itemcategoria.create);
 
    // Retrieve all itemcategoria
    app.get('/api/itemcategoria', itemcategoria.findAll);
 
    // Retrieve a single itemcategoria by Id
    app.get('/api/itemcategoria/:id', itemcategoria.findById);
 
    // Update a itemcategoria with Id
    app.put('/api/itemcategoria/:id', itemcategoria.update);
 
    // Delete a itemcategoria with Id
    app.delete('/api/itemcategoria/:id', itemcategoria.delete);
}