var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
<<<<<<< HEAD
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

// redis@v4
const { createClient } = require("redis")
let redisClient = createClient({ legacyMode: true })
redisClient.connect().catch(console.error)




var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
=======

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
>>>>>>> b8c82297cd67ee66eb0ffa8efcaccb8f723c0e27

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

<<<<<<< HEAD

app.use(
  session({
  store: new RedisStore({ client: redisClient }),
    saveUninitialized: true,
    secret: "p@ssw0rd",
    resave: true,
  })
);
    
 


=======
>>>>>>> b8c82297cd67ee66eb0ffa8efcaccb8f723c0e27
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
<<<<<<< HEAD
app.use('/admin', adminRouter);
=======
app.use('/users', usersRouter);
>>>>>>> b8c82297cd67ee66eb0ffa8efcaccb8f723c0e27

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
