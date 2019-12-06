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
        let loginResult = await authService.login(password);

        if (!loginResult.hasPassword) {
            response.sendNotFound(res, 'Not found credentials');
            return;
        }

        if (!loginResult.isAuthenticated) {
            response.sendBadRequest(res, 'Incorrect password');
            return;
        }

        let token = authService.generateToken({
            status: 'authenticated'
        });

        let data = {
            accessToken: token,
            result: {
                status: 'authenticated'
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

authController.forgotPassword = async function(req, res) {
    res.send('/unimplemented');
};

module.exports = authController;
