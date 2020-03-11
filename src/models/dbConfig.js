const path = require('path');
var dbConfig = {};

dbConfig.getModelPath = function(modelName) {
    if (modelName === undefined || modelName === null) {
        return null;
    }
    return path.resolve(process.cwd(), 'data', modelName + '.db');
};

module.exports = dbConfig;
