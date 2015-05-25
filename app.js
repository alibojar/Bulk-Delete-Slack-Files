var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var unirest = require('unirest');
var Q = require('q');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var getFiles = function() {
  var defer = Q.defer();
  var url = 'http://slack.com/api/files.list';
  var d = new Date();
  d.setDate(d.getDate() - 2);
  var twoDaysAgo = Math.round(1432410192075 / 1000);

  var postData = {
    token: 'xoxp-2191906948-2195788498-4989900812-ca22c5',
    user: 'U025RP6EN',
    ts_to: twoDaysAgo,
    pretty: 1
  };
  console.log(postData);

  unirest.get(url)
    .header('Accept', 'application/json')
    .query(postData)
    .end(function(response) {
      defer.resolve(response.body);
    });

  return defer.promise;
}

app.get('/', function(req, res) {
  res.render('index.hbs');
});

app.post('/', function(req, res) {
  getFiles().then(function(body) {
    res.json(body);
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
