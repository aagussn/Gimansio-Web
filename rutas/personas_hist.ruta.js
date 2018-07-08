module.exports = function(app) {
 

  const personas_hist = require('../controlador/personas_hist.controlador.js');
  
    // Create a new personas_hist
    app.post('/api/personas_hist', personas_hist.create);
 
    // Retrieve all personas_hist
    app.get('/api/personas_hist', personas_hist.findAll);
 
    // Retrieve a single personas_hist by documento
    app.get('/api/personas_hist/:documento', personas_hist.findById);
 
    // Update a personas_hist with documento
    app.put('/api/personas_hist/:documento', personas_hist.update);
 
    // Delete a personas_hist with documento
    app.delete('/api/personas_hist/:documento', personas_hist.delete);
}