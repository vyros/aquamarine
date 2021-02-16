var passport            = require('passport');
var TwitterStrategy     = require('passport-twitter').Strategy;
var config              = require('../env/development');

// controller
var user                = require('../../server/controllers/user.controller');

module.exports = function () {
    passport.use(new TwitterStrategy({
        consumerKey: config.twitter.clientID,
        consumerSecret: config.twitter.clientSecret,
        callbackURL: config.twitter.callbackURL,
        passReqToCallback: true

    }, function (req, token, tokenSecret, profile, done) {
        var providerData = profile._json;
        providerData.token = token;
        providerData.tokenSecret = tokenSecret;

        var providerUserProfile = {
            fullName: profile.displayName,
            username: profile.username,
            provider: 'twitter',
            providerId: profile.id,
            providerData: providerData
        };

        user.saveOAuthUserProfile(req, providerUserProfile, done);
    }));
};
