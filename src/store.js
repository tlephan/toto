/**
 * In-memory storage handler
 */

var store = {};

// Global objects
var version = 'Unknown';
var environment = process.env.NODE_ENV || 'development';
var startTime = null;

store.getVersion = function() {
    return version;
};

store.setVersion = function(_version) {
    version = _version;
};

store.getEnvironment = function() {
    return environment;
};

store.setEnvironment = function(_env) {
    environment = _env;
};

store.getStartTime = function() {
    return startTime;
};

store.setStartTime = function(_startTime) {
    startTime = _startTime;
}

module.exports = store;
