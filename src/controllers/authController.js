const response = require('../util/response');
const authService = require('../services/authService');

var authController = {};

authController.local = async function(req, res) {
    let password = '';
    try {
        if (req.body.password !== undefined) {
            password = req.body.password;
        }
        let isAuthenticated = await authService.login(password);

        if (isAuthenticated === false) {
            response.sendBadRequest(res, 'Incorrect password');
            return;
        }

        let token = authService.generateToken({
            app: 'toto'
        });

        let data = {
            accessToken: token,
            result: {
                app: 'toto'
            }
        };
        response.sendSuccess(res, data);
    } catch (err) {
        console.error(`Access ${req.url} failed, ${err}`);
        response.sendError(res, err);
    }
};

module.exports = authController;
