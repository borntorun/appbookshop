'use strict';
var config = require('../../config/environment');
var util = require('../../util');
var Schema = require('mongoose').Schema;
var UserSchema = new Schema({
  email: { type: String },
  name: { type: String },
  active: { type: Boolean },
  googleId: { type: String },
  photo: { type: String }
});

UserSchema.path('name').required(true, 'Nome é obrigatório.');
UserSchema.path('email').required(true, 'Email é obrigatório.');

UserSchema.method('toJSON', function(){
  var user = this.toObject();
  delete user.googleId;
  return user;
});


module.exports = config.mongo.library.connection.model('User', UserSchema);
