var dashboardController = {};

dashboardController.dashboard = async function(req, res) {
    res.render('dashboard', {});
};

module.exports = dashboardController;
