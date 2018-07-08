module.exports = function(app) {
 

  const categoria = require('../controlador/categoria.controlador.js');
  
    // Create a new categoria
    app.post('/api/categoria', categoria.create);
 
    // Retrieve all categoria
    app.get('/api/categoria', categoria.findAll);
 
    // Retrieve a single categoria by Id
    app.get('/api/categoria/:id', categoria.findById);
 
    // Update a categoria with Id
    app.put('/api/categoria/:id', categoria.update);
 
    // Delete a categoria with Id
    app.delete('/api/categoria/:id', categoria.delete);
}