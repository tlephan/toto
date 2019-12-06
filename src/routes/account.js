const router = require('express').Router();
const accountController = require('../controllers/accountController');

router.post('/reset-password', accountController.resetPassword);

module.exports = router;