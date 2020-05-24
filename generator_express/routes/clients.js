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
let putClient = clientRepo.putClient;




/* Get ALL clients */
router.get('/', function(req, res, next) {
    res.send('get client');
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
router.post('/', function(req, res, next) {
    try{
        saveClient(`${req.body.idClient}`, req.body)
        res.send(msgResponse.buildResponse(200, 'Ok', req.body));
    }catch(error){
        next(error);
    }
});

/* Update a client*/
/* data "param2=value223"  */
router.put('/:idClient', function(req, res, next) {
    res.send('respond with a resource');
});


router.delete('/:idClient', function(req,res,next){
    
});
    
router.get('/:idClient/contracts', async function(req,res,next){
    try{
        let contractsList = await getContracts(req.params.idClient);
		if(!contractsList.length) {
			res.send( msgResponse.buildResponse(400, 'Error', { list: contractsList }));
		}else{
			res.send( msgResponse.buildResponse(200, 'Ok', { list: contractsList }));
        }
    }catch(error){
        next(error)
    }
});


module.exports = router;
