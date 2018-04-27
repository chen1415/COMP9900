var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var cookieParser = require('cookie-parser');
var Session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var checkoutRoute = require('./routes/checkout');
var contactRoute = require('./routes/contact');
var productsRoute = require('./routes/products');
var registerRoute = require('./routes/register');
var signupRoute = require('./routes/signup');
var singleRoute = require('./routes/single');
var SignUpControlRoute = require('./routes/SignUpControl');
var LogInControlRoute = require('./routes/LogInControl');
//Harvey
var SignOutRoute = require('./routes/SignOut');
var ProfileRoute = require('./routes/ProfileControl');


// me 4.22
var addProductRouter = require('./routes/addProduct');
var uploadRouter = require('./routes/uploadfile');
var addProductProcessRouter = require('./routes/addproductprocess');
var searchRouter = require('./routes/search');
var searchResultRouter = require('./routes/result');
var flash = require('connect-flash');

var app = express();

var mongoose=require('mongoose');
var db = mongoose.connect("mongodb://127.0.0.1:27017/tests");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser('sessiontest'));

app.use(Session({secret:'max', saveUninitialized: false, resave: false}));
app.use(flash());



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/checkout', checkoutRoute);
app.use('/contact', contactRoute);
app.use('/products', productsRoute);
app.use('/register', registerRoute);
app.use('/signup', signupRoute);
app.use('/single', singleRoute);
app.use('/SignUpControl', SignUpControlRoute);
app.use('/LogInControl', LogInControlRoute);

//Harvey
app.use('/SignOut', SignOutRoute);
app.use('/ProfileControl', ProfileRoute);


// 4.22 for product
app.use('/uploadfile',uploadRouter);
app.use('/addProduct', addProductRouter);
app.use('/addproductprocess',addProductProcessRouter);
app.use('/search',searchRouter);
app.use('/searchresult',searchResultRouter);

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
