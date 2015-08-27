/**
 * Main application file
 */

'use strict';
// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');

// Environment
var config = require('./config/environment');

// Database
var database = require('./config/databases');
// Connect Database: mongo.books
config.mongo.books.connection = database(config.mongo.books);
// Populate DB with sample data
if (config.seedDB) {
  //require('./config/databases/seed');
  //require('./api/book/seed');
  require('./api/bookconfig/seed');
  require('./api/category/seed');
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
require('./routes')(app);
// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});
// Expose app
exports = module.exports = app;
