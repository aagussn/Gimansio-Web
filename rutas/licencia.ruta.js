module.exports = function(app) {
 
  const licencia = require('../controlador/licencia.controlador.js');
  
    // Create a new itemcategoria
    app.post('/api/licencia', licencia.create);
 
    // Retrieve all itemcategoria
    app.get('/api/licencia', licencia.findAll);
 
    // Retrieve a single itemcategoria by Id
    app.get('/api/licencia/:id', licencia.findById);
 
    // Update a itemcategoria with Id
    app.put('/api/licencia/:id', licencia.update);
 
    // Delete a itemcategoria with Id
    app.delete('/api/licencia/:id', licencia.delete);

     // busco licencia y descpcion de motivo
    app.get('/api/licenciamotivo', licencia.licenciaConMotivo);
}