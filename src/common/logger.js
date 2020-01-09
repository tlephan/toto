'use strict';

const { createLogger, format, transports } = require('winston');
const { combine, label, printf } = format;
require('winston-daily-rotate-file');
const logging = require('../config/logging.json');

var transport = new transports.DailyRotateFile({
    dirname: logging.dirname,
    filename: logging.filename,
    datePattern: logging.datePattern,
    zippedArchive: logging.zippedArchive,
    maxSize: logging.maxSize,
    maxFiles: logging.maxFiles
});

transport.on('rotate', function(oldFilename, newFilename) {
    // Handle rotate event
});

const customFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} ${level.toUpperCase()} [${label}] ${message}`;
});

const logger = function(moduleName) {
    if (moduleName === null || moduleName.trim() === '') {
        moduleName = 'unknown_module';
    }
    return createLogger({
        level: logging.level, // Level to log message
        format: combine(
            label({ label: moduleName }),
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss' // Local time by timezone
            }),
            customFormat
        ),
        transports: [transport]
    });
};

module.exports = logger;