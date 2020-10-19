# Toto
Friendly and independent watch dog (monitor agent) for server

### Why does this project appear?
In my situation, I just need to monitor one or a few of personal servers in low resource capacity. So based on Node.js knowledge and experience, I created this agent application (lightweight and simple enough) to serve my purpose. This application also exposes API in case of a monitor server has requirement to collect monitor data from them.

### Functionality
* Health information in both UI and API

### Tech stacks

* Express app
* EJS template for UI
* Public first (implement security later)
* Deploy standalone or PM2

### What are available APIs?

TBD: Swagger

# Deployment

1. Clone or pull update from repository: https://github.com/thanhpl/toto.git

2. Create a configuration file with name `.env` in directory `env` that contain keys like below (need to change its value following production environment):

```json
JWT_KEY=this-is-a-sample-secret
FORGOT_PASSWORD_KEY=this-is-forgot-password-key
```

3. Run `npm start`

### Deployment with PM2

Clone or pull source from repository into directory `/opt/toto`.

To start application with specific production environment:
```sh
$ pm2 start ecosystem.config.js --env production
```

To update and restart application:
```sh
$ pm2 restart toto
```

To view log of application:
```sh
$ pm2 log toto --lines 100
```

### Deployment standalone

To start application standalone:
```
$ ./entrypoint.sh &
```

# Sandbox APIs

### Get Moment
Description: Return date time information from moment.js and count the number of days left in the year.

Method: GET

Endpoint: `/sandbox/moment`

### Send Message
Description: Send a message to Telegram group via chat bot API.

Method: POST

Endpoint: `/sandbox/sendMessage`

Request body:
```json
{
    "bot_token": "1242861915:AAFoPhbiqhXWG8S-NBEQlUbggtbjvhVZ88k",
    "chat_id": -256675704,
    "text": "This is a sample message",
    "parse_mode": "",
    "disable_notification": false
}
```

Response: 
* 200 OK: Send message successfully
* Others: Bad request or server error