const rateLimit = require('express-rate-limit');
const requestConfig = require('../config/request.json');

function rateLimitWrapper() {
    return rateLimit({
        windowMs: requestConfig.ratelimit.interval || 60000,
        max: requestConfig.ratelimit.max || 10,
        message: {
            statusCode: 429,
            error: 'Too Many Requests',
            message: 'Too many attempts, please try again in a minute'
        }
    });
}

module.exports = rateLimitWrapper;
