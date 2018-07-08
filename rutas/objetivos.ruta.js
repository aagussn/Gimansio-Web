module.exports = function(app) {
 

  const objetivos = require('../controlador/objetivos.controlador.js');
  
    // Create a new objetivos
    app.post('/api/objetivos', objetivos.create);
 
    // Retrieve all objetivos
    app.get('/api/objetivos', objetivos.findAll);
 
    // Retrieve a single objetivos by Id
    app.get('/api/objetivos/:id', objetivos.findById);
 
    // Update a objetivos with Id
    app.put('/api/objetivos/:id', objetivos.update);
 
    // Delete a objetivos with Id
    app.delete('/api/objetivos/:id', objetivos.delete);
}