const userModel = require('../../src/models/userModel');

async function test() {
    let newUser = {
        id: 100,
        name: 'thanh',
        age: 27,
        gender: 'male',
        email: 'thanhpl@fpt.com.vn'
    };

    let result = await userModel.create(newUser);
    console.log(result);
}

test();