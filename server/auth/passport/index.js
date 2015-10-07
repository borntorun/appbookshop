'use strict'

var passport = require('passport');
var googleService = require('../google/google.service');
var googleProfile = require('../google/google.profile');

module.exports = function( app ) {
  app.use(passport.initialize());
  app.use(passport.session());
  // Passport session setup.
  //   To support persistent login sessions, Passport needs to be able to
  //   serialize users into and deserialize users out of the session.  Typically,
  //   this will be as simple as storing the user ID when serializing, and finding
  //   the user by ID when deserializing.  However, since this example does not
  //   have a database of user records, the complete Google profile is
  //   serialized and deserialized.
  passport.serializeUser(function( user, done ) {
    /*console.log('serializeUser:>>>\n', user);*/
    done(null, user);
  });

  passport.deserializeUser(function( user, done ) {
    /*console.log('deserializeUser:>>>\n', user);*/
    googleProfile
      .getUser(user)
      .then(googleService.isValidToken)
      .catch(googleService.refresh)
      .then(function(result) {
        //console.log('deserializeUser: result then>>>', result);
        done(null, user);
      })
      .catch(function(result){
        //console.log('deserializeUser: result catch>>>', result);
        done(null, null);
      });


  });

  passport.use(googleService.googleStrategy());

};
