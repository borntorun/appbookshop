'use strict'
/*jshint camelcase: false */
var User = require('../user/user.model');
var Q = require('q');

function findUser( search, callback ) {
  User.findOne({email: search.email, active: true})
    .exec(callback);
}
function addUser( user, callback ) {
  var newuser = new User(user);
  newuser.save(callback);
}
exports.getUser = function( user ) {
  var defer = Q.defer();
  findUser({email: user.email, active: true}, function( err, foundUser ) {
    if ( !err && foundUser ) {

      defer.resolve(foundUser);
    }
    else {

      defer.reject(false);
    }
  });

  return defer.promise;
};

exports.authenticate = function( googleProfile ) {
  var defer = Q.defer();

  findUser({email: googleProfile.emails[0].value, active: true}, function( err, foundUser ) {

    if ( !err && foundUser ) {

      if ( !foundUser.googleId ) {
        if ( googleProfile.refreshToken ) {
          foundUser.refreshToken = googleProfile.refreshToken;
        }
        foundUser.googleId = googleProfile.id;
      }
      foundUser.accessToken = googleProfile.accessToken;
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

exports.addProfile = function( googleProfile ) {
  var defer = Q.defer();

  findUser({email: googleProfile.emails[0].value}, function( err, foundUser ) {
    if ( err ) {
      defer.reject(err);
    }
    else {
      if ( foundUser ) {
        defer.resolve(foundUser);
      }
      else {//new user profile save it
        addUser({email: googleProfile.emails[0].value, active: true, name: 'new'}, function( err, newUser ) {
          if(err) {
            defer.reject(err);
          } else {
            defer.resolve(newUser);
          }

        });
      }
    }
  });
  return defer.promise;
}
