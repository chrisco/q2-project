var express = require('express');
var router = express.Router();
var db = require('../db/api');
var localAuth = require('../auth/localAuth');


router.get('/:name', function(req, res, next) {
  console.log(req.params.name);
    db.HappyHour.getInfoByHoodName(req.params.name)
    .then(list => {
      splitList=list.reduce((result,item, i) => {
          var index = Math.floor(i/4)
          result[index] = result[index] || []
          result[index].push(item)
          return result
      }, [])
        res.render('neighborhood', {
            id: req.session.userID,
            happyhours: splitList,
            neighborhood: req.params.name
        });
    })
});

module.exports = router;
