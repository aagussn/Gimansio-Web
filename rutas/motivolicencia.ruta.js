module.exports = function(app) {
 
  const motivolicencia = require('../controlador/motivolicencia.controlador.js');
  
    // Create a new itemcategoria
    app.post('/api/motivolicencia', motivolicencia.create);
 
    // Retrieve all itemcategoria
    app.get('/api/motivolicencia', motivolicencia.findAll);
 
    // Retrieve a single itemcategoria by Id
    app.get('/api/motivolicencia/:id', motivolicencia.findById);
 
    // Update a itemcategoria with Id
    app.put('/api/motivolicencia/:id', motivolicencia.update);
 
    // Delete a itemcategoria with Id
    app.delete('/api/motivolicencia/:id', motivolicencia.delete);
}