# Toto
Friendly watch dog of servers

### Functionality
* Health information in both UI and API

### Tech stacks

* Express app
* EJS template for UI
* Public first (implement security later)
* Deploy standalone or PM2 

# Deployment

Create 2 configuration files in `/secret` directory.

1. File `jwt.json` contains JWT secret key

```json
{
    "secretKey": "this-is-a-sample-secret"
}
```

2. File `security_code.json` contains hash of password (sample hash of `123456`)

```json
{
    "hash": "$2a$10$Yvtr62vEChXlRNaZbGnSCu91CiloQ0GdYPzvILy1fdklJoPwQtgSW"
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
./entrypoint.sh &
```
