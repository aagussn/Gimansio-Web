module.exports = function(app) {
 
 
  const personas = require('../controlador/personas.controlador.js');
  
    // Create a new personas
    app.post('/api/personas', personas.create);

    // Create a new personas y afililacion
    app.post('/api/insPersonaAfi', personas.insPersonaAfi);
 
    // Retrieve all personas
    app.get('/api/personas', personas.findAll);
 
    // Retrieve a single personas by documento
    app.get('/api/personas/:documento', personas.findById);
 
    // Update a personas with documento
    app.put('/api/personas/:documento', personas.update);
 
    // Delete a personas with documento
    app.delete('/api/personas/:documento', personas.delete);

   

    //me traigo con afiliacion vigente y sus planes
    app.get('/api/lstPerAfiPln', personas.lstPerAfiPln);

    // lista completa 
    app.get('/api/lstCompleta', personas.lstCompleta);
   

    //me traigo con afiliacion vigente y sus planes
    app.get('/api/lstAfiPln', personas.lstAfiPln);



    //****************************Comentarios y categorias **********************

    // las personas y sus comentarios
    app.get('/api/listPerComentarios', personas.listPerComentarios);

    // las personas y sus categorias
    app.get('/api/listPerCategorias', personas.listPerCategorias);

    // las personas, afiliacion y licencia
    app.get('/api/lstAfiLicencia', personas.lstAfiLicencia);





    //****************************Asistencias**********************

    //me traigo con afiliacion vigente y sus asistencias
    app.get('/api/lstAfi1Asis', personas.lstAfi1Asis);

     //me traigo todas las afiliacion  y sus asistencias
    app.get('/api/lstAfiAsis', personas.lstAfiAsis);



    //****************************Pagos***************************

    //me traigo la persona con la afiliacion vigente planes y sus pagos
    app.get('/api/listPagosVigentes', personas.listPagosVigentes);

    //me traigo la persona con la afiliacion vigente planes y sus pagos
    app.get('/api/listTodosPagos', personas.listTodosPagos);
    // ultimo pago 
    app.get('/api/ultimoPago', personas.ultimoPago);
    // parta control de ingreso 
    app.get('/api/controlIngreso', personas.controlIngreso);
     // lista de ingreso por turno
    app.get('/api/lstIngresoPorFecha', personas.lstIngresoPorFecha);


}