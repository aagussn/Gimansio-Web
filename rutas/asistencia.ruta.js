module.exports = function(app) {
 

  const asistencia = require('../controlador/asistencia.controlador.js');
  
    // Create a new asistencia
    app.post('/api/asistencia', asistencia.create);
 
    // Retrieve all asistencia
    app.get('/api/asistencia', asistencia.findAll);
 
    // Retrieve a single asistencia by Id
    app.get('/api/asistencia/:documento', asistencia.findById);
 
    // Update a asistencia with Id
    app.put('/api/asistencia/:documento', asistencia.update);
 
    // Delete a asistencia with Id
    app.delete('/api/asistencia/:documento', asistencia.delete);
}