'use strict'

var passport = require('passport');

exports.callback = function() {
  console.log('no google callback');
  return passport.authenticate('google', {
    successRedirect: '/',
    failure: '/error/'
  });
};

/*exports.authenticate = function() {
  console.log('no google authenticate');
  return passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  })();
};*/

exports.authenticate = passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ]
});
