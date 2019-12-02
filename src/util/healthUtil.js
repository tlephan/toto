const moment = require('moment');

var healthUtil = {};

healthUtil.calculateUptime = function(startTime) {
    if (startTime === undefined || startTime === null) {
        return 'Unknown';
    }

    let nowMoment = moment();
    let duration = moment.duration(nowMoment.diff(startTime));
    let durationMinutes = duration.asMinutes().toFixed(1);
    if (durationMinutes < 60) {
        return durationMinutes + 'm';
    }
    let durationHours = duration.asHours().toFixed(1);
    if (durationHours < 24) {
        return durationHours + 'h';
    }
    let durationDays = duration.asDays().toFixed(1);
    if (durationDays < 30) {
        return durationDays + 'd';
    }
    let durationMonths = duration.asMonths().toFixed(1);
    if (durationMonths < 12) {
        return durationMonths + 'mo';
    }
    let durationYears = duration.asYears().toFixed(1);
    return durationYears + 'y';
};

healthUtil.convertSecondToUptime = function(seconds) {
    if (seconds === undefined || seconds === null) {
        return 'Unknown';
    }

    let durationMinutes = (seconds / 60).toFixed(1);
    if (durationMinutes < 60) {
        return durationMinutes + 'm';
    }
    let durationHours = (durationMinutes / 60).toFixed(1);
    if (durationHours < 24) {
        return durationHours + 'h';
    }
    let durationDays = (durationHours / 24).toFixed(1);
    if (durationDays < 30) {
        return durationDays + 'd';
    }
    let durationMonths = (durationDays / 30).toFixed(1);
    if (durationMonths < 12) {
        return durationMonths + 'mo';
    }
    let durationYears = (durationMonths / 12).toFixed(1);
    return durationYears + 'y';
};

module.exports = healthUtil;
