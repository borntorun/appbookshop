'use strict'
var config = require('../../config/environment/index');
var Schema = require('mongoose').Schema;
var PublisherSchema = new Schema({
  name: { type: String }
});

PublisherSchema.path('name').required(true, 'Nome é obrigatório.');

module.exports = config.mongo.library.connection.model('Publisher', PublisherSchema);
