'use strict'

var passport = require('passport');
var googleService = require('../google/google.service');

module.exports = function(app) {
  app.use(passport.initialize());
  app.use(passport.session());
  // Passport session setup.
  //   To support persistent login sessions, Passport needs to be able to
  //   serialize users into and deserialize users out of the session.  Typically,
  //   this will be as simple as storing the user ID when serializing, and finding
  //   the user by ID when deserializing.  However, since this example does not
  //   have a database of user records, the complete Google profile is
  //   serialized and deserialized.
  passport.serializeUser(function(user, done) {
    console.log('serializeUser:>>>\n', user);
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    console.log('deserializeUser:>>>\n', obj);
    done(null, obj);
  });

  passport.use(googleService.googleStrategy());

};
