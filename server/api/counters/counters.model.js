'use strict';
var config = require('../../config/environment');
var Schema = require('mongoose').Schema;
var CountersSchema = new Schema({
  _id: { type: String },
  seq: { type: Number }
}, {
  collection: 'counters'
});
module.exports = config.mongo.library.connection.model('Counters', CountersSchema);
