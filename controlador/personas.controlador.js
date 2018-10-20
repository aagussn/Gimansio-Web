const db = require('../cfg/db.js');
const Persona  = db.persona;
const sequelize=db.sequelize;
const Sequelize=db.Sequelize;
const Op = Sequelize.Op


// Post a Usuario
exports.create = (req, res) => {	
		// creo una persona
		Persona.create({  
		  documento : req.body.documento,
		  nombre:req.body.nombre,
		  apellido:req.body.apellido,
		  telefono:req.body.telefono,
		  sexo:req.body.sexo,
		  email:req.body.email,
		  fechaN:req.body.fechaN,
		  emergencia:req.body.emergencia,
		  direccion:req.body.direccion,
		  contactofamilia:req.body.contactofamilia,
		  nombrecontacto:req.body.nombrecontacto,
		  idprofesion:req.body.idprofesion,
		 // idobjetivos:req.body.idobjetivos,
		  idhorario: req.body.idhorario,
		  idlogro: req.body.idlogro,
		 // idinteres: req.body.idinteres,
		  identerado: req.body.identerado,
	  	  idaviso: req.body.idaviso
	  			  	
	  	}).then(persona => {		
			// Send created usuario to client
			res.send(persona);
			}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
		
};
 
// FETCH all Persona
exports.findAll = (req, res) => {
	var condition =
	{
		where:
			{

			}
	}
	if (req.query.nombre) {
		condition.where.nombre = req.query.nombre
	}
	if (req.query.apellido) {
		condition.where.apellido = req.query.apellido
	}
	if (req.query.fechaN) {
		condition.where.fechaN = req.query.fechaN
	}
	if (req.query.telefono) {
		condition.where.telefono = req.query.telefono
	}
	if (req.query.email) {
		condition.where.email = req.query.email
	}
	if (req.query.sexo) {
		condition.where.sexo = req.query.sexo
	}
	if (req.query.emergencia) {
		condition.where.emergencia = req.query.emergencia
	}
	if (req.query.direccion) {
		condition.where.direccion = req.query.direccion
	}
	if (req.query.contactofamilia) {
		condition.where.contactofamilia = req.query.contactofamilia
	}
	if (req.query.nombrecontacto) {
		condition.where.nombrecontacto = req.query.nombrecontacto
	}
	if (req.query.idprofesion) {
		condition.where.idprofesion = req.query.idprofesion
	}
	if (req.query.createdAt) {
		condition.where.createdAt = req.query.createdAt
	}
	if (req.query.updatedAt) {
		condition.where.updatedAt = req.query.updatedAt
	}
	if (req.query.afiliacionId) {
		condition.where.afiliacionId = req.query.afiliacionId
	}

	
	Persona.findAll(condition)
	.then(persona => {
	   res.send(persona);
	}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};
 
// Find a persona by Id
exports.findById = (req, res) => {	
	Persona.findById(req.params.documento).then(persona => {
		res.send(persona);
	}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
}
 
// Update a persona
exports.update = (req, res) => {
	const id = req.params.documento;
	Persona.update( { 	//afiliacionId: req.body.afiliacionId,
					  	nombre:req.body.nombre,
	 				  	apellido:req.body.apellido,
	  					telefono:req.body.telefono,
	  					sexo:req.body.sexo,
						email:req.body.email,
	  					fechaN:req.body.fechaN,
	  					emergencia:req.body.emergencia,
	  					direccion:req.body.direccion,
	  					contactofamilia:req.body.contactofamilia,
	  					nombrecontacto:req.body.nombrecontacto,
	  					idprofesion:req.body.idprofesion,
	  					//idobjetivos:req.body.idobjetivos,
					  	idhorario: req.body.idhorario,
						idlogro: req.body.idlogro,
						//idinteres: req.body.idinteres,
						identerado: req.body.identerado,
					  	idaviso: req.body.idaviso
					   }, 
					 { where: {documento: req.params.documento} }
				   ).then(() => {
					 res.status(200).send("updated successfully a usuario with id = " + id);
				   }).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};
 
// Delete a Persona by Id
exports.delete = (req, res) => {
	const documento = req.body.documento;
	Persona.destroy({
	  where: { documento: documento }
	}).then(() => {
	  res.status(200).send('deleted successfully a usuario with id = ' + id);
	}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};

//me traigo con afiliacion y plan
exports.lstPerAfiPln = (req, res) => {	
	console.log(req.query);
	var condition =	{
			
	/*funciona
			include: [
				{
        		model: db.afiliacion ,	
        		},
    		],
    		order:[[{model: db.afiliacion},'id', 'DESC']],
	*/    
	//prueba 
			include: [
				{

        		model: db.afiliacion, 
        			include: [
						{
        				model: db.planes,
        			    	where: {  
        						fin: {
      							//[Op.gte]:sequelize.fn('DATE', sequelize.col('created_at')),
              					[Op.gte]:sequelize.literal('CURRENT_DATE')
    							}
    						}

        				},
        			],	
        		},
        		/*{	
        		model: db.categoria,
					include: [
						{
        				model: db.itemcategoria,
        			    },
        			],   		
        		},*/
        		
    		],
    		order:[[{model: db.afiliacion},'id', 'DESC']],
    }

	Persona.findAll(condition)
		.then(persona => {
	   		res.send(persona);
	}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};

//me traigo la persona y sus comentarios
exports.listPerComentarios = (req, res) => {	
	console.log(req.query);
	var condition =	{
		where:
			{

			},
		include: [
		 	{
        		model: db.comentarios ,	
				include: [
		   			{
        				model: db.itemcomentarios ,	
        			},
        		]	
    		},
    	]
	}
	if (req.query.documento) {
		condition.where.documento = req.query.documento
	}	
	Persona.findAll(condition)
		.then(persona => {
	   		res.send(persona);
	}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};

//me traigo la persona y sus categorias
exports.listPerCategorias = (req, res) => {	
	console.log(req.query);
	var condition =	{
		where:
			{

			},
		include: [
		   {
        		model: db.categoria ,	
				include: [
		   			{
        				model: db.itemcategoria,	
        			},
        		]	
    		},
      	]
	}
	if (req.query.documento) {
		condition.where.documento = req.query.documento
	}
	Persona.findAll(condition)
		.then(persona => {
	   		res.send(persona);
	}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};




//me traigo con afiliacion vigente y sus asistencias
exports.lstAfi1Asis = (req, res) => {	
	console.log(req.query);
	var condition =	{
		
				where:
			{

			},


			include: [
				{
        		model: db.afiliacion ,	
        			where: { estado: 1 },
        			include: [
		   				{
        					model: db.asistencia,	
        				},
        				{
        				model: db.licencia,	
        					/*where: {  
        						fin: {
      							//[Op.gte]:sequelize.fn('DATE', sequelize.col('created_at')),
              						[Op.gte]:sequelize.literal('CURRENT_DATE')
    							}
    						},*/

        					include: [
		   						{
        						model: db.motivolicencia,	
        						},
        					]	
	    				},
        			]	
	    		},
    		]
	}

	if (req.query.documento) {
		condition.where.documento = req.query.documento
	}

	Persona.findAll(condition)
		.then(persona => {
	   		res.send(persona);
	}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};

//me traigo todas las afiliacion , asistencias y si tiene licencia
exports.lstAfiAsis = (req, res) => {	
	console.log(req.query);
	var condition =	{
		

			where:
			{

			},


			include: [
				{
        		model: db.afiliacion ,	
        			include: [
		   				{
        					model: db.asistencia,	
        				},
        				{
        				model: db.licencia,	
        					include: [
		   						{
        						model: db.motivolicencia,	
        						},
        					]	
	    				},

        			]	
	    		},
	    		
    		]
	}
	if (req.query.documento) {
		condition.where.documento = req.query.documento
	}	
	Persona.findAll(condition)
		.then(persona => {
	   		res.send(persona);
	}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};

exports.lstAfiLicencia = (req, res) => {	
	console.log(req.query);
	var condition =	{
		

			where:
			{

			},


			include: [
				{
        		model: db.afiliacion ,	
        			include: [
		   				{
        				model: db.licencia,	
        					include: [
		   						{
        						model: db.motivolicencia,	
        						},
        					]	
	    				},

        			]	
	    		},
	    		
    		]
	}
	if (req.query.documento) {
		condition.where.documento = req.query.documento
	}	
	Persona.findAll(condition)
		.then(persona => {
	   		res.send(persona);
	}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};

//me traigo la persona con la afiliacion vigente, planes  vigentes y sus pagos
exports.listPagosVigentes = (req, res) => {	
	console.log(req.query);
	var condition =	{
		where:
			{

			},		
		include: [
			{
        		model: db.afiliacion ,
        	    	where: { estado: 1 },
	    			include: [
						{
        				model: db.planes,
        					model: db.planes,
        			    	where: {  
        						fin: {
      							//[Op.gte]:sequelize.fn('DATE', sequelize.col('created_at')),
              						[Op.gte]:sequelize.literal('CURRENT_DATE')
    							}
    						},


        					include: [
								{	
        						model: db.pago,
								},
								{
		        				model: db.mediopago,
		        				},
		        				{
		        				model: db.tipoplanes,
		        				},
        					]	
        				},
        				
        			]	
	    	},
    	]
	}
	if (req.query.documento) {
		condition.where.documento = req.query.documento
	}	

	Persona.findAll(condition)
		.then(persona => {
	   		res.send(persona);
	}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};

//me traigo la persona todas las afiliacion, planes y sus pagos
exports.listTodosPagos = (req, res) => {	
	console.log(req.query);
	var condition =	{
		where:
			{

			},
		include: [
			{
        		model: db.afiliacion ,
	    			include: [
						{
        				model: db.planes,
        					include: [
								{	
        						model: db.pago,
								},
								{
		        				model: db.mediopago,
		        				},
		        				{
		        				model: db.tipoplanes,
		        				},
        					]	
        				},
        				
        			]	
	    	},
    	]
	}
	if (req.query.documento) {
		condition.where.documento = req.query.documento
	}		
	Persona.findAll(condition)
		.then(persona => {
	   		res.send(persona);
	}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};


//me traigo todas las  afiliacion con, sus comentarios, planes y  pagos
exports.lstCompleta = (req, res) => {	
	console.log(req.query);
	var condition =	{
		where:
			{

			},
		include: [
			{
        	model: db.afiliacion,	
        		include: [
					{
        			model: db.asistencia,	
        			},
        			
        			{
        			model: db.planes,
        				include: [
		   					{
        					model: db.mediopago,	
        					},
        					{
        					model: db.tipoplanes,	
        					},
		   					{
        					model: db.pago,	
	        					include: [
			   						{
	        						model: db.mediopago,	
	        						},
	        					]		
        					},
        				]	
        			},
        			
        			{
        			model: db.licencia,	
        				include: [
			   				{
	        				model: db.motivolicencia,	
	        				},
        				]
        			},
        		]	
       		},
        		
       		{
       		model: db.comentarios,
       			include: [
		   			{
        			model: db.itemcomentarios,	
        			},
       			]		
       		},	
       		{
       		model: db.categoria,
       			include: [
		   			{
        			model: db.itemcategoria,	
        			},
       			]		
       		},	
        ],	
        order:[[{model: db.afiliacion},'id', 'DESC']],
	}
	
	if (req.query.documento) {
		condition.where.documento = req.query.documento
	}


    Persona.findAll(condition)
		.then(persona => {
	   		res.send(persona);
	}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};


//me traigo la persona con la afiliacion vigente planes y su ultimo pago
exports.ultimoPago = (req, res) => {	
	console.log(req.query);
	var condition =	{
		where:
			{

			},	
		include: [
			{
        	model: db.afiliacion ,
        		where: {estado: 1 },
	    		include: [
					{
        			model: db.planes,
        				where: {  
        						fin: {
	           						[Op.gte]:sequelize.literal('CURRENT_DATE')
    							}
    					},
        				include: [
							{	
        					model: db.pago,
        					where: {
        						tipomovimiento:1,
        						[Op.and]: {concepto:1},
        						[Op.and]:{pagoanulado:0}
      						}
        					
        					
							},
        				],

        			},
        		],	
	    	},
    	],
    	
    	//ordenar un nivel de include
    	//order:[[{model: db.afiliacion},'id', 'DESC']],

    	//ordenar 2 nivel de include
		//order: [[ db.afiliacion, { model: db.planes}, 'created_at', 'DESC' ]],
    	
    	//ordenar 3 nivel de include
		order: [[ db.afiliacion, db.planes, { model: db.pago}, 'id', 'DESC' ] ],
	}
	if (req.query.documento) {
		condition.where.documento = req.query.documento
	}	
		Persona.findAll(condition)
		.then(persona => {
	   		res.send(persona);
	}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};

//me traigo la persona con la afiliacion vigente planes y su ultimo pago
exports.controlIngreso = (req, res) => {	
	console.log(req.query);
	var condition =	{
		where:
			{

			},	
		include: [
			{
        	model: db.afiliacion ,
        		where: {estado: 1 },
	    		include: [
					{
        			model: db.planes,
        				include: [
							{	
        					model: db.pago,
        					where: {
        						tipomovimiento:1,
        						[Op.and]: {concepto:1},
        						[Op.and]:{pagoanulado:0}
      						}
        					},
        				],

        			},
        		],	
	    	},
    	],
    	
    	//ordenar un nivel de include
    	//order:[[{model: db.afiliacion},'id', 'DESC']],

    	//ordenar 2 nivel de include
		//order: [[ db.afiliacion, { model: db.planes}, 'id', 'DESC' ]],
    	
    	//ordenar 3 nivel de include
		//order: [[ db.afiliacion, db.planes, { model: db.pago}, 'id', 'DESC' ] ],
		order: [[ db.afiliacion, { model: db.planes}, 'id', 'DESC' ],[ db.afiliacion, db.planes, { model: db.pago}, 'id', 'DESC' ] ],
	}
	if (req.query.documento) {
		condition.where.documento = req.query.documento
	}	
		Persona.findAll(condition)
		.then(persona => {
	   		res.send(persona);
	}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};




function handleError(res, statusCode) {
  statusCode = statusCode || 500
  return function(err) {
    res.status(statusCode).send(err)
  }
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity)
    }
  }
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end()
      return null
    }
    return entity
  }
}



			////******************creo temporal*************************

		/*	const tempSQL = sequelize.dialect.QueryGenerator.selectQuery('pagos',{
		    attributes: ['mes','anio','concepto','importe'],
		    where: {
		        tipomovimiento: 2,
		        [Op.and]: {concepto:1},
		    }})
		    .slice(0,-1); // to remove the ';' from the end of the SQL
		MyTable.find( {
		    where: {
		        id: {
		             $notIn: sequelize.literal('(' + tempSQL + ')'),
		        }
		    } 
		} );*/
