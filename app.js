var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var formidable = require('formidable');

// redis@v4
const { createClient } = require("redis")
let redisClient = createClient({ legacyMode: true })
redisClient.connect().catch(console.error)




var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();



app.use(function(req, res , next){

if (req.method === 'POST'){

  var form = formidable.IncomingForm({
    uploadDir: path.join(__dirname, "/public/images"),
    keepExtensions:true

  });

  form.parse(req, function(err, fields, files){

    req.files = fields;
    req.files = files;

    next();
  })

} else {

  next();
}


});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(
  session({
  store: new RedisStore({ client: redisClient }),
    saveUninitialized: true,
    secret: "p@ssw0rd",
    resave: true,
  })
);
    
 



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/admin', adminRouter);

app.use('/users', usersRouter);


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
