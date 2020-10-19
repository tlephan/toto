const express = require('express');
const app = express();
const packageJson = require('../package.json');
const path = require('path');
const moment = require('moment');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const serveIndex = require('serve-index');
const favicon = require('serve-favicon');
const cors = require('cors');
const logger = require('./common/logger')('App');

// Load process.env configs as soon as possible
const dotenv = require('dotenv');
const fileUtil = require('./util/fileUtil');
var envPath = path.resolve(process.cwd(), 'env', '.env');
if (!fileUtil.existsSync(envPath)) {
    console.error(`Not found config file .env in env directory, process exits`);
    process.exit(0);
}
dotenv.config({ path: envPath });

const store = require('./store');
const serverConfig = require('./config/server.json');
const loggingConfig = require('./config/logging.json');
const scheduler = require('./jobs/scheduler');
const rateLimitWrapper = require('./middlewares/rateLimitWrapper');
const apiAuth = require('./middlewares/apiAuth');
const dashAuth = require('./middlewares/dashAuth');
const requestTrail = require('./middlewares/requestTrail');

const indexRoute = require('./routes/index');
const healthRoute = require('./routes/health');
const authRoute = require('./routes/auth');
const loginRoute = require('./routes/login');
const dashboardRoute = require('./routes/dashboard');
const accountRoute = require('./routes/account');
const sandboxRoute = require('./routes/sandbox');

console.log(`====== ${packageJson.name} ======`);
logger.info(`====== ${packageJson.name} ======`);
var environment = process.env.NODE_ENV || 'development';
let versionMsg = `Version: ${packageJson.version} (${environment})`;
console.log(versionMsg);
logger.info(versionMsg);

store.setVersion(packageJson.version);
store.setStartTime(moment());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(cors());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configure routes
app.use('/', indexRoute);
app.use('/login', dashAuth(), loginRoute);
app.use('/dashboard', dashAuth(), dashboardRoute);
app.use(
    '/private-static/log',
    dashAuth(),
    express.static(loggingConfig.dirname),
    serveIndex(loggingConfig.dirname, { icons: true, view: 'details' })
);

// Public static hosting
app.use(
    '/static',
    requestTrail(),
    express.static(serverConfig.staticDir),
    serveIndex(serverConfig.staticDir, { icons: true, view: 'details' })
);

// Public sandbox
app.use('/sandbox', requestTrail(), sandboxRoute);

// Authenticated APIs
app.use('/api/auth', authRoute); // Public APIs
app.use('/api/account', rateLimitWrapper(), apiAuth(), accountRoute);
app.use('/api/health', rateLimitWrapper(), apiAuth(), healthRoute);

const port = serverConfig.port;
app.listen(port, () => {
    let listenMsg = `Server is listening on port ${port}`;
    console.log(listenMsg);
    logger.info(listenMsg);

    scheduler.init();
});
