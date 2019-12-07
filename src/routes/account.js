const router = require('express').Router();
const accountController = require('../controllers/accountController');

router.post('/reset-password', accountController.resetPassword);

router.get('/last-login', accountController.lastLogin);

module.exports = router;