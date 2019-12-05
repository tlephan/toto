const response = require('../util/response');
const authService = require('../services/authService');
const requestConfig = require('../config/request.json');

var authController = {};

authController.local = async function(req, res) {
    let password = '';
    let isDashboard = false;
    try {
        if (req.body.isDashboard !== undefined) {
            isDashboard = req.body.isDashboard;
        }
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

        if (isDashboard) {
            // Set session info
            if (requestConfig.session.client === 'cookie') {
                res.cookie('totoToken', token, {
                    path: requestConfig.session.path,
                    maxAge: requestConfig.session.maxAge * 1000,
                    httpOnly: requestConfig.session.httpOnly,
                    signed: requestConfig.session.signed
                });
            }
        }
        response.sendSuccess(res, data);
    } catch (err) {
        console.error(`Access ${req.url} failed, ${err}`);
        response.sendError(res, err);
    }
};

authController.logout = async function(req, res) {
    try {
        let cookies = req.cookies;
        let token = cookies.totoToke;
        let decoded = authService.decodeToken(token);

        // Verify token and user before doing logout
        let data = {
            message: 'Logout success'
        };
        res.clearCookie('totoToken', {
            path: requestConfig.session.path
        });
        response.sendSuccess(res, data);
    } catch (err) {
        logger.error(`Access ${req.url} failed, ${err}`);
        response.sendError(res, err);
    }
};

module.exports = authController;
