const activityModel = require('../../src/models/activityModel');

async function test() {
    try {
        /*
        let doc = {
            id: '2',
            type: 'logout',
            createdUser: 'thanhpl',
            createdAt: '2020-01-01 09:09:09',
            updatedAt: '2020-01-01 09:09:09'
        };

        await activityModel.create(doc);
        */
       
        let result = await activityModel.find({});
        console.log(result);
    } catch (err) {
        console.error(err);
    }
}

test();