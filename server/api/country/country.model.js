/**
 * Created by Joao Carvalho on 09-02-2015.
 */
'use strict'
var config = require('../../config/environment/index');
var Schema = require('mongoose').Schema;
var CountrySchema = new Schema({
  name: { type: String }
});

CountrySchema.path('name').required(true, 'Nome é obrigatório.');

module.exports = config.mongo.books.connection.model('Country', CountrySchema);
