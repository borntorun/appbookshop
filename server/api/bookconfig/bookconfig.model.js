'use strict';
var config = require('../../config/environment');
var Schema = require('mongoose').Schema;
var BookConfigSchema = new Schema({
  labels: { type: Schema.Types.Mixed }
}, {
  collection: 'bookconfig'
});
module.exports = config.mongo.books.connection.model('BookConfig', BookConfigSchema);
