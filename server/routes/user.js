var router      = require('express').Router();

// controllers
var user        = require('../controllers/user.controller');

router.post('/isUsernameExists', user.isUsernameExists);

router.post('/isEmailExists', user.isEmailExists);

router.post('/isFakeDomain', user.isFakeDomain);

router.post('/getForgottenUser', user.getForgottenUser);

router.post('/getValidatedUser', user.getValidatedUser);

router.post('/getResetUser', user.getResetUser);

router.put('/reset', user.setReset);

router.post('/setEmailRetriever', user.setEmailRetriever);

router.post('/', user.create);

router.put('/', user.update);

router.delete('/', user.delete);

router.post('/profile', user.profile);

module.exports = router;