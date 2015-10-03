'use strict'

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var options = require('./google.options');
//var profile = require('./google.profile');

exports.googleStrategy = function() {
  return new GoogleStrategy(options.strategyOptions,
    function( accessToken, refreshToken, profile, done ) {
      // asynchronous verification, for effect...
      process.nextTick(function() {

        // To keep the example simple, the user's Google profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the Google account with a user record in your database,
        // and return that user instead.
        console.log('profile', profile);

        return done(null, profile);
      });
    }
  );
};

