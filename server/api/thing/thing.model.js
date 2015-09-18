'use strict';
var config = require('../../config/environment');
var Schema = require('mongoose').Schema;

var ThingSchema = new Schema({
  name: String,
  info: String,
  opt: String
});

module.exports = config.mongo.library.connection.model('Thing', ThingSchema);
