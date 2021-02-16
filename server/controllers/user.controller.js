var db          = require('../../config/mongoose');
var fs          = require('fs');
var multer      = require('multer');
var cryptojs    = require('crypto-js');
var mailer      = require('./mail.controller');
var mongoose    = require('mongoose');
var config      = require('../../config/env/development');

// models
var User        = require('mongoose').model('User');
var FakeDomain  = require('mongoose').model('FakeDomain');

// should be better in config/passport
var passport    = require('passport');
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

/*
 * CRUD
 */
exports.list = function (req, res, next) {
    User.find({}, function (err, users) {
        if (err) return next(err);
        if (users) {
            res.json(users);
        } else {
            res.json(false);
        }
    });
};

exports.create = function (req, res, next) {
    var user = new User(req.body);
    user._id = mongoose.Types.ObjectId();
    user.provider = 'local';
    user.email = user.email.toLowerCase();
    user.validateToken = cryptojs.lib.WordArray.random(12).toString(cryptojs.enc.Hex);
    
    /*/ fake :P
    simpleUser = {
        username: user.username,
        email: user.email
    };
    res.json(new User(simpleUser));
    //*/

    // no mail, token in console
    if (config.development) {
        user.save(function (err) {
            if (err) return next(err);
            console.log('Id: ' + user._id);
            console.log('Tk: ' + user.validateToken);
            simpleUser = {
                username: user.username,
                email: user.email
            };
            res.json(new User(simpleUser));
        });
    } else {
        mailer.createUserMail(user, function(err, info) {
            if (err) return next(err);
            if (info.accepted.indexOf(user.email) === -1) {
                return next({msg: "L'email n'a pu être délivré à l'adresse " + user.email});
            }
            user.emailData = info;
            user.save(function (err) {
                if (err) return next(err);
                simpleUser = {
                    username: user.username,
                    email: user.email
                };
                res.json(new User(simpleUser));
            });
        });
    }
};

exports.update = function (req, res, next) {
    var error = 'Erreur utilisateur';
    if (!req.isAuthenticated()) return next(error);
        
    var newUser = new User(req.body);
    var user = new User(req.user);

    // counter fake object
    if (newUser._id.toString() !== user._id.toString()) {
        return next(error);
    } else if (newUser.username !== user.username) {
        return next(error);
    } else if (newUser.email !== user.email) {
        return next(error);
    }
    
    // for password changing
    if(typeof newUser.password !== 'undefined') {
        newUser.password = newUser.hashPassword(newUser.password);
    }
    
    User.findByIdAndUpdate(newUser._id, newUser, function (err, oldUser) {
        if (err) return next(err); 
        if (oldUser) {
            req.login(newUser, function(err) {
                if (err) return next(err);
                res.json(returnCleanedUser(newUser));
            });
        } else {
            res.json(false);
        }
    });
};

exports.delete = function (req, res, next) {
    if (!req.isAuthenticated()) return next('Erreur utilisateur');
    
    var user = new User(req.user);
    user.remove(function (err) {
        if (err) return next(err);
        req.logout();
        res.json(true);
    });
};

exports.profile = function(req, res, next) {
    if (!req.isAuthenticated()) return next('Erreur utilisateur');
    
    var user = new User(req.user);
    var upload  = multer({dest: 'client/public/profiles'}).single('file');
    upload(req, res, function (err) {
        if (err) return next(err);
        user.photo = 'public/profiles/' + req.file.filename;
        req.login(user, function (err) {
            if (err) return next(err);
            updateAndReturnUser(res, next, user);
        });
    });
};

var returnCleanedUser = function(user) {

    // hidden for client
    if(typeof user.sumConnected !== 'undefined') {
        user.sumConnected = undefined;
    }
    if(typeof user.salt !== 'undefined') {
        user.salt = undefined;
    }
    if(typeof user.password !== 'undefined') {
        user.password = undefined;
    }
    if(typeof user.resetConfirmed !== 'undefined') {
        user.resetConfirmed = undefined;
    }
    
    return user;
};

var updateAndReturnUser = function(res, next, user) {
    User.findByIdAndUpdate(user._id, user, function (err) {
        if (err) return next(err);
        res.json(returnCleanedUser(user));
    });
};

var updateConnected = function(res, next, user) {
    
    // GMT?!
    var last = Date.now();
    var sum = user.sumConnected + 1;
    user.lastConnected = last;
    user.sumConnected = sum;
    user.validateToken = '';
    user.reset = false;
    user.resetToken = '';
    user.resetConfirmed = false;
    updateAndReturnUser(res, next, user);
};

/*
 * Check
 */
exports.isCurrentPassword = function (req, res, next) {
    var username = req.body.username;
    var regex = new RegExp(["^", username, "$"].join(""), "i");
    var password = req.body.password;
    
    User.findOne({
            username: regex
    }, function (err, user) {
        if (err) return next(err);
        if (!user) {
            return next('Compte utilisateur inconnu');
        }
        if (user.authenticate(password)) {
            res.json(true);
        } else {
            res.json(false);
        }
    });
};

exports.isUsernameExists = function (req, res, next) {
    var username = req.body.username;
    var regex = new RegExp(["^", username, "$"].join(""), "i");
    
    User.findOne({
        username: regex
    }, function (err, user) {
        if (err) return next(err);
        if (user) {
            res.json(true);
        } else {
            res.json(false);
        }
    });
};

exports.isEmailExists = function (req, res, next) {
    var email = req.body.email;
    var regex = new RegExp(["^", email, "$"].join(""), "i");
    
    User.findOne({
        email: regex
    }, function (err, user) {
        if (err) return next(err);
        if (user) {
            res.json(true);
        } else {
            res.json(false);
        }
    });
};

exports.isFakeDomain = function (req, res, next) {
    var email = req.body.email;
    var domain = email.split('@')[1];
    var regex = new RegExp(["^", domain, "$"].join(""), "i");
    
    FakeDomain.findOne({
        domain: regex
    }, function (err, domain) {
        if (err) return next(err);
        if (domain) {
            res.json(true);
        } else {
            res.json(false);
        }
    });
};

/*
 * Validate account
 */
exports.validateRedirect = function(req, res, next) {
    var id = req.params.id;
    var token = req.params.token;
    
    User.findById(id, function(err, user) {
        if (err) return next(err);
        if (!user) {
            return next("Utilisateur inconnu");
        } else if (user.validateToken !== token) {
            return next("Erreur utilisateur");
        }
        user.validated = true;
        user.validateToken = cryptojs.lib.WordArray.random(12).toString(cryptojs.enc.Hex);
        User.findByIdAndUpdate(user._id, user, function (err) {
            if (err) return next(err);
            return res.redirect('/validate/' + user._id + '/' + user.validateToken);
        });
    });
};

exports.getValidatedUser = function (req, res, next) {
    var id = req.body.id;
    var token = req.body.token;
    
    User.findOne({
        _id: id,
        validated: true,
        validateToken: token
    }, function (err, user) {
        if (err) return next(err);
        if (user) {
            simpleUser = {
                username: user.username
            };
            res.json(new User(simpleUser));
        } else {
            res.json(false);
        }
    });
};

/*
 * Reset password
 */
exports.getForgottenUser = function (req, res, next) {
    var email = req.body.email;
    var regex = new RegExp(["^", email, "$"].join(""), "i");

    User.findOne({
        email: regex
    }, function (err, user) {
        if (err) return next(err);
        if (user) {
            simpleUser = {
                provider: user.provider,
                activated: user.activated,
                validated: user.validated,
                reset: user.reset
            };
            res.json(new User(simpleUser));
        } else {
            res.json(false);
        }
    });
};

exports.setEmailRetriever = function (req, res, next) {
    var email = req.body.email;
    var regex = new RegExp(["^", email, "$"].join(""), "i");
    
    User.findOne({
        email: regex
    }, function (err, user) {
        if (err) return next(err);
        if (user) {
            user.reset = true;
            user.resetToken = cryptojs.lib.WordArray.random(12).toString(cryptojs.enc.Hex);
            
            // no mail, token in console
            if (config.development) {
                User.findByIdAndUpdate(user._id, user, function (err) {
                    if (err) return next(err);
                    console.log('Id: ' + user._id);
                    console.log('Tk: ' + user.resetToken);
                    res.json(true);
                });
            } else {
                mailer.retrievePasswordMail(user, function(err, info) {
                    if (err) return next(err);
                    if (info.accepted.indexOf(user.email) === -1) {
                        return next("L'email n'a pu être délivré à l'adresse " + user.email);
                    }
                    User.findByIdAndUpdate(user._id, user, function (err) {
                        if (err) return next(err);
                        res.json(true);
                    });
                });
            }
        } else {
            return next('Email incorrect');
        }
    });
};

exports.resetRedirect = function(req, res, next) {
    var id = req.params.id;
    var token = req.params.token;

    User.findById(id, function(err, user) {
        if (err) return next(err);
        if (!user) {
            return next("Utilisateur inconnu");
        } else if (user.resetToken !== token) {
            return next("Erreur utilisateur");
        }
        user.reset = false;
        user.resetConfirmed = true;
        user.resetToken = cryptojs.lib.WordArray.random(12).toString(cryptojs.enc.Hex);
        User.findByIdAndUpdate(user._id, user, function (err) {
            if (err) return next(err);
            return res.redirect('/reset/' + user._id + '/' + user.resetToken);
        });
    });
};

exports.getResetUser = function (req, res, next) {
    var id = req.body.id;
    var token = req.body.token;
    
    User.findOne({
        _id: id,
        resetConfirmed: true,
        resetToken: token
    }, function (err, user) {
        if (err) return next(err);
        if (user) {
            simpleUser = {
                _id: user._id,
                username: user.username,
                resetToken: user.resetToken
            };
            res.json(new User(simpleUser));
        } else {
            return next("Erreur utilisateur");
        }
    });
};

exports.setReset = function(req, res, next) {
    var simpleUser = new User(req.body);
    
    User.findOne({
        _id: simpleUser._id,
        resetConfirmed: true,
        resetToken: simpleUser.resetToken
    }, function (err, user) {
        if (err) return next(err);
        if (user) {
            user.password = user.hashPassword(simpleUser.password);
            User.findByIdAndUpdate(user._id, user, function (err) {
                if (err) return next(err);
                if (user) {
                    req.login(user, function(err) {
                        if (err) return next(err);
                        updateConnected(res, next, user);
                    });
                } else {
                    return next("Erreur utilisateur");
                }
            });
        } else {
            return next("Erreur utilisateur");
        }
    });
};

/*
 * Passport
 */
/*
var getErrorMessage = function (err) {
    var message = '';
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message)
                message = err.errors[errName].message;
        }
    }
    return message;
};
*/

exports.signin = function(req, res, next) {
    var username = req.body.username;
    var regex = new RegExp(["^", username, "$"].join(""), "i");
    var password = req.body.password;
    
    User.findOne({
            username: regex
    }, function (err, user) {
        if (err) return next(err);
        if (!user) {
            return next('Compte utilisateur inconnu');
        } else if (typeof user.password === 'undefined') {
            return next('Connectez-vous avec ' + user.provider);
        } else if (!user.authenticate(password)) {
            return next('Mot de passe incorrect');
        }
        req.login(user, function (err) {
            if (err) return next(err);
            updateConnected(res, next, user);
        });
    });
};

exports.signup = function (req, res, next) {
    if (!req.user) {
        var user = new User(req.body);
        user.provider = 'local';
        user.save(function (err) {
            if (err) return next(err);
            req.login(user, function (err) {
                if (err) return next(err);
                return res.redirect('/');
            });
        });
    }
    return res.redirect('/');
};

exports.signout = function (req, res) {
    req.logout();
    res.json(true);
};

var getPossibleUsername = function (username, email) {
    if (typeof username !== 'undefined' && username.length) {
        return username;
    }
    return email.toLowerCase().split('@')[0];
};

exports.saveOAuthUserProfile = function (req, profile, done) {
    User.findOne({
        provider: profile.provider,
        providerId: profile.providerId
        
    }, function (err, user) {
        if (err) return done(err);
        if (!user) {
            var possibleUsername = getPossibleUsername(profile.username, profile.email);
            User.findUniqueUsername(possibleUsername, null, function (availableUsername) {
                profile.username = availableUsername;
                user = new User(profile);
                user.validated = true;
                user.save(function (err) {
                    if (err) return next(err);
                    return done(err, user);
                });
            });
        }
        return done(err, user);
    });
};
