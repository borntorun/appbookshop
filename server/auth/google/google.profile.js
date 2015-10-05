'use strict'
/*jshint camelcase: false */
var User = require('../user/user.model');
var Q = require('q');

exports.getUser = function( data ) {

  var defer = Q.defer();

  User.findOne({email: data.email, active: true})
    .exec(function( err, foundUser ) {

      if ( !err && foundUser ) {

        foundUser.googleId = data.id;
        foundUser.name = data.displayName
        foundUser.photo = data.photos[0].value

        foundUser.save(function( err, data ) {
          if ( err ) {
            defer.reject(err);
          } else {

            defer.resolve({
              name: data.name,
              email: data.email,
              photo: data.photo
            });
          }

        });
      } else {
        defer.reject(err || new Error('User not found'));
      }
    });

  return defer.promise;

}
