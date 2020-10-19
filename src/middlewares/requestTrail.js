const response = require('../util/response');
const logger = require('../common/logger')('RequestTrail');

function requestTrail(options) {
    let opts = options || {};

    return async (req, res, next) => {
        try {
            let ip =
                req.headers['X-Forwarded-For'] || req.connection.remoteAddress;
            let accessUrl = req.baseUrl + req.url;
            let body = JSON.stringify(req.body);

            logger.info(
                `HTTP/${req.httpVersion} - ${ip} - ${req.method} ${accessUrl} - ${body}`
            );

            next();
        } catch (err) {
            logger.error(`RequestTrail has failed, ${err.stack}`);
            response.sendError(res, err);
            return;
        }
    };
}

module.exports = requestTrail;
