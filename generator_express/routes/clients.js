let express = require('express');
let router = express.Router();
let {ErrorHandler} = require('../helpers/errorHandler')
let msgResponse = require('../helpers/reponseHandler')

let clientRepo = require('../repository/repoClients');
let getClient = clientRepo.getClient;
let saveClient = clientRepo.saveClient;
let getClients = clientRepo.getClients;
let getContracts = clientRepo.getContracts;
let deleteClient = clientRepo.deleteClient;
let updateClient = clientRepo.updateClient;
let getClientContracts = clientRepo.getClientContracts
let getContract = clientRepo.getContract;
let saveContract = clientRepo.saveContract


/* Get ALL clients */
router.get('/', async function(req, res, next) {
    try {
        let result = await getClients()
        if(!result) {
			res.send( msgResponse.buildResponse(400, 'Error', result))
		}else{
			res.send( msgResponse.buildResponse(200, 'Ok', result))
		}
    } catch (error) {
        next(error)
    }
});

/* Get a client */
router.get('/:idClient', async function(req, res, next) {
    try {
        let result = await getClient(req.params.idClient)
        if(!result) {
			res.send( msgResponse.buildResponse(400, 'Error', result))
		}else{
			res.send( msgResponse.buildResponse(200, 'Ok', result))
		}
        next()
    } catch (error) {
        next(error);
    }
    
});

/* Save new Client */
/*"param1=value1&param2=value2"*/
router.post('/', async function(req, res, next) {
    /* if(!req.body || !req.body.name || !req.body.lastname || !req.body.idClient){
        msgResponse.buildResponse(400, 'Error', "Save not success")
    } */
    console.log("Body", req.body)
    try{
        let result = await saveClient(req.body)
        if(!result){
            res.send( msgResponse.buildResponse(400, 'Error', "Save not success"));
        }else{
            res.send( msgResponse.buildResponse(200, 'Ok', "Success"));
        }
        next()
    }catch(error){ 
        console.log("Error consola", error)
        next(error);
    }
});

/* Update a client*/
/* data "param2=value223"  */
router.put('/:idClient', async function(req, res, next) {


    try{
        let result = await updateClient(req.body.idClient, req.body)
        if(!result){
            res.send( msgResponse.buildResponse(400, 'Error', "Save not success"));
        }else{
            res.send( msgResponse.buildResponse(200, 'Ok', "Success"));
        }
    }catch(error){
        next(error);
    }
});


router.delete('/:idClient', async function(req,res,next){
    try {
        let result = deleteClient(req.params.idClient)
        if(!result){
            res.send( msgResponse.buildResponse(400, 'Error', "Not success"));
        }else{
            res.send( msgResponse.buildResponse(200, 'Ok', "contractsList"));
        }
    } catch (error) {
        next(error)
    }
});
    
router.get('/:idClient/contracts', async function(req,res,next){
    try{
        let contractsList = await getClientContracts(req.params.idClient);

		if(!contractsList) {
			res.send( msgResponse.buildResponse(400, 'Error', contractsList));
		}else{
			res.send( msgResponse.buildResponse(200, 'Ok', contractsList));
        }
    }catch(error){
        next(error)
    }
});

router.get('/:idClient/contracts/:idContract', async function(req,res,next){
    try {
        let clientContractList = await getContract(req.params.idClient, req.params.idContract)
        if(!clientContractList) {
			res.send( msgResponse.buildResponse(400, 'Error', clientContractList));
		}else{
			res.send( msgResponse.buildResponse(200, 'Ok', clientContractList));
        }
    } catch (error) {
        next(error)
    }
});

router.post('/:idClient/contracts', async function(req, res, next){
    try {
        let result = await saveContract(req.params.idClient, req.body)
        if (!result){
            res.send( msgResponse.buildResponse(400, 'Error', "Not save"));
        }else{
            res.send( msgResponse.buildResponse(200, 'Ok', "Save"));
        }
    } catch (error) {
        next(error)
    }
});

/* GET all Contracts. */
router.get('/contracts', async function(req, res, next) {

    try {
        let contracts = await getContracts()
        if(!contracts){
            res.send( msgResponse.buildResponse(400, 'Error', contracts))
        }else{
            res.send( msgResponse.buildResponse(200, 'Ok', contracts));
        }
    } catch (error) {
        next(error)
    }


});


module.exports = router;
