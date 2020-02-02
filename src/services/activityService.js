const activityModel = require('../models/activityModel');
var activityService = {};

activityService.create = async function(data) {
    try {
        return await activityModel.create(data);
    } catch (err) {
        throw err;
    }
};

activityService.find = async function(query) {
    try {
        return await activityModel.find(query);
    } catch (err) {
        throw err;
    }
};

activityService.findOne = async function(id) {
    try {
        return await activityModel.findOne(id);
    } catch (err) {
        throw err;
    }
};

module.exports = activityService;
