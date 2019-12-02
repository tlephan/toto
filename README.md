# toto
Friendly and lightweight watch dog of servers

### Functionality
* Health information in both UI and API

### Tech stacks

* Express app
* EJS template for ui
* Public first (implement security later)
* Deploy standalone or PM2 

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
./entrypoint.sh &
```
