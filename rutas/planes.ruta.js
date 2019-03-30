module.exports = function(app) {
 

  const planes = require('../controlador/planes.controlador.js');
  
    // Create a new categoria
    app.post('/api/planes', planes.create);
 
    // Retrieve all categoria
    app.get('/api/planes', planes.findAll);
 
    // Retrieve a single categoria by Id
    app.get('/api/planes/:id', planes.findById);
 
    // Update a categoria with Id
    app.put('/api/planes/:id', planes.update);
 
    // Delete a categoria with Id
    app.delete('/api/planes/:id', planes.delete);

    // lista con comentarios y el detalle del tipo de comentario
    //app.get('/api/categoComentarios', comentarios.categoriaComentarios);

}