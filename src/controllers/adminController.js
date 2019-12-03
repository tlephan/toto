var adminController = {};

adminController.login = async function(req, res) {
    try {
        res.render('login', {});
    } catch (err) {
        // Verify token failed and render login
        res.render('error', {});
    }
};

adminController.dashboard = async function(req, res) {
    res.render('dashboard', {});
};

module.exports = adminController;
