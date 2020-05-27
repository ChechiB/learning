var express = require('express');
var router = express.Router();




/* Get a Contract */
router.get('/:idContract', function(req, res, next) {
    res.send('respond with a resource');
});

/* Save new Contract */
router.post('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* Update a Contract*/
router.put('/:idContract', function(req, res, next) {
    res.send('respond with a resource');
});

router.delete('/:idContract', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
