// configurations
var config          = require('./env/development');

// dependencies
var bodyParser      = require('body-parser');
var compress        = require('compression');
var cookieParser    = require('cookie-parser');
//var cors            = require('cors');
var ejs             = require('ejs');
var express         = require('express');
var favicon         = require('serve-favicon');
var flash           = require('connect-flash');
var i18n            = require('i18n');
var logger          = require('morgan');
var passport        = require('passport');
var path            = require('path');
var redirectHttps   = require('express-redirect-https');

var sslRedirectOptions  = {
    allowForwardForHeader: true,
    httpsPort: config.sslPort
};

var session = require('express-session')({
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true }
});

// Internationalization
i18n.configure({ 
    locales: ['en','fr','de','ru','cn','jp'],
    defaultLocale: 'fr',
    directory: path.join(__dirname, 'locales')
});

module.exports = function () {

    var app = express();

    // Environments
    if (process.env.NODE_ENV === 'development') {
        app.use(logger('dev'));
        
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }
    
    // middlewares
    app.use(flash());
    app.use(session);
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
//    app.use(methodOverride());
    app.use(cookieParser());
    app.use(i18n.init);
    app.use(redirectHttps(sslRedirectOptions));
    
    // statics
    app.use(favicon(path.join(__dirname, '..', 'client', 'public', 'wine.ico')));
    app.use(express.static(path.join(__dirname, '..', 'client')));
//    app.use(express.static(path.join(__dirname, '..', 'client', 'public')));
    
    // view engine
    app.set('views', path.join(__dirname, '..', 'server', 'views'));
    app.set('view engine', 'ejs');
    app.engine('html', ejs.renderFile);
    
    // routers
    var api     = require('../server/routes/api');
    var auth    = require('../server/routes/auth');
    var admin   = require('../server/routes/admin');
    var user    = require('../server/routes/user');
//    var blob    = require('../server/routes/blob'); //TODO
    
    // rerouting
    app.use('/auth', auth);
    app.use('/api/user', user);
//    app.use('/api/blob', blob); //TODO
    app.use('/api', api);
    app.use('/admin', admin);
    app.use(function(req, res, next) {
        res.render('index');
    });
    
    // error logger & handlers
    app.use(errorLogger);
    app.use(clientErrorHandler);
    app.use(errorHandler);

    return app;
};

/*
 * Error handlers
 */
function errorLogger(err, req, res, next) {
    var errorObject = {
        error: err,
        originalUrl: req.originalUrl,
        remoteAddress: req._remoteAddress,
        startTime: req._startTime
    };
    
    if (typeof req.user !== 'undefined')
        errorObject.user = req.user;
    
    console.log(errorObject);
    return next(err);
}

function clientErrorHandler (err, req, res, next) {
    if (req.xhr) {
        res.status(500).json({ msg: 'Erreur API' });
    } else {
        return next(err);
    }
}

function errorHandler (err, req, res, next) {
    res.status(500).json({ msg: err });
//    res.redirect('/');
}
