const Datastore = require('nedb');
const db = new Datastore({ filename: '/opt/toto-db/activity.db', autoload: true });

const activityModel = {};

activityModel.create = async function(data) {
    let doc = {
        id: data.id,
        type: data.type,
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

activityModel.findOne = async function(id) {
    let query = {
        id: id
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