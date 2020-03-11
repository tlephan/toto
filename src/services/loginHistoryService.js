const loginHistoryModel = require('../models/loginHistoryModel');
const loginHistoryService = {};

loginHistoryService.create = async function(doc) {
    try {
        return await loginHistoryModel.create(doc);
    } catch (err) {
        throw err;
    }
};

loginHistoryService.find = async function(query) {
    try {
        return await loginHistoryModel.find(query);
    } catch (err) {
        throw err;
    }
};

loginHistoryService.findOne = async function(id) {
    try {
        return await loginHistoryModel.findOne(id);
    } catch (err) {
        throw err;
    }
};

loginHistoryService.findOneLatest = async function() {
    try {
        let sort = { createdAt: -1 };
        let result = await loginHistoryModel.find({}, sort, 1);
        if (result === null || result.length === 0) {
            return null;
        }
        return result[0];
    } catch (err) {
        throw err;
    }
};

module.exports = loginHistoryService;
