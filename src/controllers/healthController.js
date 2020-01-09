const response = require('../util/response');
const os = require('os');
const healthUtil = require('../util/healthUtil');
const store = require('../store');
const logger = require('../common/logger')('HealthController');
const healthService = require('../services/healthService');

var healthController = {};

healthController.getHealth = async function(req, res) {
    try {
        let uptime = healthUtil.calculateUptime(store.getStartTime());
        let machineUptime = healthUtil.convertSecondToUptime(os.uptime());
        let health = await healthService.check();

        let machine = {
            uptime: machineUptime,
            hostname: os.hostname(),
            platform: os.platform(),
            arch: os.arch(),
            cpus: os.cpus().length
        };

        let data = {
            status: 'Up',
            uptime: uptime,
            environment: store.getEnvironment(),
            version: store.getVersion(),
            memoryUsage: health.memoryUsage.toFixed(1),
            memory: health.memory,
            diskSpace: health.diskSpace,
            machine: machine
        };
        response.sendSuccess(res, data);
    } catch (err) {
        logger.error(`Access ${req.url} failed, ${err.stack}`);
        response.sendError(res, err);
    }
};

module.exports = healthController;
