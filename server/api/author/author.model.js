/**
 * Created by Joao Carvalho on 09-02-2015.
 */
'use strict'
var config = require('../../config/environment/index');
var Schema = require('mongoose').Schema;
var AuthorSchema = new Schema({
  name: { type: String }
});

AuthorSchema.path('name').required(true, 'Nome é obrigatório.');

module.exports = config.mongo.library.connection.model('Author', AuthorSchema);
