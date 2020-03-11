const response = require('../util/response');
const authService = require('../services/authService');
const userAgent = require('useragent');
const logger = require('../common/logger')('AccountController');
const loginHistoryService = require('../services/loginHistoryService');

var accountController = {};

accountController.resetPassword = async function(req, res) {
    try {
        let oldPassword = '';
        if (req.body.oldPassword !== undefined) {
            oldPassword = req.body.oldPassword;
        }
        let newPassword = '';
        if (req.body.newPassword !== undefined) {
            newPassword = req.body.newPassword;
        }

        if (oldPassword === '' || newPassword === '') {
            response.sendBadRequest(res, 'Missing passwords');
            return;
        }

        let loginResult = await authService.login(oldPassword);
        if (!loginResult.hasPassword) {
            response.sendNotFound(req, 'Not found credentials');
            return;
        }

        if (!loginResult.isAuthenticated) {
            response.sendBadRequest(res, 'Invalid password');
            return;
        }

        await authService.setNewPassword(newPassword);
        let data = {
            message: 'Reset password successfully'
        };
        response.sendSuccess(res, data);
    } catch (err) {
        logger.error(err.stack);
        response.sendError(res, err);
    }
};

accountController.lastLogin = async function(req, res) {
    try {
        let data = await loginHistoryService.findOneLatest();
        if (data === null) {
            response.sendNotFound(res);
            return; 
        }
        let agent = userAgent.parse(data.userAgent).toString();
        data.userAgent = agent;
        data.createdAt = data.createdAt.replace('T', ' ');
        response.sendSuccess(res, data);
    } catch (err) {
        logger.error(err.stack);
        response.sendError(res, err);
    }
};

module.exports = accountController;
