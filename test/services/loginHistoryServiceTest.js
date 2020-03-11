const service = require('../../src/services/loginHistoryService');

async function test() {
    let result = await service.findOneLatest();
    console.log(result);
}

test();