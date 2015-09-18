/**
 * Express configuration
 */

'use strict';
var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');
var cors = require('cors'); //new
var bodyParser = require('body-parser');

//auth
var passport = require('passport');
var session = require('express-session');

var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
//var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');

module.exports = function( app ) {
  var env = app.get('env');
  app.set('views', config.root + '/server/views');
  app.set('view engine', 'jade');
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(cors());

  /////auth
  //auth
  app.use(session({secret: 'anything'}));
  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser(function( user, done ) {
    //place a user object into the session
    done(null, user);
  });
  passport.deserializeUser(function( user, done ) {
    //take a user object from the session
    //and locate it on the database for example
    done(null, user);
  });

  var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
  var configGoogle = require('jsonfile').readFileSync('configenv.json');

  passport.use(new GoogleStrategy({
      clientID: configGoogle.google.clientID,
      clientSecret: configGoogle.google.clientSecret,
      callbackURL: 'http://vmcentos7-jmmtc.org:12999/auth/google/callback'
    },
    //function that passport will call whean google calls the callback url
    function( req, accessToken, refreshToken, profile, done ) {
      console.log('function callback');
      console.log(req.user);
      done(null, profile);
    }
  ));



  ///////
  require('../routes')(app);

  if ( 'production' === env ) {
    app.use(favicon(path.join(config.root, config.appPath, 'favicon.ico')));
    app.use(express.static(path.join(config.root, config.appPath)));
    app.set('appPath', config.root + config.appPath);
    app.use(morgan('dev'));
  }
  if ( 'development' === env || 'test' === env ) {
    app.use(require('connect-livereload')({
      port: 35729,
      src: 'http://192.168.40.25:35729/livereload.js?snipver=1'
    }));
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, config.appPath)));
    app.set('appPath', config.appPath);
    app.use(morgan('dev'));
    //app.use(errorHandler({log: errorNotification})); // Error handler - has to be last
  }


};
