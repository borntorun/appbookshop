'use strict'
/*jshint camelcase: false */
var Q = require('q');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var options = require('./google.options');
var googleProfile = require('./google.profile');
var reqPromise = require('request-promise');
var extend = require('util')._extend;


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
          profile.refreshToken = refreshToken;


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

exports.refresh = function(obj) {
  //obj is an object {user:...,error:...} data.user is a 'database model' not the req.user

  var defer = Q.defer();

  var opt = extend({},options.refreshTokenOptions);
  opt.form.refresh_token = obj.user.refreshToken

  reqPromise(opt)
    .then(function( data ) {
      if ( data ) {
        if ( data.error ) {
          defer.reject(false);
        }
        if ( data.access_token && data.expires_in && data.token_type === 'Bearer' ) {

          obj.user.accessToken = data.access_token;
          obj.user.save(function(err/*, savedUser*/){
            if (err) {
              defer.reject(false);
            } else {
              defer.resolve({expiresInSeconds: data.expires_in});
            }
          });
        }
      }
      else {
        defer.reject(false);
      }
    })
    .catch(function(err) {
      defer.reject(err);
    });

  return defer.promise;

}


exports.isValidToken = function( user ) {
  //user is a 'user database model' not the req.user
  var defer = Q.defer();

  var opt = extend({},options.validateTokenOptions);
  opt.uri = opt.uri + user.accessToken;

  reqPromise(opt)
    .then(function( data ) {
      if ( data ) {
        if ( data.error ) {
          defer.reject({user: user, error: data.error});
        }
        if ( data.issued_to && data.user_id && data.user_id === user.googleId ) {
          defer.resolve({expiresInSeconds: data.expires_in});
        }
      }
      else {
        defer.reject({user: user, error: 'no data'});
      }
    })
    .catch(function(err) {
      defer.reject({user: user, error: err});
    });
  return defer.promise;
}
