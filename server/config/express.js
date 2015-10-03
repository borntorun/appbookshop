/**
 * Express configuration
 */

'use strict';
var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');
//var cors = require('cors'); //new
var bodyParser = require('body-parser');
var csurf = require('csurf');

var path = require('path');
var config = require('./environment');
//var methodOverride = require('method-override');

/**
 * Passport
*/
var passport = require('passport');
/**
 * express-session
*/
var session = require('express-session');
/**
 * cookies
*/
var Cookies = require('cookies');

module.exports = function( app ) {


  var env = app.get('env');

  app.use(morgan('dev'));
  app.use(compression({level:2}));
  app.use(bodyParser.urlencoded({ extended: false }));
  //bodyParser.json is used per route
  //app.use(bodyParser.json());
  //app.use(methodOverride());


  /**
   * Set jade view engine
   */
  app.set('views', [
      config.root + '/server/auth/google/views',
      config.root + '/server/views'
  ]);
  app.set('view engine', 'jade');

  /**
   * Set static routes
   * (must be before session - static resources do not use session)
   */
  if ( 'production' === env ) {
    app.use(favicon(path.join(config.root, config.appPath, 'favicon.ico')));
    app.use(express.static(path.join(config.root, config.appPath)));
  }
  if ( 'development' === env || 'test' === env ) {
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'client')));
  }

  /**
   * Initiate session
   */
  //TODO: session to use database
  app.use(session({secret: process.env.SESSIONSECRET || '1S9H9H9...'}));

  /**
   * Use CSRF
   */
  var csrfValue = function(req) {
    var token = (req.body && req.body._csrf) || (req.query && req.query._csrf) || (req.headers['x-csrf-token']) || (req.headers['x-xsrf-token']);
    return token;
  };
  app.use(csurf({value: csrfValue}));


  /////auth
  //auth with passport(must before routes)
//  app.use(passport.initialize());
//  app.use(passport.session());




  //app.use(cookieParser());
  /*app.use(cors({
    origin: ['http://192.168.40.25:12999','http://192.168.99.20:12999', 'http://localhost:12999']
  }));*/
  /*app.use(function( req, res, next ) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:12999, http://192.168.40.25:12999, http://192.168.99.20:12999');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,DELETE,POST');
    //res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
  });*/




  /**
   * live-reload
   */
  if ( 'development' === env || 'test' === env ) {
    app.use(require('connect-livereload')({
      port: 35729,
      src: 'http://192.168.40.25:35729/livereload.js?snipver=1'
    }));
  }

  /**
   * Dynamic routes
   */
  require('../routes')(app);



//  if ( 'production' === env ) {
//    //routes
//
//    app.use(favicon(path.join(config.root, config.appPath, 'favicon.ico')));
//
//    app.use(express.static(path.join(config.root, config.appPath)));
//
//    //app.set('appPath', config.root + config.appPath);
//
//
//  }
//
//  if ( 'development' === env || 'test' === env ) {
//    /*app.use(require('connect-livereload')({
//      port: 35729,
//      src: 'http://192.168.40.25:35729/livereload.js?snipver=1'
//    }));*/
//    app.use(express.static(path.join(config.root, '.tmp')));
//    app.use(express.static(path.join(config.root, 'client')));
//
//    //app.use(express.static(path.join(config.root, config.appPath)));
//
//    //app.set('appPath', config.appPath);
//
//
//  }

};
