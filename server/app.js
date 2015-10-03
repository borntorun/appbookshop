/**
 * Main application file
 */

'use strict';

/**
 * Set default NODE_ENV - Environment
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config/environment');

/**
 * Set database connections
 */

config.mongo.library.connection = require('./config/databases')(config.mongo.library);

//seed database
require('./config/databases/seed')(require('./api/seed'));

/**
 * Set response to signals to proper close db connections
 */

process.on('SIGINT', function() {
  console.log('Exiting on SIGINT....');
  require('mongoose').disconnect(function() {
    console.log('Mongo DB disconnected.');
  });
  process.exit(0);

});

/**
 * Config and start Express Server
 */
var express = require('express');

var app = express();

var server = require('http').createServer(app);

require('./config/express')(app);

//sould this be here?
var errors = require('./components/errors');
// All other routes should redirect to 404
app.route('/*').get(function( req, res ) {
  console.log('em-app.js', req.params);
  errors[404](req, res);
});

// Start server
server.listen(config.port, config.ip, function() {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});
// Expose app
module.exports = exports = app;
