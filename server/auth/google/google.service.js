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

        console.log('\n\naccesToken=', accessToken);
        console.log('\n\nrefreshToken=', refreshToken);
        console.log('\n\nprofile=', profile);

        //pass in the object/user to store in session
        //to represent the logged-in user

        try {

          profile.accessToken = accessToken;

          googleProfile.authenticate(profile)
            .then(function( user ) {
              //user object returned
              console.log('googleStrategy then data=', user);
              done(null, user);
            })
            .catch(function( err ) {
              console.log('googleStrategy catch/promise');
              return returnErrRedirect(err);
              //              done(err);
            })
        }
        catch( err ) {
          //          done(err);
          console.log('googleStrategy try/catch');
          return returnErrRedirect(err);
        }

        function returnErrRedirect( err ) {
          console.log('googleStrategy returnErrRedirect=', err);
          return req.res.redirect('/auth/google/fail');
        }

        //return done(null, user);
      });
    }
  );
};

exports.isValidToken = function( user ) {
  var defer = Q.defer();

  console.log('isValidToken user=====>', user)

  reqPromise({uri: options.uris.validateToken + user.accessToken, method: 'GET'})
    .then(function( data ) {
      if ( data ) {
        data = JSON.parse(data);
        console.log(data);
        console.log(data.issued_to, data.user_id, data.user_id === user.googleId);
        if ( data.error ) {
          console.log('isValidToken data.error-->', false);
          defer.reject(false);
        }
        if ( data.issued_to && data.user_id && data.user_id === user.googleId ) {
          console.log('isValidToken-->', true);
          defer.resolve(true);
        }
      }
      else {
        console.log('isValidToken no data-->');
        defer.reject(false);
      }
    })
    .catch(function() {
      console.log('isValidToken catch -->', false);
      defer.reject(false);
    });

  return defer.promise;
}
