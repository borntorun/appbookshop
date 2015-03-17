/**
 * Created by Joao Carvalho on 09-02-2015.
 */
'use strict'
var config = require('../../config/environment/index');
var Schema = require('mongoose').Schema;
var CategorySchema = new Schema({
  name: { type: String }
});

CategorySchema.path('name').required(true, 'Nome é obrigatório.');

module.exports = config.mongo.books.connection.model('Category', CategorySchema);
