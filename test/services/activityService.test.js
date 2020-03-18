const activityService = require('../../src/services/activityService');

async function test() {
    try {
        let result = await activityService.findOne('TbdAqykV6liRB9bf');
        console.log(result);
    } catch (err) {
        console.error(err);
    }
};

test();