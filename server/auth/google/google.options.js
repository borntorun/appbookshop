'use strict'
//console.log(__dirname);
var config = require('../../config/environment');
var path = require('path');
console.log(path.join(__dirname,'configenv.json'));
var googleEnv = require('jsonfile').readFileSync(path.join(__dirname,'configenv.json')).google;


/*jshint camelcase: false */
var options_token = {
  uri: googleEnv.uri_token,
  method: 'POST',
  json: true,
  form: {
    'redirect_uri': googleEnv[config.env].redirect_uri,
    'code': '',
    'grant_type': googleEnv[config.env].grant_type,
    'client_id': googleEnv[config.env].client_id,
    'client_secret': googleEnv[config.env].client_secret
  }
};

if ( 'production' === config.env ) {
  options_token.client_id = process.env.GOOGLE_CLIENT_ID;
  options_token.client_secret = process.env.GOOGLE_CLIENT_SECRET;
}

var options_profile = {
  uri: googleEnv.uri_profile,
  method: 'GET',
  headers: {
    Authorization: ''
  },
  json: true
};

exports.token = options_token;

exports.profile = options_profile;

exports.loginInfo = function() {
  var url = googleEnv.uri_auth;

  var googlePar = {
    'response_type': googleEnv[config.env].response_type,
    'client_id': googleEnv[config.env].client_id,
    'redirect_uri': googleEnv[config.env].redirect_uri,
    'scope': googleEnv[config.env].scope
  };

  for ( var k in googlePar ) {
    url += k + '=' + googlePar[k] + '&';
  }
  url = url.slice(0, -1);

  return url;
}
