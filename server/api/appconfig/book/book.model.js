'use strict';
var config = require('../../../config/environment');
var Schema = require('mongoose').Schema;

var schema = new Schema({
  language: { type: Schema.Types.String},
  config: { type: Schema.Types.Mixed }/*
  search: { type: Schema.Types.Mixed },
  labels: { type: Schema.Types.Mixed },
  placeholders: { type: Schema.Types.Mixed },
  valMessages: { type: Schema.Types.Mixed }*/
}, {
  collection: 'bookconfig'
});

module.exports = config.mongo.library.connection.model('BookConfig', schema);
