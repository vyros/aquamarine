var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var FakeDomainSchema = new Schema({
    domain: String
});

mongoose.model('FakeDomain', FakeDomainSchema);