module.exports = function(app) {
 

  const afiliacions_hist = require('../controlador/afiliacion_hist.controlador.js');
  


  ///para nuevas consultas tengo que agregar aca la ruta
  
    // Create a new afiliacion
    app.post('/api/afiliacions_hist', afiliacions_hist.create);
 
    // Retrieve all afiliacion
    app.get('/api/afiliacions_hist', afiliacions_hist.findAll);
 
    // Retrieve a single afiliacion by Id
    app.get('/api/afiliacions_hist/:idafi', afiliacions_hist.findById);
 
    // Update a afiliacion with Id
    app.put('/api/afiliacions_hist/:idafi', afiliacions_hist.update);
 
    // Delete a afiliacion with Id
    app.delete('/api/afiliacions_hist/:idafi', afiliacions_hist.delete);
}