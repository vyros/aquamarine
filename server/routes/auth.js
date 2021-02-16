var passport    = require('passport');
var router      = require('express').Router();

// controllers
var user        = require('../controllers/user.controller');

// config
var config      = require('../../config/env/development');

// strategies
//require('../../config/strategies/local.js')();
require('../../config/strategies/facebook.js')();
require('../../config/strategies/twitter.js')();
require('../../config/strategies/google.js')();
require('../../config/strategies/instagram.js')();
require('../../config/strategies/linkedin.js')();

/*
 * For AngularJS
 */
router.get('/user', isLoggedIn, function(req, res) {
    res.json(req.user);
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.json(false);
    }
};

/*
 * Local
 */
router.post('/signup', user.signup);
router.get('/validate/:id/:token', user.validateRedirect);
router.post('/signin', user.signin);
router.get('/reset/:id/:token', user.resetRedirect);
router.use('/signout', user.signout);
router.post('/password', user.isCurrentPassword);

/*
 * Facebook
 */
router.get('/facebook', passport.authenticate('facebook', {
    failureRedirect: '/signin',
    scope: ['email']
}));
router.get('/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/signin',
    successRedirect: '/'
}));
    
/*
 * Twitter
 */
router.get('/twitter', passport.authenticate('twitter', {
    failureRedirect: '/signin'
}));

router.get('/twitter/callback', passport.authenticate('twitter', {
    failureRedirect: '/signin',
    successRedirect: '/'
}));

/*
 * Google
 */
router.get('/google', passport.authenticate('google', {
    failureRedirect: '/signin',
    scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
    ]
}));

router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/signin',
    successRedirect: '/'
}));

/*
 * Instagram
 */
router.get('/instagram', passport.authenticate('instagram', {
    failureRedirect: '/signin'
}));

router.get('/instagram/callback', passport.authenticate('instagram', {
    failureRedirect: '/signin',
    successRedirect: '/'
}));

/*
 * Linkedin
 */
router.get('/linkedin', passport.authenticate('linkedin', {
    failureRedirect: '/signin'
}));

router.get('/linkedin/callback', passport.authenticate('linkedin', {
    failureRedirect: '/signin',
    successRedirect: '/'
}));

module.exports = router;