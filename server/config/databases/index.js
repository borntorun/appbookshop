/**
 * Created by Joao Carvalho on 04-02-2015.
 */
'use strict'
var mongoose = require('mongoose');
//var config = require('../environment');

module.exports = exports = function ( /*seedCallback*/dbconfig) {
  //var dbconfig = config.mongo.library;
  var connection = mongoose.createConnection(dbconfig.uri,  dbconfig.options);

  //config.mongo.library.connection = connection;

  connection.on('connected', function() {
    console.log('Mongoose connected to:');
    console.log(this.name);
  });
  connection.on('disconnected', function() {
    console.log('Mongoose disconnected to:');
    console.log(this.name);
  });
  connection.on('error', function(err) {
    console.log('Mongoose error connection to:');
    console.log(this.name);
    console.log(err);
  });



  //seedCallback.call();

  return connection;
};
