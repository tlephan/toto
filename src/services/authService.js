const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fileUtil = require('../util/fileUtil');
const path = require('path');
const secretConfig = require('../../secret/secret.json');
var authService = {};
const saltRounds = 10;

authService.login = async function(password) {
    let hash = '';
    try {
        let hashFilePath = path.join(process.cwd(), 'secret', 'p_hash.tmp');
        let plainText = await fileUtil.read(hashFilePath);
        hash = JSON.parse(plainText).hash;
    } catch (err) {
        console.error(err);
        return {
            hasPassword: false,
            isAuthenticated: false
        };
    }

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

authService.setNewPassword = async function(newPassword) {
    try {
        let salt = await bcrypt.genSalt(saltRounds);
        let hash = await bcrypt.hash(newPassword, salt);
        let hashFilePath = path.join(process.cwd(), 'secret', 'p_hash.tmp');
        let data = {
            hash: hash,
            salt: salt
        };
        await fileUtil.write(hashFilePath, JSON.stringify(data, null, 4));
    } catch (err) {
        throw err;
    }
};

module.exports = authService;
