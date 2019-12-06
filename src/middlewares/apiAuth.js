const response = require('../util/response');
const authService = require('../services/authService');

function apiAuth(options) {
    let opts = options || {};

    return async (req, res, next) => {
        try {
            let headers = req.headers;
            let authorization = headers.authorization;
            if (authorization === undefined) {
                response.sendUnauthorized(res);
                return;
            }

            let splits = authorization.split('Bearer');
            if (splits.length !== 2 || splits[1].trim().length === 0) {
                response.sendUnauthorized(res);
                return;
            }

            let token = splits[1].trim();

            // Verify token by decoding token
            try {
                authService.verifyToken(token);
            } catch (verifyErr) {
                response.sendUnauthorized(res);
                return;
            }

            next();
        } catch (err) {
            console.error(`Authenticate failed, ${err}`);
            response.sendError(res, err);
            return;
        }
    };
}

module.exports = apiAuth;
