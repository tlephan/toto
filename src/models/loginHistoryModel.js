const dbConfig = require('./dbConfig');
const Datastore = require('nedb');
const db = new Datastore({
    filename: dbConfig.getModelPath('login_history'),
    autoload: true
});

const loginHistoryModel = {};

loginHistoryModel.create = async function(doc) {
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

loginHistoryModel.find = async function(query, sort = {}, limit = 100) {
    return new Promise((resolve, reject) => {
        db.find(query)
            .sort(sort)
            .limit(limit)
            .exec(function(err, docs) {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
    });
};

loginHistoryModel.findOne = async function(id) {
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

module.exports = loginHistoryModel;
