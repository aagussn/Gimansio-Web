module.exports = function(app) {
 

  const comentarios = require('../controlador/comentarios.controlador.js');
  
    // Create a new categoria
    app.post('/api/comentarios', comentarios.create);
 
    // Retrieve all categoria
    app.get('/api/comentarios', comentarios.findAll);
 
    // Retrieve a single categoria by Id
    app.get('/api/comentarios/:id', comentarios.findById);
 
    // Update a categoria with Id
    app.put('/api/comentarios/:id', comentarios.update);
 
    // Delete a categoria with Id
    app.delete('/api/comentarios/:id', comentarios.delete);
}