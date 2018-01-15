var express = require('express');
var cookieSession = require('cookie-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql      = require('mysql');
var config      = require('./config');

var connection = mysql.createConnection({
  host     : config.database.host,
  user     : config.database.user,
  password : config.database.password
});

connection.connect();

var fakeUsers = require('./config/fakeUsers.js');

var app = express();
app.use(logger('dev'));

/* Pour les cookies */
app.use(cookieSession({
  name: 'session',
  secure: false,
  keys: [''],
  httpOnly: false,
  maxAge: 1 * 60 * 60 * 1000 // 1 hours
}));

// view engine setup
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var auth = express.Router();
require('./app/routes/auth')(auth, fakeUsers);
app.use('/auth', auth);

var secure = express.Router();
require('./app/routes/secure')(secure);
app.use('/', secure);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
