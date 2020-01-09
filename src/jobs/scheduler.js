const schedule = require('node-schedule');
const logger = require('../common/logger')('Scheduler');
const cron = require('./cron');

var scheduler = {};

scheduler.init = function() {
    schedule.scheduleJob(cron.HEALTH_CHECK, function() {
        logger.info('Fire job: Health Check');
        //
    });
};

module.exports = scheduler;
