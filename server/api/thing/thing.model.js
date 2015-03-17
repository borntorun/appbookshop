'use strict';
var config = require('../../config/environment');
var Schema = require('mongoose').Schema;

var ThingSchema = new Schema({
  name: String,
  info: String,
  opt: String
});

module.exports = config.mongo.books.connection.model('Thing', ThingSchema);
