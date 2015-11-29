'use strict';
var config = require('../../../config/environment');
var Schema = require('mongoose').Schema;

var schema = new Schema({
  language: { type: Schema.Types.String},
  bookdetail: { type: Schema.Types.Mixed },
  bookrecord: { type: Schema.Types.Mixed }
}, {
  collection: 'messageconfig'
});

module.exports = config.mongo.library.connection.model('MessageConfig', schema);
