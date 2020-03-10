const fileUtil = require('../util/fileUtil');
const path = require('path');

var loginHistoryService = {};

loginHistoryService.createLast = async function(data) {
    if (data === undefined || data === null) {
        return false;
    }
    try {
        let filePath = path.join(process.cwd(), 'data', 'last_login.tmp');
        await fileUtil.write(filePath, JSON.stringify(data, null, 4));
    } catch (err) {
        throw err;
    }
};

loginHistoryService.findLast = async function() {
    try {
        let filePath = path.join(process.cwd(), 'data', 'last_login.tmp');
        let plainText = await fileUtil.read(filePath);
        return JSON.parse(plainText);
    } catch (err) {
        throw err;
    }
};

module.exports = loginHistoryService;
