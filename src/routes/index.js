const router = require('express').Router();
const store = require('../store');

router.get('/', (req, res) => {
    res.render('index', {
        version: store.getVersion(),
        environment: store.getEnvironment()
    });
});

module.exports = router;