const response = require('../util/response');
const authService = require('../services/authService');
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
        console.error(err);
        response.sendError(res, err);
    }
};

accountController.lastLogin = async function(req, res) {
    try {
        let data = await loginHistoryService.findLast();
        response.sendSuccess(res, data);
    } catch (err) {
        console.log(err);
        response.sendNotFound(res, 'Not found last login data');
    }
}

module.exports = accountController;
