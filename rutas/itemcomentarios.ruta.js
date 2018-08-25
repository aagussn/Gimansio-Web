module.exports = function(app) {
 

  const itemcomentarios = require('../controlador/itemcomentarios.controlador.js');
  
    // Create a new itemcategoria
    app.post('/api/itemcomentarios', itemcategoria.create);
 
    // Retrieve all itemcategoria
    app.get('/api/itemcomentarios', itemcomentarios.findAll);
 
    // Retrieve a single itemcategoria by Id
    app.get('/api/itemcomentarios/:id', itemcomentarios.findById);
 
    // Update a itemcategoria with Id
    app.put('/api/itemcomentarios/:id', itemcomentarios.update);
 
    // Delete a itemcategoria with Id
    app.delete('/api/itemcomentarios/:id', itemcomentarios.delete);
}