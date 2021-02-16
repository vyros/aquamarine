var express     = require('express');
var router      = express.Router();
var mongojs     = require('mongojs');
var db          = mongojs('mongodb://localhost/lbwtdb');

// DANGER, still mongojs used in API, TODO mongoose like /auth)

// logging connection
db.on('connect', function () {
    console.log('Mongodb connected...');
});

// db and models
//var db          = require('../config/mongoose');
//var blob        = require('../models/blobs.model');

/*
 * Blobs collection
 */

// get all
router.get('/blob', function(req, res, next) {
    db.blobs.find(function(err, blobs) {
        if (err) {
            res.send(err);
        }
        res.json(blobs);
    });
});

// get one
router.get('/blob/:id', function(req, res, next) {
    db.blobs.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, blob) {
        if (err) {
            res.send(err);
        }
        res.json(blob);
    });
});

// save one
router.post('/blob', function(req, res, next) {
    var blob = req.body;

    // control
    if (!blob.name) {
        res.status(400);
        res.json({"err": "Bad Data"});
    } else {
        db.blobs.save(blob, function(err, task) {
            if (err) {
                res.send(err);
            }
            res.json(blob);
        });
    }
});

// delete one
router.delete('/blob/:id', function(req, res, next) {
    db.blobs.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, blob) {
        if (err) {
            res.send(err);
        }
        res.json(blob);
    });
});

// update one
router.put('/blob/:id', function(req, res, next) {
    var blob = req.body;
    var upBlob = {};

    if (blob.name) {
        upBlob.name = blob.name;
    }
    if (blob.badge) {
        upBlob.badge = blob.badge;
    }
    if (blob.isLoved) {
        upBlob.isLoved = blob.isLoved;
    }
    if (blob.dob) {
        upBlob.dob = blob.dob;
    }

    if (!upBlob) {
        res.status(400);
        res.json({"err": "Bad Data"});

    } else {
        db.blobs.update({_id: mongojs.ObjectId(req.params.id)}, upBlob, {}, function(err, blob) {
            if (err) {
                res.send(err);
            }
            res.json(blob);
        });
    }
});

module.exports = router;