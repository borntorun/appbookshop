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
  //auth with passport(must before routes)


  ///////
  require('../routes')(app);

  if ( 'production' === env ) {
    //routes


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

  //routes
  require('../routes')(app);


};
