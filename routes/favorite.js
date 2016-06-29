var express = require('express');
var router = express.Router();
var db = require('../db/api');
var localAuth = require('../auth/localAuth');


router.get('/', function(req, res, next) {
    res.render('favorite', {
        id: req.session.userID
    });
});

module.exports = router;
