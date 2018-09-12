module.exports = function(app) {
 

  const tipoplan = require('../controlador/tipoplanes.controlador.js');
  
    // Create a new categoria
    app.post('/api/tipoplan', tipoplan.create);
 
    // Retrieve all categoria
    app.get('/api/tipoplan', tipoplan.findAll);
 
    // Retrieve a single categoria by Id
    app.get('/api/tipoplan/:id', tipoplan.findById);
 
    // Update a categoria with Id
    app.put('/api/tipoplan/:id', tipoplan.update);
 
    // Delete a categoria with Id
    app.delete('/api/tipoplan/:id', tipoplan.delete);

    // lista con comentarios y el detalle del tipo de comentario
    //app.get('/api/categoComentarios', comentarios.categoriaComentarios);

}