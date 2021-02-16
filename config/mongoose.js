var config      = require('./env/development');
var mongoose    = require('mongoose');

module.exports = (function () {
    var db = mongoose.connect(config.db, 
        { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex:true 
        }, function () {
        console.log('Mongodb (config) connected...');
    });
    
    // models
    require('../server/models/blob.model');
    require('../server/models/user.model');
    require('../server/models/fake-domain.model');
    
    return db;
})();
