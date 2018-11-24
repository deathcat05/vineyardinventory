var express = require('express');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
//Added for the users authenticated by Passport
//var users = require('./routes/users');
var about = require('./routes/about');
var whiteWine = require('./routes/whiteWine_routes');
var redWine = require('./routes/redWine_routes');
var customer = require('./routes/customer_routes');
var boughtWhite = require('./routes/boughtWhite_routes');
var shippingDept = require('./routes/shippingDept_routes');
var app = express();
app.use(express.static('public/images'));
app.use(express.static('public/css'));


//These are used for the passportJS
var passport = require('passport');
var LocalStrategy = require('passport-local');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var session = require('express-session');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/images/HomeIcon.ico'));



//Added for Passport integrationg
app.use(session({
    secret: 'superSecret',
    resave: true,
    saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

var configDB = require('./config/db_connection');
//mongoose.connect(configDB.url);

require('./config/passport')(passport);


app.use('/', index);
app.use('/about', about);
//The Users route
//app.use('/users', users);
app.use('/whiteWine', whiteWine);
app.use('/redWine', redWine);
app.use('/customer', customer);
app.use('/boughtWhite', boughtWhite);
app.use('/shippingDept', shippingDept);

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