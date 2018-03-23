var express = require('express');
var router = express.Router();

var db = require('./queries.js');


router.get('/api/cryptocurrency', function() {
    console.log("i am here");
    db.getAllCurrencies();
});
router.get('/api/cryptocurrency/:id', db.getSingleCurrency);
//router.post('/api/cryptocurrency', db.createPuppy);
//router.put('/api/cryptocurrency/:id', db.updatePuppy);
//router.delete('/api/cryptocurrency/:id', db.removePuppy);


module.exports = router;
