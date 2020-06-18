let express = require('express');
let router = express.Router();
let {ErrorHandler} = require('../helpers/errorHandler')
let msgResponse = require('../helpers/reponseHandler')
let campaignService = require('../service/campaign_service');

/* Init game */
router.post('/new', async function(req, res, next) {
    try {
        let result = await campaignService.initCampaign(req.body)
        if(!result) {
			res.send( msgResponse.buildResponse(400, 'Error', result))
		}else{
			res.send( msgResponse.buildResponse(200, 'Ok', result))
        }
        next()
    } catch (error) {
        next(error)
    }
});

/*Join to the game*/
router.post('/:hash/join', async function(req, res, next){
    try {
        let result = await campaignService.joinCampaign(req.params.hash,req.body)
        if(!result) {
			res.send( msgResponse.buildResponse(400, 'Error', result))
		}else{
			res.send( msgResponse.buildResponse(200, 'Ok', result))
        }
        next()
    } catch (error) {
        next(error)
    }
});


module.exports = router;
