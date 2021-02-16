var nodemailer      = require('nodemailer');
var path            = require('path')
var config          = require('../../config/env/development');
var EmailTemplate   = require('email-templates').EmailTemplate;
var transporter;

if (config.development) {
    transporter = nodemailer.createTransport({
        service: config.mailer.service,
        auth: {
            user: config.mailer.user,
            pass: config.mailer.pass
        }
    });
} else {
    transporter = nodemailer.createTransport({
        host: config.mailer.host,
        port: config.mailer.port,
        secure: config.mailer.secure
    });
}

exports.createUserMail = function(user, callback) {

    var templateDir = path.join(__dirname, '..','templates', 'createUser');
    var createUser = new EmailTemplate(templateDir);
    var info = {domain: config.domain, username: user.username, 
        id: user._id, token: user.validateToken};
    createUser.render(info, function (err, results) {
        if (err) return callback(err, null);
        
//        subject: 'Création de votre compte utilisateur sur LBWT.com ✔',
        var mailOptions = {
            from: config.mailer.from,
            to: user.email,
            subject: 'Test ✔',
            html: results.html,
            generateTextFromHTML: true,
            forceEmbeddedImages: true,
            attachments: [{
                filename: 'mold-glass.png',
                path: '/srv/www/lbwt/client/public/images/mold-glass.png',
                cid: 'mold@glass'
            }]
        };

        transporter.sendMail(mailOptions, (error, info) => {
            callback(error, info);
        });
    });
};

exports.retrievePasswordMail = function(user, callback) {
    
    var templateDir = path.join(__dirname, '..','templates', 'retrievePassword');
    var retrievePassword = new EmailTemplate(templateDir);
    var info = {domain: config.domain, username: user.username, 
        id: user._id, token: user.resetToken};
    retrievePassword.render(info, function (err, results) {
        if (err) return callback(err, null);

//        subject: 'Récupération de votre compte utilisateur sur LBWT.com ✔',
        var mailOptions = {
            from: config.mailer.from,
            to: user.email,
            subject: 'Test ✔',
            html: results.html,
            generateTextFromHTML: true,
            forceEmbeddedImages: true,
            attachments: [{
                filename: 'mold-glass.png',
                path: '/srv/www/lbwt/client/public/images/mold-glass.png',
                cid: 'mold@glass'
            }]
        };

        transporter.sendMail(mailOptions, (error, info) => {
            callback(error, info);
        });
    });
};