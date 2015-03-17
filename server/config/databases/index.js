/**
 * Created by Joao Carvalho on 04-02-2015.
 */
'use strict'
var mongoose = require('mongoose');

module.exports = function (dbconfig) {
  var connection = mongoose.createConnection(dbconfig.uri,  dbconfig.options);

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
  return connection;
};
