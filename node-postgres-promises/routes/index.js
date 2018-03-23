var express = require('express');
var router = express.Router();


var db = require('../queries.js');

router.get('/api/cryptocurrency', function() {
    console.log("here")
    db.getAllCurrencies();
});
router.get('/api/cryptocurrency/:id', db.getSingleCurrency);
//router.post('/api/cryptocurrency', db.createPuppy);
//router.put('/api/cryptocurrency/:id', db.updatePuppy);
//router.delete('/api/cryptocurrency/:id', db.removePuppy);

//  GET home page. 
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});


module.exports = router;
