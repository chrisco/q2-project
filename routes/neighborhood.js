var express = require('express');
var router = express.Router();
var db = require('../db/api');
var localAuth = require('../auth/localAuth');


router.get('/:name', function(req, res, next) {
    db.HappyHour.getInfoByHoodName(req.params.name).then(list => {
        res.render('neighborhood', {
            id: req.session.userID,
            happyhours: list
        });
    })
});

module.exports = router;
