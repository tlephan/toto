const router = require('express').Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/', dashboardController.dashboard);

module.exports = router;