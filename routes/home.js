var express = require('express');
var router = express.Router();
var db = require('../db/api');
var localAuth = require('../auth/localAuth');
// On home: authenticate,
router.get('/', function(req, res) {
    db.Neighborhood.getNeighborhoods()
        .then(neighborhoods => {
            db.Contributor.getContributorById(req.session.userID)
            .then(user => {
                res.render('home', {
                    id: req.session.userID,
                    neighborhood: neighborhoods
                });
            })
        })
});

// login
router.post('/login', function(req, res, next) {
    localAuth.passport.authenticate('local', (err, user, info) => {
        if (err) {
            res.render('home', {
                error: err
            });
        } else if (user) {
            req.session.userID = user.id;
            res.render('home', {
                email: user.email,
                id: user.id
            })
            res.redirect('/home');
        }
    })(req, res, next);
})

router.get('/logout', (req, res, next) => {
    req.session = null;
    res.redirect('/home');
})
router.post('/signup', localAuth.isLoggedIn, function(req, res, next) {
    db.Contributor.findContributorByEmail(req.body.email).then(user => {
        if (user) {
            res.render('home', {
                error: 'User already exists'
            });
        } else {
            localAuth.addContributor(req.body).then(user => {
                req.session.userID = user.id;
                res.redirect('/home');
            });
        }
    });
})

module.exports = router;
