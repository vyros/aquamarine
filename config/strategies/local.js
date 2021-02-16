var passport        = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var User            = require('mongoose').model('User');

module.exports = function () {
    passport.use(new LocalStrategy(function (username, password, done) {
        User.findOne({
//            email: email
            username: username
            
        }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: 'Compte utilisateur inconnu'
                });
            }
            if (!user.authenticate(password)) {
                return done(null, false, {
                    message: 'Mot de passe incorrect'
                });
            }
            return done(null, user);
        });
    }));
};
