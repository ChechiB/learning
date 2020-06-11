let express = require('express');
let router = express.Router();
let {ErrorHandler} = require('../helpers/errorHandler')
let msgResponse = require('../helpers/reponseHandler')

/* Init game */
router.post('/', async function(req, res, next) {
    try {
        let result = await initGame(req.body)
        if(!result) {
		}else{
		}
    } catch (error) {
        next(error)
    }
});
