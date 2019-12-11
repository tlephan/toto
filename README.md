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

# Deployment

Create a configuration files in `/secret` directory.

File `secret.json` contains secret keys, and you need to change its value in production enviroment:

```json
{
    "jwtKey": "this-is-a-sample-secret",
    "forgotPasswordKey": "this-is-forgot-password-key"
}
```

### Deployment with PM2

Clone or pull source from GitHub repository into directory `/opt/toto`.

To start application:
```
$ pm2 start ecosystem.config.js --env production
```

To update and restart application:
```
$ pm2 restart toto
```

### Deployment standalone

To start application standalone:
```
$ ./entrypoint.sh &
```
