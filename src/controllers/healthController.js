const response = require('../util/response');
const os = require('os');
const healthUtil = require('../util/healthUtil');
const store = require('../store');

var healthController = {};

healthController.getHealth = function(req, res) {
    try {
        let uptime = healthUtil.calculateUptime(store.getStartTime());
        let machineUptime = healthUtil.convertSecondToUptime(os.uptime());

        let used = -1;
        let free = -1;
        let total = -1;
        used = process.memoryUsage().heapUsed / (1024 * 1024);
        free = os.freemem() / (1024 * 1024);
        total = os.totalmem() / (1024 * 1024);

        let data = {
            status: 'Up',
            uptime: uptime,
            machineUptime: machineUptime,
            memoryUsage: used.toFixed(1),
            memoryFree: free.toFixed(1),
            memoryTotal: total.toFixed(1),
            platform: os.platform()
        };
        response.sendSuccess(res, data);
    } catch (err) {
        console.error(`Access ${req.url} failed, ${err}`);
        response.sendError(res, err);
    }
};

module.exports = healthController;
