'use strict'

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var options = require('./google.options');
var googleProfile = require('./google.profile');

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
          var user = googleProfile.getUser(profile)
            .then(function(data){
              console.log('googleStrategy then data=', data);
              done(null, data);
            })
            .catch(function(err){
              console.log('googleStrategy catch/promise');
              return returnErrRedirect(err);
//              done(err);
            })
        }
        catch(err) {
//          done(err);
          console.log('googleStrategy try/catch');
          return returnErrRedirect(err);
        }


        function returnErrRedirect(err) {
          console.log('googleStrategy returnErrRedirect=', err);
          return req.res.redirect('/auth/google/fail');
        }

        //return done(null, user);
      });
    }
  );
};

