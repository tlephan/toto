var requestUtil = {};

requestUtil.getRemoteIp = function(req) {
    let remoteAddr =
        req.headers['X-Forwarded-For'] || req.connection.remoteAddress;
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
