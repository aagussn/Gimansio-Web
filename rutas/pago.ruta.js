module.exports = function(app) {
 

  const pago = require('../controlador/pago.controlador.js');
  
    // Create a new pago
    app.post('/api/pago', pago.create);
 
    // Retrieve all pago
    app.get('/api/pago', pago.findAll);
 
    // Retrieve a single pago by Id
    app.get('/api/pago/:id', pago.findById);

    // ultimopago
    app.get('/api/pago/ultimopago/:documento', pago.findUltimoPago);
 
    // Update a pago with Id
    app.put('/api/pago/:id', pago.update);
 
    // Delete a pago with Id
    app.delete('/api/pago/:id', pago.delete);
}



