module.exports = function(app) {
 

  const paramnum = require('../controlador/paramnum.controlador.js');
  
    // Create a new paramnum
    app.post('/api/paramnum', paramnum.create);
 
    // Retrieve all paramnum
    app.get('/api/paramnum', paramnum.findAll);
 
    // Retrieve a single paramnum by Id
    app.get('/api/paramnum/:id', paramnum.findById);
 
    // Update a paramnum with Id
    app.put('/api/paramnum/:id', paramnum.update);
 
    // Delete a paramnum with Id
    app.delete('/api/paramnum/:id', paramnum.delete);
}