module.exports = function(app) {
 
  const usuarios = require('../controlador/usuario.controlador.js');
  
    // Create a new usuario
    app.post('/api/usuarios', usuarios.create);
 
    // Retrieve all usuario
    app.get('/api/usuarios', usuarios.findAll);
 
    // Retrieve a single usuario by Id
    app.get('/api/usuarios/:usuarioId', usuarios.findById);
 
    // Update a usuario with Id
    app.put('/api/usuarios/:usuarioId', usuarios.update);
 
    // Delete a usuario with Id
    app.delete('/api/usuarios/:usuarioId', usuarios.delete);
}