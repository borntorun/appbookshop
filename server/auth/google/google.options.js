'use strict'
/*jshint camelcase: false */

//console.log(__dirname);
var config = require('../../config/environment');
var path = require('path');
//console.log(path.join(__dirname,'configenv.json'));
var googleEnv = require('jsonfile').readFileSync(path.join(__dirname,'configenv.json')).google;

exports.uris = {
  profile: googleEnv.uri_profile,
  validateToken: googleEnv.uri_validateToken
};

exports.scope = googleEnv[config.env].scope;

exports.strategyOptions = {
  clientID: googleEnv[config.env].client_id,
  clientSecret: googleEnv[config.env].client_secret,
  callbackURL: googleEnv[config.env].redirect_uri,
  passReqToCallback: true
}
