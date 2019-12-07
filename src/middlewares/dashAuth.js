const authService = require('../services/authService');
const loginPath = '/login';
const requestConfig = require('../config/request.json');

function redirectUnauthorized(res, encodedUrl) {
    // Don't use redirect with status 301 -> will be cached
    type = 'unauthorized';
    // Expire cookie to prevent infinity redirect issue
    /*
    res.cookie('totoToken', '', {
        path: requestConfig.session.path,
        maxAge: -1,
        httpOnly: requestConfig.session.httpOnly,
        signed: requestConfig.session.signed
    });
    */
    res.clearCookie('totoToken', {
        path: requestConfig.session.path
    });
    res.redirect(`/login?type=${type}&redirect_to=${encodedUrl}`);
}

function dashAuth() {
    return async (req, res, next) => {
        let isLoginAccess = false;
        let url = req.originalUrl;
        let pathName = '';
        // Check /login?xxx=xxx
        if (url.includes('?')) {
            pathName = url.split('?')[0];
        } else {
            pathName = url;
        }
        // Check /login/
        let lastChar = pathName[pathName.length - 1];
        if (lastChar === '/') {
            pathName = pathName.slice(0, -1);
        }
        if (pathName === loginPath) {
            isLoginAccess = true;
        }

        let encodedUrl = encodeURIComponent(url);
        let token = '';
        // Verify token from cookie
        try {
            let cookies = req.cookies;
            token = cookies.totoToken;
            if (token === undefined || token === null || token.trim() === '') {
                if (isLoginAccess) {
                    next();
                    return;
                }

                redirectUnauthorized(res, encodedUrl);
                return;
            }
        } catch (cookieErr) {
            redirectUnauthorized(res, encodedUrl);
            return;
        }

        // Verify token by decoding token
        try {
            let decoded = authService.verifyToken(token);
            req.sessionId = decoded.data.sessionId;

            if (isLoginAccess) {
                // If authorized user access login page again
                // then redirect to admin dashboard
                res.redirect(`/dashboard`);
                return;
            }

            next();
        } catch (verifyErr) {
            redirectUnauthorized(res, encodedUrl);
            return;
        }
    };
}

module.exports = dashAuth;
