module.exports = function(app) {
 

  const profesion = require('../controlador/profesion.controlador.js');
  
    // Create a new profesion
    app.post('/api/profesion', profesion.create);
 
    // Retrieve all profesion
    app.get('/api/profesion', profesion.findAll);
 
    // Retrieve a single profesion by Id
    app.get('/api/profesion/:id', profesion.findById);
 
    // Update a profesion with Id
    app.put('/api/profesion/:id', profesion.update);
 
    // Delete a profesion with Id
    app.delete('/api/profesion/:id', profesion.delete);
}