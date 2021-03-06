'use strict'
/*jshint camelcase: false */

var config = require('../../config/environment');
var path = require('path');
var googleEnv = require('jsonfile').readFileSync(path.join(__dirname,'configenv.json')).google;

exports.uris = {
  profile: googleEnv.uri_profile,
  validateToken: googleEnv.uri_validateToken,
  refreshToken: googleEnv.uri_refreshToken
};

exports.scope = googleEnv[config.env].scope;

exports.accessType = googleEnv[config.env].access_type;

if (('production' === config.env || 'demo' === config.env) && process.env.domainurl) {
  googleEnv[config.env].redirect_uri = googleEnv[config.env].redirect_uri.replace('$domainurl$', process.env.domainurl);
}

exports.strategyOptions = {
  clientID: process.env.google_clientid || googleEnv[config.env].client_id,
  clientSecret: process.env.google_clientsecret || googleEnv[config.env].client_secret,
  callbackURL: googleEnv[config.env].redirect_uri,
  passReqToCallback: true
};


exports.validateTokenOptions = {
  uri: googleEnv.uri_validateToken,
  method: 'GET',
  json: true
};

exports.refreshTokenOptions = {
  uri: googleEnv.refresh_token.uri,
  method: 'POST',
  json: true,
  form: {
    'refresh_token': '',
    'grant_type': googleEnv.refresh_token.grant_type,
    'client_id': googleEnv[config.env].client_id,
    'client_secret': googleEnv[config.env].client_secret
  }
};
