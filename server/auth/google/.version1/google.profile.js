'use strict'
var User = require('../user/user.model');
var Q = require('q');

exports.getUser = function( data ) {
  //console.log('userinfo=', data);
  /*{ id: '105559687517795015696',
    email: 'jmmtcarvalho@gmail.com',
    verified_email: true,
    name: 'João Carvalho',
    given_name: 'João',
    family_name: 'Carvalho',
    link: 'https://plus.google.com/105559687517795015696',
    picture: 'https://lh6.googleusercontent.com/-GIEnDENgk5M/AAAAAAAAAAI/AAAAAAAAAGM/VsIQ7p8Gwyk/photo.jpg',
    gender: 'male',
    locale: 'en-GB' }*/
  var defer = Q.defer();

  User.findOne({email: data.email})
    .exec(function( err, foundUser ) {

      console.log('3----------->>>>>>>>');

      //console.log('----exec:', err, foundUser);
      if ( err ) {
        defer.reject(err);
      }
      if ( !foundUser ) {
        defer.reject(new Error('User not found'));
      }

      foundUser.googleId = data.id;

      /*jshint camelcase: false */
      foundUser.name = (data.given_name ? data.given_name : '') + ' ' + (data.family_name ? data.family_name : '');

      foundUser.save(function( err, theUser ) {
        //console.log('----save:', err);
        if ( err ) {
          defer.reject(err);
        }

        //create tokenjwt
        defer.resolve({
          name: theUser.name,
          email: theUser.email,
          tokenjwt: 'xxx'
        });
      });
    });

  return defer.promise;

}
