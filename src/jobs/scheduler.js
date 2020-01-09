const schedule = require('node-schedule');
const logger = require('../common/logger')('Scheduler');
const cron = require('./cron');
const healthService = require('../services/healthService');
const Constants = require('../common/constants');
const Health = Constants.Health;

var scheduler = {};

scheduler.init = function() {
    schedule.scheduleJob(cron.HEALTH_CHECK, async function() {
        logger.info('Fire job: Health Check');
        try {
            let health = await healthService.check();
            let freeMemory = parseInt(health.memory.free, 10);
            let totalMemory = parseInt(health.memory.total, 10);
            let freePercent = (freeMemory * 100) / totalMemory;
            if (freePercent < Health.MAX_MEMORY_PERCENT) {
                logger.warn(
                    `Machine has low free memory ${freePercent.toFixed(1)}%`
                );
            } else {
                logger.debug(
                    `Machine memory status is fine ${freePercent.toFixed(1)}%`
                );
            }
        } catch (err) {
            logger.error(`Health check failed, ${err.stack}`);
        }
    });
};

module.exports = scheduler;
