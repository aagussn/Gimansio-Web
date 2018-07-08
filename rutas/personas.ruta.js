module.exports = function(app) {
 

  const personas = require('../controlador/personas.controlador.js');
  
    // Create a new personas
    app.post('/api/personas', personas.create);
 
    // Retrieve all personas
    app.get('/api/personas', personas.findAll);
 
    // Retrieve a single personas by documento
    app.get('/api/personas/:documento', personas.findById);
 
    // Update a personas with documento
    app.put('/api/personas/:documento', personas.update);
 
    // Delete a personas with documento
    app.delete('/api/personas/:documento', personas.delete);
}