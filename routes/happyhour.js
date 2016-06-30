var express = require('express');
var router = express.Router();
var db = require('../db/api');
require('dotenv').config();

router.get('/', function(req, res, next) {
    res.render('happyhour', {
        api: process.env.GOOGLE_API_KEY
    });
});

router.get('/getLocations', function(req, res, next) {
    db.Location.getLocations().then(locations => {
        console.log(locations, 'HELLLO &&&&&&&&&');
        res.send(locations);
    });
});

module.exports = router;
