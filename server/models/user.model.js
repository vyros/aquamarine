var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var cryptojs    = require('crypto-js');

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    provider: String,
    providerId: String,
    providerData: Object,
    email: {
        type: String,
        index: true,
        required: true,
        match: /.+\@.+\..+/
    },
    emailData: Object,
    photo: {
        type: String
    },
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    password: {
        type: String
    },
    salt: {
        type: String
    },
    reset: {
        type: Boolean,
        Default: false
    },
    resetConfirmed: {
        type: Boolean,
        Default: false
    },
    resetToken: {
        type: String
    },
    displayedAs: {
        type: String,
        enum: ['fullName', 'username'],
        default: 'fullName'
    },
    role: {
        type: String,
        enum: ['Admin', 'Owner', 'User']
    },
    created: {
        type: Date,
        default: Date.now
    },
    // email validated
    validated: {
        type: Boolean,
        default: false
    },
    validateToken: {
        type: String
    },
    // account activated
    activated: {
        type: Boolean,
        default: true
    },
    lastConnected: {
        type: Date,
        default: Date.now
    },
    sumConnected: {
        type: Number,
        default: 0
    },
    website: {
        type: String,
        get: function (url) {
            if (!url) {
                return url;

            } else {
                if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
                    url = 'http://' + url;
                }
                return url;
            }
        },
        set: function (url) {
            if (!url) {
                return url;

            } else {
                if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
                    url = 'http://' + url;
                }
                return url;
            }
        }
    }
});

UserSchema.virtual('fullName')
.get(function () {
    if (typeof this.firstName !== 'undefined' && typeof this.lastName !== 'undefined') {
        return this.firstName + ' ' + this.lastName;
    } else if (typeof this.firstName !== 'undefined') {
        return this.firstName;
    } else {
        return this.username;
    }
})
.set(function (fullName) {
    var splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
});

UserSchema.virtual('displayedName')
.get(function() {
    if (this.displayedAs === 'fullName')
        return this.fullName;

    if (this.displayedAs === 'username')
        return this.username;
});

UserSchema.statics.findOneByUsername = function (username, callback) {
    this.findOne({username: new RegExp(username, 'i')}, callback);
};

UserSchema.methods.hashPassword = function (password) {
    if(!this.salt) {
        this.salt = cryptojs.lib.WordArray.random(256/8).toString(cryptojs.enc.Base64);
    }
    
    return cryptojs.HmacSHA256(password, this.salt).toString(cryptojs.enc.Base64);
};

UserSchema.pre('save', function (next) {
    if (this.password) {
//        this.salt = cryptojs.lib.WordArray.random(256/8).toString(cryptojs.enc.Base64);
        this.password = this.hashPassword(this.password);
    }
    next();
});

UserSchema.methods.authenticate = function (password) {
    var hash = this.hashPassword(password);
    return this.password === hash;
};

UserSchema.statics.findUniqueUsername = function (username, suffix, callback) {
    var _this = this;
    var possibleUsername = username + (suffix || '');
    var regex = new RegExp(["^", possibleUsername, "$"].join(""), "i");

    _this.findOne({
        username: regex
    }, function (err, user) {
        if (!err) {
            if (!user) {
                callback(possibleUsername);
            } else {
                return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
            }
        } else {
            callback(null);
        }
    });
};

UserSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

mongoose.model('User', UserSchema);