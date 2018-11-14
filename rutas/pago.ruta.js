module.exports = function(app) {
 

  const pago = require('../controlador/pago.controlador.js');
  
    // Create a new pago
    app.post('/api/pago', pago.create);
    // Create a new pago y upd plan
    app.post('/api/insPagoUpdPlan', pago.insPagoUpdPlan);
    
 
    // Retrieve all pago
    app.get('/api/pago', pago.findAll);
 
    // Retrieve a single pago by Id
    app.get('/api/pago/:id', pago.findById);
 
    // Update a pago with Id
    //app.put('/api/pago/:id', pago.update);
    app.put('/api/pago/', pago.update);

 
    // Delete a pago with Id
    app.delete('/api/pago/:id', pago.delete);
}



