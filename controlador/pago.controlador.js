const db = require('../cfg/db.js');
const Pago = db.pago;
const Plan = db.planes;

 
// Post a pago
exports.create = (req, res) => {	
  	console.log('json: ', req.body);
	Pago.sequelize.query('INSERT into pagos (id,importe,mes,anio,tipomovimiento,concepto,pagoanulado,createdAt,updatedAt,mediopagoId,planId) VALUES (DEFAULT,:pImporte,:pMes,:pAnio,:pTipomovimiento,:pConcepto,:pPagoanulado, NOW(), NOW(),:pMediopagoId,:pPlanId)',
    { replacements: {pPlanId: req.body.planId,pImporte:req.body.importe,pMes:req.body.mes,pAnio:req.body.anio,pTipomovimiento:req.body.tipomovimiento,pConcepto:req.body.concepto,pMediopagoId:req.body.mediopagoId,pPagoanulado:req.body.pagoanulado}, 
       	type: Pago.sequelize.QueryTypes.INSERT
    }).then(pago => {
				// Send all usuarios to Client 
				console.log(pago);
		  	res.send(pago);
		}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};

// FETCH all pagos
exports.findAll = (req, res) => {
	var condition =
	{
		where:
			{

			}
	}
	
	if (req.query.planesId) {
		condition.where.planesId = req.query.planesId
	}
	if (req.query.importe) {
			condition.where.importe = req.query.importe
	}
	if (req.query.anio) {
			condition.where.anio = req.query.anio
	}
	if (req.query.mes) {
			condition.where.mes = req.query.mes
	}
	if (req.query.tipomovimiento) {
			condition.where.tipomovimiento = req.query.tipomovimiento
	}
	if (req.query.concepto) {
			condition.where.concepto = req.query.concepto
	}		
	if (req.query.createdAt) {
		condition.where.createdAt = req.query.createdAt
	}
	if (req.query.updatedAt) {
		condition.where.updatedAt = req.query.updatedAt
	}
	if (req.query.planId) {
		condition.where.planId = req.query.planId
	}
	
	if (req.query.mediopagoId) {
		condition.where.mediopagoId = req.query.mediopagoId
	}
	if (req.query.pagoanulado) {
		condition.where.pagoanulado = req.query.pagoanulado
	}
	
	
	Pago.findAll(condition).then(pago => {
	  // Send all pagos to Client
	  if(pago.length>0){
	  	pago.reverse();
	  }
	  res.send(pago);
	}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};

// Find a pago by Id
exports.findById = (req, res) => {	
	Pago.findById(req.params.id).then(pago => {
		res.send(pago);
	}).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};
 
// Update a pago
exports.update = (req, res) => {
	const idPago = req.body.id;
	const idPlan=req.body.planId;
	var bandera=false;
	if(req.body.bandera){
		bandera=true;
	}

		buscoUltimoPago()
		.then(function(response){
			return updPago(response,idPago)
			})
			.then(function(response){
				return buscoElPago(idPago)
			})
			.then(function(response){ 
				return buscoPLan(response,idPlan,bandera)
			})
			.then(function(response){ 
				return updPLan(idPlan,response)
			})
			.then(function(response){ 
				return buscoElPago(idPago)
			})
			.then(function(response){ 
				return insPago(response)
			})
			res.status(200).send("termine las promesas")
};




// inserto  pago y actualizo plan
exports.insPagoUpdPlan = (req, res) => {
	const idPlan=req.body.planId;
	var pago=new Object();			
	//pago.id= req.body.id;
	pago.importe= req.body.importe;
	pago.mes= req.body.mes;
	pago.anio= req.body.anio;
	pago.tipomovimiento= req.body.tipomovimiento;
	pago.concepto= req.body.concepto;
	pago.pagoanulado= req.body.pagoanulado;
	pago.planId= req.body.planId;
	pago.createdAt= req.body.createdAt;
	pago.updatedAt= req.body.updatedAt;
	pago.mediopagoId= req.body.mediopagoId;
	
	//console.log(req.body.flag);
	var bandera=false;
	if(req.body.flag==1){
		bandera=true;
		//console.log("bandera es + " + bandera);

	}
	

	buscoPLan(pago,idPlan,bandera)
		.then(function(response){
			return updPLan(idPlan,response)
			})
			.then(function(response){ 
				return insPago(pago,response)
			})
			.then(function(response){
			res.status(200).send()//send("termine las promesas")
		});
};


	//busco el ultimo id de pago y  le id del ultimo pago y sumo 1
	var buscoUltimoPago=function(){
		return new Promise(function(resolve,reject){
			var condition =	{
				limit:1,
				order:[['id', 'DESC']],
			};
			Pago.findAll(condition)
			.then(function(response){
			//	console.log(response[0].id);
				var UltimoIdPg=response[0].id +1;
				return resolve(UltimoIdPg);	
			}).catch(function(e){
				reject("Fallo al buscar ultimo Pago")
			});
		});
	}
	//busco el pago que anulo
	var buscoElPago=function(idPago){
		return new Promise(function(resolve,reject){
			var condition =	{
				where: {id: idPago}, 
			};
			var resultado=null;
			Pago.findAll(condition)
			.then(function(response){
				//console.log(response[0].dataValues);
				return resolve(response[0].dataValues);	
			}).catch(function(e){
				reject("Fallo al buscar el Pago")
			});
		});
	}	
	// busco el plan al cual voy a anularle un pago
	var buscoPLan= function (elPago,idPlan,bandera){
		return new Promise(function(resolve,reject){
			Plan.findById(idPlan).then(function(response){
				var elPlan= response.dataValues;
				var importeFinal= 0;
				var cuotaFinal=0;
				var noHagoNada=1;
				if(bandera){
					console.log("aca estoy en if  ");
					importeFinal= (elPlan.importepago + elPago.importe);
					cuotaFinal=( elPlan.cuotasvan  + 1);
				}else{
					console.log("aca estoy en else  ");
					var importeQueAnulo=elPago.importe;
					var importeFinal=elPlan.importepago-importeQueAnulo;
					cuotaFinal=(elPlan.cuotasvan - 1);
				}
				if(importeFinal>elPlan.importeplan ||cuotaFinal > elPlan.cuotasson){
					noHagoNada=0;
				}
				//console.log(importeQueAnulo+" << importe que anulo "+importeFinal+" <<importe final");
				var datoslst=[importeFinal,cuotaFinal,noHagoNada];
				return resolve(datoslst);	
			}).catch(function(e){
				reject("Fallo al buscar el Plan");
			});
		});
	}
	// actualizo el  plan al cual voy a anularle un pago
	var updPLan=function(idPlan,elPLan){	
		return new Promise(function(resolve,reject){
			console.log(" aca entro al upd");
			//console.log(elPLan[0]); 	console.log(elPLan[1]);
			var noInsertes=false;
			if(elPLan[2] ==1){
				noInsertes=true;
				Plan.update({ importepago: elPLan[0],cuotasvan: elPLan[1]},
					{where: {id:idPlan}}
					).then(() => {
						resolve(true);
					}).catch(function(e){
						reject("Fallo al upd  plan")
					});
			}	
			return resolve(noInsertes);
		});
	}	
	// actualizo el pago que anulo
	var updPago=function(resultados,idPago){	
		return new Promise(function(resolve,reject){
			Pago.update({ pagoanulado:resultados},
				{where: {id:idPago}}
					)
					.then(() => {
					resolve(true);
					}).catch(function(e){
						reject("Fallo al upd  Pago")
					});
		});
	}	
	// inserto anulacion
	var insPago=function(elPago,resultado){	
		return new Promise(function(resolve,reject){
			var respuetsa=false;
			if(resultado){
			//console.log(elPago);
				Pago.sequelize.query('INSERT into pagos (id,importe,mes,anio,tipomovimiento,concepto,pagoanulado,createdAt,updatedAt,mediopagoId,planId) VALUES (DEFAULT,:pImporte,:pMes,:pAnio,:pTipomovimiento,:pConcepto,:pPagoanulado, NOW(), NOW(),:pMediopagoId,:pPlanId)',
		    	{ replacements: {pPlanId: elPago.id,pImporte:elPago.importe,pMes:elPago.mes,pAnio:elPago.anio,pTipomovimiento:2,pConcepto:elPago.concepto,pMediopagoId:elPago.mediopagoId,pPagoanulado:0,pPlanId:elPago.planId }, 
		       	type: Pago.sequelize.QueryTypes.INSERT
		    	}).then(pago => {
						console.log("pago exitoso ins");
						console.log(pago);
						respuetsa=true;
						resolve(true);
					}).catch(function(e){
						reject("Fallo al ins  Pago")
					});
			}	
			return resolve(respuetsa);
		});
}

 




// Delete a pago by Id
exports.delete = (req, res) => {
	const id = req.params.id;
	Pago.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('deleted successfully a de la pago de pago');
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