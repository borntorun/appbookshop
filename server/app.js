/**
 * Main application file
 */

'use strict';
// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');

var errors = require('./components/errors');

// Environment
var config = require('./config/environment');

// Database
var database = require('./config/databases');

// Connect Database: mongo.library
config.mongo.library.connection = database(config.mongo.library);

// Populate DB with sample data
if (config.seedDB) {
  //require('./config/databases/seed');
  //require('./api/book/seed');
  require('./api/bookconfig/seed');
  require('./api/category/seed');
  require('./api/publisher/seed');
  require('./api/country/seed');
  require('./api/language/seed');
  require('./api/keyword/seed');
  require('./api/author/seed');
  require('./api/translator/seed');

}

process.on('SIGINT', function clean() {
  console.log('Exiting on SIGINT....');
  require('mongoose').disconnect(function(){
    console.log('Mongo DB disconnected.');
  });
  process.exit(0);
});


// Setup server
var app = express();

var server = require('http').createServer(app);



require('./config/express')(app);

// All other routes should redirect to 404
app.route('/*').get(function(req,res) {
  console.log('em-app.js', req.params);
  errors[404](req,res);
});

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});
// Expose app
exports = module.exports = app;
