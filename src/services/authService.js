const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretConfig = require('../../secret/secret.json');
const securityCode = require('../../secret/security_code.json');
var authService = {};

authService.login = async function(password) {
    let hash = securityCode.hash;
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
    return isAuthenticated;
};

authService.generateToken = function(data) {
    const signature = secretConfig.jwtKey;
    const expiration = '1h';
    return jwt.sign({ data }, signature, { expiresIn: expiration });
};

authService.verifyToken = function(token) {
    try {
        const signature = secretConfig.jwtKey;
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

module.exports = authService;
