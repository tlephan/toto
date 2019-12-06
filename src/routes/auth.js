const router = require('express').Router();
const authController = require('../controllers/authController');

router.post('/local', authController.local);

router.post('/logout', authController.logout);

router.post('/forgot-password', authController.forgotPassword);

module.exports = router;