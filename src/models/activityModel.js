const Datastore = require('nedb');
const db = new Datastore({ filename: '/opt/toto-db/activity.db', autoload: true });

const activityModel = {};

activityModel.create = async function(data) {
    let doc = {
        type: data.type,
        action: data.action,
        createdUser: data.createdUser,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
    };
    return new Promise((resolve, reject) => {
        db.insert(doc, (err, newDoc) => {
            if (err) {
                reject(err);
            } else {
                resolve(newDoc);
            }
        });
    });
};

activityModel.find = async function(query) {
    return new Promise((resolve, reject) => {
        db.find(query, function(err, docs) {
            if (err) {
                reject(err);
            } else {
                resolve(docs);
            }
        });
    });
};

// Find by generated id
activityModel.findOne = async function(id) {
    let query = {
        _id: id
    };
    return new Promise((resolve, reject) => {
        db.find(query, function(err, docs) {
            if (err) {
                reject(err);
            } else {
                resolve(docs[0]);
            }
        });
    });
};

module.exports = activityModel;