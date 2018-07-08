module.exports = function(app) {

  const afiliacions = require('../controlador/afiliacion.controlador.js');
  
    // Create a new afiliacion
    app.post('/api/afiliacions', afiliacions.create);
 
    // Retrieve all afiliacion
    app.get('/api/afiliacions', afiliacions.findAll);
 
    // Retrieve a single afiliacion by Id
    app.get('/api/afiliacions/:id', afiliacions.findById);
 
    // Update a afiliacion with Id
    app.put('/api/afiliacions/:id', afiliacions.update);
 
    // Delete a afiliacion with Id
    app.delete('/api/afiliacions/:id', afiliacions.delete);
}