'use strict'
/*jshint camelcase: false */
var Q = require('q');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var options = require('./google.options');
var googleProfile = require('./google.profile');
var reqPromise = require('request-promise');

exports.googleStrategy = function() {
  return new GoogleStrategy(options.strategyOptions,
    function( req, accessToken, refreshToken, profile, done ) {
      // asynchronous verification, for effect...
      process.nextTick(function() {

        // To keep the example simple, the user's Google profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the Google account with a user record in your database,
        // and return that user instead.

//        console.log('\n\naccesToken=', accessToken);
//        console.log('\n\nrefreshToken=', refreshToken);
//        console.log('\n\nprofile=', profile);

        //pass in the object/user to store in session
        //to represent the logged-in user

        try {

          profile.accessToken = accessToken;

          googleProfile.authenticate(profile)
            .then(function( user ) {
              //user object returned

              done(null, user);
            })
            .catch(function( err ) {

              return returnErrRedirect(err);

            })
        }
        catch( err ) {

          return returnErrRedirect(err);
        }

        function returnErrRedirect( err ) {
          console.log(err);
          return req.res.redirect('/auth/google/fail');
        }

      });
    }
  );
};

exports.isValidToken = function( user ) {
  var defer = Q.defer();

  reqPromise({uri: options.uris.validateToken + user.accessToken, method: 'GET'})
    .then(function( data ) {
      if ( data ) {
        data = JSON.parse(data);

        if ( data.error ) {

          defer.reject(false);
        }
        if ( data.issued_to && data.user_id && data.user_id === user.googleId ) {

          defer.resolve(true);
        }
      }
      else {

        defer.reject(false);
      }
    })
    .catch(function() {

      defer.reject(false);
    });

  return defer.promise;
}
