'use strict'

var options = require('./google.options');
var reqPromise = require('request-promise');
var profile = require('./google.profile');

exports.loginInfo = function() {
  return options.loginInfo();
}

exports.authenticate = function( googleCode ) {

  options.token.form.code = googleCode;

  //GET ACCESS TOKEN
  return reqPromise(options.token)
    .then(function( data ) {
      console.log(data);
      /*jshint camelcase: false */
      options.profile.headers.Authorization = 'Bearer ' + data.access_token;

      //GET PROFILE INFORMATION
      return reqPromise(options.profile)
        .then(function(data){
          return profile.getUser(data);
        })
        .catch(function( err, data ) {
          console.log(err, data);
          return null;
        });

    })
    .catch(function( err, data ) {
      console.log(err, data);
      return null;
    });
};


