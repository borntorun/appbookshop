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
  passport.serializeUser(function( req, user, done ) {
    //console.log('serializeUser:>>>\n', user);
    done(null, user);
  });

  passport.deserializeUser(function( req, user, done ) {

    //TODO: better solution?
    //console.log(req.url);
    var needToVerifyToken = (req.url.indexOf('/admin/') > -1 || req.url.indexOf('/auth/') > -1);

    if ( needToVerifyToken ) {
      //console.log('deserializeUser needToVerifyToken:>>>\n', user);
      googleProfile
        .getUser(user)
        .then(googleService.isValidToken)
        .catch(googleService.refresh)
        .then(function( result ) {
          //console.log('deserializeUser: result then>>>', result);
          user.expires = result.expiresInSeconds;
          done(null, user);
        })
        .catch(function( result ) {
          //console.log('deserializeUser: result catch>>>', result);
          done(null, null);
        });
    }
    else {
      //console.log('deserializeUser:>>>\n', user);
      done(null, user);
    }

  });

  passport.use(googleService.googleStrategy());

};
