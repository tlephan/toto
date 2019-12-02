var response = {};

response.sendSuccess = function(res, data) {
    let json = data || {};
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(200);
    res.end(JSON.stringify(json, null, 4));
};

response.sendError = function(res, err) {
    let json = {
        statusCode: 500,
        error: 'Internal Server Error',
        message: err.toString()
    };
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(500);
    res.end(JSON.stringify(json, null, 4));
};

response.sendNotFound = function(res, message = 'Not Found') {
    let json = {
        statusCode: 404,
        message: message
    };
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(404);
    res.end(JSON.stringify(json, null, 4));
};

response.sendBadRequest = function(res, message = 'Bad Request') {
    let json = {
        statusCode: 400,
        error: 'Bad Request',
        message: message
    };
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(400);
    res.end(JSON.stringify(json, null, 4));
};

response.sendForbidden = function(res, message = 'Forbidden') {
    let json = {
        statusCode: 403,
        message: message
    };
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(403);
    res.end(JSON.stringify(json, null, 4));
};

response.sendUnauthorized = function(res, message = 'Unauthorized') {
    let json = {
        statusCode: 401,
        message: message
    };
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(401);
    res.end(JSON.stringify(json, null, 4));
};

module.exports = response;
