const express = require('express');
const router = express.Router();
const {ErrorHandler} = require('../helpers/errorHandler')
const msgResponse = require('../helpers/reponseHandler')
const campaignServiceRoute = require('../service/campaign_service');
const gameService = require('../service/game_service');

/* Init game */
router.post('/new', async function(req, res, next) {
    try {
        let result = await campaignServiceRoute.initCampaign(req.body)
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
        let result = await campaignServiceRoute.joinCampaign(req.params.hash,req.body)
        if(!result) {
            res.status = 400
			res.send( msgResponse.buildResponse(400, 'Error', result))
		}else{
			res.send( msgResponse.buildResponse(200, 'Ok', result))
        }
        next()
    } catch (error) {
        next(error)
    }
});

/*Save move */
router.post('/:hash/position/:cell', async function(req, res, next){
    try {
        console.log(req.params.hash,req.params.cell,req.body);
        
        let result = await gameService.saveMove(req.params.hash,req.params.cell,req.body)
        if(!result) {
			res.send( msgResponse.buildResponse(400, 'Error', result))
		}else{
			res.send( msgResponse.buildResponse(200, 'Ok', result))
        }
        
    } catch (error) {
        next(error)
    }
});

// Get campaign status
router.get('/:hash/status', async function(req, res, next) {
    try {
        let result = await campaignServiceRoute.getCampaignStatus(req.params.hash)        
        if(!result){
            res.send( msgResponse.buildResponse(400, 'Error', result))
        }else{
            res.send( msgResponse.buildResponse(200, 'Ok', result))
        }
    } catch (error) {
        next(error);
    }
})

router.get('/:hash/history-board', function(req, res, next) {
    res.send(req.params.hash);
})

module.exports = router;
