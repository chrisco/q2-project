var express = require('express');
var router = express.Router();
var db = require('../db/api');
var localAuth = require('../auth/localAuth');


router.get('/:name', function(req, res, next) {
    db.HappyHour.getInfoByHoodName(req.params.name).then(list => {
        res.render('neighborhood', {
            api: process.env.GOOGLE_API_KEY,
            id: req.session.userID,
            happyhours: list,
            neighborhood: req.params.name
        });
    })
});

router.get('/get/locations', function(req, res, next) {
    db.Location.getLocations().then(locations => {
        res.json(locations);
    });
});

module.exports = router;
