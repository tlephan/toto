const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../env');
var authService = {};
const saltRounds = 10;

authService.login = async function(password) {
    let hash = env.ADMIN_PASSWORD_HASH;

    try {
        let authenticate = function() {
            return new Promise((resolve, reject) => {
                bcrypt.compare(password, hash, (err, result) => {
                    if (err) {
                        console.error(`Compare hash failed, ${err}`);
                        reject(new Error(err.toString()));
                    }
                    resolve(result);
                });
            });
        };
        let isAuthenticated = await authenticate();
        return {
            hasPassword: true,
            isAuthenticated: isAuthenticated
        };
    } catch (err) {
        throw err;
    }
};

authService.generateToken = function(data) {
    const signature = env.JWT_KEY;
    const expiration = '1h';
    return jwt.sign({ data }, signature, { expiresIn: expiration });
};

authService.verifyToken = function(token) {
    try {
        const signature = env.JWT_KEY;
        let decoded = jwt.verify(token, signature);
        return decoded;
    } catch (err) {
        throw err;
    }
};

authService.decodeToken = function(token) {
    try {
        let decoded = jwt.decode(token);
        return decoded;
    } catch (err) {
        throw err;
    }
};

authService.setNewPassword = async function(newPassword) {
    try {
        let salt = await bcrypt.genSalt(saltRounds);
        let hash = await bcrypt.hash(newPassword, salt);
        // Save new password hash here
    } catch (err) {
        throw err;
    }
};

module.exports = authService;
