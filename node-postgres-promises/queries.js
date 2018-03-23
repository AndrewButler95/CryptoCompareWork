var promise = require('bluebird');

var options = {
    // Initialization Options
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/cryptocurrencies';
var db = pgp(connectionString);

// add query functions

module.exports = {
    getAllCurrencies: getAllCurrencies,
    getSingleCurrency: getSingleCurrency,
    // createPuppy: createPuppy,
    //updatePuppy: updatePuppy,
    //removePuppy: removePuppy
};

function getAllCurrencies(req, res, next) {
    db.any('select * from cryptocurrency')
        .then(function(data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL cryptocurrency'
                });
        })
        .catch(function(err) {
            return next(err);
        });
}

function getSingleCurrency(req, res, next) {
    var curID = parseInt(req.params.id);
    db.one('select * from cryptocurrency where id = $1', curID)
        .then(function(data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved one currency'
                });
        })
        .catch(function(err) {
            return next(err);
        });
}
