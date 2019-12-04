const express = require('express');
const app = express();
const packageJson = require('../package.json');
const path = require('path');
const moment = require('moment');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const store = require('./store');
const serverConfig = require('./config/server.json');

const rateLimitWrapper = require('./middlewares/rateLimitWrapper');
const auth = require('./middlewares/auth');
const dashAuth = require('./middlewares/dashAuth');

const indexRoute = require('./routes/index');
const healthRoute = require('./routes/health');
const authRoute = require('./routes/auth');
const loginRoute = require('./routes/login');
const dashboardRoute = require('./routes/dashboard');

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
app.use('/auth', authRoute);
app.use('/login', dashAuth(), loginRoute);
app.use('/dashboard', dashAuth(), dashboardRoute);
app.use('/api/health', rateLimitWrapper(), auth(), healthRoute);

const port = serverConfig.port;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
