var passport            = require('passport');
var FacebookStrategy    = require('passport-facebook').Strategy;
var config              = require('../env/development');

// controller
var user                = require('../../server/controllers/user.controller');

module.exports = function () {
    passport.use(new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL,
        profileFields: config.facebook.profileFields,
        passReqToCallback: true

    }, function (req, accessToken, refreshToken, profile, done) {
        var providerData = profile._json;
        providerData.accessToken = accessToken;
        providerData.refreshToken = refreshToken;

        var username = profile.username;
        var email = profile.emails[0].value;
        var providerUserProfile = {
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            fullName: profile.displayName,
            email: email,
            photo: profile.photos[0].value,
            username: user.getPossibleUsername(username, email),
            provider: 'facebook',
            providerId: profile.id,
            providerData: providerData
        };

        user.saveOAuthUserProfile(req, providerUserProfile, done);
    }));
};
