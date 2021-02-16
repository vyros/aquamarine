var passport = require('passport');
var mongoose = require('mongoose');

module.exports = function () {
    var User = mongoose.model('User');

//    passport.serializeUser(function (user, done) {
//        done(null, user.id);
//    });
//
//    passport.deserializeUser(function (id, done) {
//        User.findOne({
//            _id: id
//        }, '-password -salt', function (err, user) {
//            done(err, user);
//        });
//    });

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

//    require('./strategies/local.js')();
    require('./strategies/facebook.js')();
    require('./strategies/twitter.js')();
    require('./strategies/google.js')();
    require('./strategies/instagram.js')();
    require('./strategies/linkedin.js')();
};
