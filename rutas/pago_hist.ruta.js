module.exports = function(app) {
 

  const pago_hist = require('../controlador/pago_hist.controlador.js');
  
    // Create a new pago_hist
    app.post('/api/pago_hist', pago_hist.create);
 
    // Retrieve all pago_hist
    app.get('/api/pago_hist', pago_hist.findAll);
 
    // Retrieve a single pago_hist by Id
    app.get('/api/pago_hist/:id', pago_hist.findById);
 
    // Update a pago_hist with Id
    app.put('/api/pago_hist/:id', pago_hist.update);
 
    // Delete a pago_hist with Id
    app.delete('/api/pago_hist/:id', pago_hist.delete);
}