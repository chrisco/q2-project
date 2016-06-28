var express = require('express');
var router = express.Router();
var db = require('../db/api');
var localAuth = require('../auth/localAuth')
// On home: authenticate,
router.get('/', function(req, res, next) {
  res.render('home', );
});

// login
router.post('/login', function(req, res, next) {
  localAuth.passport.authenticate('local', (err, user, info) => {
    if (err) {
      res.render('home', {
        error: err
      });
    } else if(user) {
      req.session.userID = user.id;
      res.render('home', {
        email: user.email
      })
    }
  })(req, res,next);
})

router.post('/signup', localAuth.isLoggedIn, function(req,res,next) {
  db.Contributor.findContributorByEmail(req.body.email).then(user => {
    if (user) {
      res.render('home', {
        error:'User already exists'
      })
    } else {
      localAuth.addContributor(req.body).then(id => {
        req.session.userID = user.id;
        res.render('home', {email:user.email});
      })
    }
  }
})

module.exports = router;
