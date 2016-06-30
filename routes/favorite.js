var express = require('express');
var router = express.Router();
var db = require('../db/api');
var localAuth = require('../auth/localAuth');


router.get('/', function(req, res, next) {
    res.render('favorite', {
        id: req.session.userID
    });
});

router.get('/getId', function(req, res, next) {
    res.json(req.session.userID)
})

router.post('/', function(req, res, next){
    console.log(req.body);
    
})

module.exports = router;
