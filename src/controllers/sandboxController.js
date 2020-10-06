const response = require('../util/response');
const logger = require('../common/logger')('HealthController');
const moment = require('moment');

var sandboxController = {};

sandboxController.get = async function (req, res) {
    res.render('sandbox', {});
};

sandboxController.getMoment = async function (req, res) {
    try {
        var dayOfYear = moment().dayOfYear();
        var leftDayOfYear = 365 - dayOfYear;
        var isLeapYear = moment().isLeapYear();
        if (isLeapYear) {
            leftDayOfYear++;
        }

        let data = {
            today: moment().toString(),
            description:
                `Today will become the history.` +
                ` Today is the ${dayOfYear} day of ${moment().year()}.` +
                ` There are ${leftDayOfYear} days left in the year.`,
            currentWeekNo: moment().week(),
            currentMonth: moment().month() + 1,
            currentYear: moment().year(),
            weeksInYear: moment().weeksInYear(),
            daysInMonth: moment().daysInMonth(),
            dayOfYear: dayOfYear,
            leftDayOfYear: leftDayOfYear,
            isLeapYear: isLeapYear
        };
        response.sendSuccess(res, data);
    } catch (err) {
        logger.error(`Access ${req.url} failed, ${err.stack}`);
        response.sendError(res, err);
    }
};

module.exports = sandboxController;
