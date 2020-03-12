const logger = require('../common/logger')('RequestUtil');
var requestUtil = {};

requestUtil.getRemoteIp = function(req) {
    //logger.debug(`Request headers: ${JSON.stringify(req.headers, null, 4)}`);
    let remoteAddr = '';
    if (req.headers['X-Forwarded-For'] !== undefined) {
        remoteAddr = req.headers['X-Forwarded-For'];
    } else if (req.headers['x-forwarded-for'] !== undefined) {
        remoteAddr = req.headers['x-forwarded-for'];
    } else {
        remoteAddr = req.connection.remoteAddress;
    }

    if (remoteAddr === '::1') {
        remoteAddr = '127.0.0.1';
    } else {
        remoteAddr = remoteAddr.replace('::ffff:', '');
    }
    return remoteAddr;
};

requestUtil.getUserAgent = function(req) {
    let agent = req.get('User-Agent');
    if (agent === undefined) {
        agent = null;
    }
    return agent;
};

module.exports = requestUtil;
