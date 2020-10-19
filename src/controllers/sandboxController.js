const response = require('../util/response');
const logger = require('../common/logger')('HealthController');
const moment = require('moment');
const axios = require('axios');

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

sandboxController.sendMessage = async function (req, res) {
    try {
        let botToken = '';
        if (req.body.bot_token !== undefined) {
            botToken = req.body.bot_token;
        }

        let data = {};
        if (req.body.chat_id !== undefined) {
            data.chat_id = req.body.chat_id;
        }
        if (req.body.text !== undefined) {
            data.text = req.body.text;
        }
        if (req.body.parse_mode !== undefined) {
            data.parse_mode = req.body.parse_mode;
        }
        if (req.body.disable_notification !== undefined) {
            data.disable_notification = req.body.disable_notification;
        }

        let headers = {
            Authorization: ''
        };
        let url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        let result = await axios.post(url, data, {
            headers: headers,
            timeout: 5000
        });
        response.sendSuccess(res, result.data);
    } catch (err) {
        try {
            if (err.response.status === 404) {
                response.sendNotFound(res, err.response.data.description);
            } else if (err.response.status === 400) {
                response.sendBadRequest(res, err.response.data.description);
            } else {
                logger.error(`Request ${req.url} failed, ${err.stack}`);
                response.sendError(res, err);
            }
        } catch (err2) {
            logger.error(`Request ${req.url} failed 2, ${err2.stack}`);
            response.sendError(res, err2);
        }
    }
};

module.exports = sandboxController;
