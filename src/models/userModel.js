const dbConfig = require('./dbConfig');
const Datastore = require('nedb');
const db = new Datastore({
    filename: dbConfig.getModelPath('user'),
    autoload: true
});

const userModel = {};

userModel.create = async function(doc) {
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

userModel.find = async function(query) {
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

userModel.findOne = async function(id) {
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

userModel.update = async function(query, update) {
    return new Promise((resolve, reject) => {
        db.update(query, update, {}, (err, numReplaced) => {
            if (err) {
                reject(err);
            } else {
                resolve(numReplaced);
            }
        });
    });
};

userModel.deleteOne = async function(id) {
    return new Promise((resolve, reject) => {
        db.remove({ id: id }, {}, (err, numRemoved) => {
            if (err) {
                reject(err);
            } else {
                resolve(numRemoved);
            }
        });
    });
};

module.exports = userModel;
