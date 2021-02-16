var passport            = require('passport');
var LinkedinStrategy    = require('passport-linkedin-oauth2').Strategy;
var config              = require('../env/development');

// controller
var user                = require('../../server/controllers/user.controller');

module.exports = function () {
    passport.use(new LinkedinStrategy({
        clientID: config.linkedin.clientID,
        clientSecret: config.linkedin.clientSecret,
        callbackURL: config.linkedin.callbackURL,
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
            provider: 'linkedin',
            providerId: profile.id,
            providerData: providerData
        };
        
        user.saveOAuthUserProfile(req, providerUserProfile, done);
    }));
};
