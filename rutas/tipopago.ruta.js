module.exports = function(app) {
 
  const tipopago = require('../controlador/tipopago.controlador.js');
  
    // Create a new itemcategoria
    app.post('/api/tipopago', tipopago.create);
 
    // Retrieve all itemcategoria
    app.get('/api/tipopago', tipopago.findAll);
 
    // Retrieve a single itemcategoria by Id
    app.get('/api/tipopago/:id', tipopago.findById);
 
    // Update a itemcategoria with Id
    app.put('/api/tipopago/:id', tipopago.update);
 
    // Delete a itemcategoria with Id
    app.delete('/api/tipopago/:id', tipopago.delete);
}