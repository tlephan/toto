const router = require('express').Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/', dashboardController.dashboard);

router.get('/reset-password', dashboardController.dashboard);

router.get('/static', dashboardController.dashboard);

module.exports = router;