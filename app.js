require("dotenv").config();
require("./configs/mongo"); // database initial setup
require("./helpers/hbs"); // utils for hbs templates

// base dependencies
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require("hbs");
const mongoose = require("mongoose");
const session = require("express-session");
const dev_mode = false;


const app = express();
const MongoStore = require("connect-mongo")(session);


// initial config
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev')); // config logger (pour debug)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + "/views/partial");


// SESSION SETUP
// The session setup needs to come before the app.use otherwise it wont work in my case
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 60000 }, // in millisec
    store: new MongoStore({
      mongooseConnection: mongoose.connection, // you can store session infos in mongodb :)
      ttl: 24 * 60 * 60, // 1 day
    }),
    saveUninitialized: true,
    resave: true,
  })
);


//routers
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/api/manage', require('./routes/api/api.manage'));
app.use('/auth', require('./routes/auth'));




// expose login status to the hbs templates
// app.use(require("./middlewares/exposeLoginStatus"));


// below, site_url is used in partials/shop_head.hbs to perform ajax request (var instead of hardcoded)
app.locals.site_url = process.env.SITE_URL;

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


// CUSTOM MIDDLEWARES --- later

module.exports = app;
