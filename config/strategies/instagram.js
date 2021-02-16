var passport            = require('passport');
var InstagramStrategy   = require('passport-instagram').Strategy;
var config              = require('../env/development');

// controller
var user                = require('../../server/controllers/user.controller');

module.exports = function () {
    passport.use(new InstagramStrategy({
        clientID: config.instagram.clientID,
        clientSecret: config.instagram.clientSecret,
        callbackURL: config.instagram.callbackURL,
        passReqToCallback: true

    }, function (req, accessToken, refreshToken, profile, done) {
        var providerData = profile._json;
        providerData.accessToken = accessToken;
        providerData.refreshToken = refreshToken;
        
        var providerUserProfile = {
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            fullName: profile.displayName,
            email: profile.emails[0].value,
            username: profile.username,
            provider: 'instagram',
            providerId: profile.id,
            providerData: providerData
        };
        
        user.saveOAuthUserProfile(req, providerUserProfile, done);
    }));
};
