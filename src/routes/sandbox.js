const router = require('express').Router();
const sandboxController = require('../controllers/sandboxController');

router.get('/', sandboxController.get);

router.get('/moment', sandboxController.getMoment);

router.post('/sendMessage', sandboxController.sendMessage);

module.exports = router;
