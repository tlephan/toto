const router = require('express').Router();
const sandboxController = require('../controllers/sandboxController');

router.get('/', sandboxController.get);

router.get('/moment', sandboxController.getMoment);

module.exports = router;
