const checkDiskSpace = require('check-disk-space');
const os = require('os');

var healthService = {};

healthService.check = async function() {
    try {
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

        return {
            memory: memory,
            memoryUsage: used,
            diskPath: diskPath,
            diskSpace: diskSpace
        };
    } catch (err) {
        throw err;
    }
};

module.exports = healthService;
