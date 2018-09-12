module.exports = function(app) {
 

  const personas = require('../controlador/personas.controlador.js');
  
    // Create a new personas
    app.post('/api/personas', personas.create);
 
    // Retrieve all personas
    app.get('/api/personas', personas.findAll);
 
    // Retrieve a single personas by documento
    app.get('/api/personas/:documento', personas.findById);
 
    // Update a personas with documento
    app.put('/api/personas/:documento', personas.update);
 
    // Delete a personas with documento
    app.delete('/api/personas/:documento', personas.delete);

    //me traigo con afiliacion vigente y sus asistencias
    app.get('/api/lstAsistVigente', personas.lstAfiAsis1);

     //me traigo con afiliacion todas y sus asistencias
    app.get('/api/lstAsist', personas.lstAfiAsis);

    //me traigo la persona con la afiliacion vigente planes y sus pagos
    app.get('/api/lstPagosAfiVigente', personas.listPagosVigentes);

    //me traigo la persona con la afiliacion vigente planes y sus pagos
    app.get('/api/lstPagosTodos', personas.listPagosNoVigentes);

    // las personas y sus comentarios
    app.get('/api/listComentarios', personas.listPerComentarios);

    // las personas y sus categorias
    app.get('/api/listCategorias', personas.listPerCategorias);
    

    

}