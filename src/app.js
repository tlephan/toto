const express = require('express');
const app = express();
const packageJson = require('../package.json');
const path = require('path');
const moment = require('moment');
const store = require('./store');
const serverConfig = require('./config/server.json');

const indexRoute = require('./routes/index');
const healthRoute = require('./routes/health');

console.log(`====== ${packageJson.name} ======`);
var environment = process.env.NODE_ENV || 'development';
console.log(`Version: ${packageJson.version} (${environment})`);

store.setVersion(packageJson.version);
store.setStartTime(moment());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configure routes
app.use('/', indexRoute);
app.use('/api/health', healthRoute);

const port = serverConfig.port;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});