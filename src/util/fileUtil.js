const fs = require('fs');
const path = require('path');

var fileUtil = {};

fileUtil.read = function(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(new Error(err.toString()));
            } else {
                resolve(data.toString());
            }
        });
    });
};

fileUtil.readSync = function(filePath) {
    try {
        // Load synchronously: blocks the rest of code before completing config loader
        let rawdata = fs.readFileSync(filePath);
        return rawdata.toString();
    } catch (err) {
        console.error(`Read text failed, ${err.stack}`);
        return null;
    }
};

fileUtil.readCombineSync = function(folderPath, fileName) {
    let filePath = path.join(folderPath, fileName);
    return this.read(filePath);
};

fileUtil.write = function(filePath, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, content, err => {
            if (err) {
                reject(new Error(err.toString()));
            } else {
                resolve(true);
            }
        });
    });
};

fileUtil.writeSync = function(filePath, content) {
    try {
        // Write synchronously: blocks the rest of code before completing config loader
        fs.writeFileSync(filePath, content);
        return true;
    } catch (err) {
        console.error(`Write config failed, ${err.stack}`);
        return false;
    }
};

fileUtil.writeCombineSync = function(folderPath, fileName, content) {
    let filePath = path.join(folderPath, fileName);
    return this.write(filePath, content);
};

module.exports = fileUtil;
