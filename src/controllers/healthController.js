const response = require('../util/response');
const os = require('os');
const healthUtil = require('../util/healthUtil');
const store = require('../store');
const checkDiskSpace = require('check-disk-space');

var healthController = {};

healthController.getHealth = async function(req, res) {
    try {
        let uptime = healthUtil.calculateUptime(store.getStartTime());
        let machineUptime = healthUtil.convertSecondToUptime(os.uptime());

        let memory = {};
        let used = -1;
        memory.free = -1;
        memory.total = -1;
        used = process.memoryUsage().heapUsed / (1024 * 1024);
        memory.free = (os.freemem() / (1024 * 1024)).toFixed(1);
        memory.total = (os.totalmem() / (1024 * 1024)).toFixed(1);

        let diskPath = os.platform() === 'win32' ? 'C:' : '/';
        let diskSpace = await checkDiskSpace(diskPath);

        diskSpace.freeGb = (diskSpace.free / (1024 * 1024 * 1024)).toFixed(1); // GB
        diskSpace.sizeGb = (diskSpace.size / (1024 * 1024 * 1024)).toFixed(1); // GB

        let machine = {
            uptime: machineUptime,
            platform: os.platform() + '-' + os.arch(),
            hostname: os.hostname(),
            cpus: os.cpus().length
        };

        let data = {
            status: 'Up',
            uptime: uptime,
            environment: store.getEnvironment(),
            memoryUsage: used.toFixed(1),
            memory: memory,
            diskSpace: diskSpace,
            machine: machine
        };
        response.sendSuccess(res, data);
    } catch (err) {
        console.error(`Access ${req.url} failed, ${err}`);
        response.sendError(res, err);
    }
};

module.exports = healthController;
