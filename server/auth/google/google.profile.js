'use strict'
/*jshint camelcase: false */
var User = require('../user/user.model');
var Q = require('q');

function findUser( search, callback ) {
  User.findOne({email: search.email, active: true})
    .exec(callback);
}

exports.getUser = function( user ) {
  var defer = Q.defer();

  findUser({email: user.email, active: true}, function( err, foundUser ) {
    if ( !err && foundUser ) {
      console.log('getUser >>>>>>', foundUser);
      defer.resolve(foundUser);
    }
    else {
      console.log('getUser >>>>>>', false);
      defer.reject(false);
    }
  });

  return defer.promise;
};

exports.authenticate = function( googleProfile ) {

  var defer = Q.defer();

  findUser({email: googleProfile.email, active: true}, function( err, foundUser ) {

    if ( !err && foundUser ) {

      foundUser.accessToken = googleProfile.accessToken;
      foundUser.googleId = googleProfile.id;
      foundUser.name = googleProfile.displayName
      foundUser.photo = googleProfile.photos[0].value

      foundUser.save(function( err, user ) {
        if ( err ) {
          defer.reject(err);
        }
        else {

          defer.resolve({
            name: user.name,
            email: user.email,
            photo: user.photo
          });
        }

      });
    }
    else {
      defer.reject(err || new Error('User not found'));
    }
  });

  return defer.promise;

}
