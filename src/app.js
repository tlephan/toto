const express = require('express');
const app = express();
const packageJson = require('../package.json');
const path = require('path');
const moment = require('moment');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const serveIndex = require('serve-index');
const store = require('./store');
const serverConfig = require('./config/server.json');
const loggingConfig = require('./config/logging.json');

const rateLimitWrapper = require('./middlewares/rateLimitWrapper');
const apiAuth = require('./middlewares/apiAuth');
const dashAuth = require('./middlewares/dashAuth');

const indexRoute = require('./routes/index');
const healthRoute = require('./routes/health');
const authRoute = require('./routes/auth');
const loginRoute = require('./routes/login');
const dashboardRoute = require('./routes/dashboard');
const accountRoute = require('./routes/account');
const staticRoute = require('./routes/static');

console.log(`====== ${packageJson.name} ======`);
var environment = process.env.NODE_ENV || 'development';
console.log(`Version: ${packageJson.version} (${environment})`);

store.setVersion(packageJson.version);
store.setStartTime(moment());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());
app.use(compression());
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configure routes
app.use('/', indexRoute);
app.use('/login', dashAuth(), loginRoute);
app.use('/dashboard', dashAuth(), dashboardRoute);
app.use('/static', dashAuth(), staticRoute);
app.use(
    '/static/log',
    dashAuth(),
    express.static(loggingConfig.directory),
    serveIndex(loggingConfig.directory, { icons: true, view: 'details' })
);
app.use('/api/auth', authRoute); // Public APIs
app.use('/api/account', rateLimitWrapper(), apiAuth(), accountRoute);
app.use('/api/health', rateLimitWrapper(), apiAuth(), healthRoute);

const port = serverConfig.port;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
