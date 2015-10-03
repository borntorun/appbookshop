'use strict';
//var _ = require('lodash');
var Q = require('q');
//var util = require('../../util');
//var reqPromise = require('request-promise');
//var User = require('../user/user.model');

var googleService = require('./google.service');

exports.loginInfo = function(req, res) {
  return res.redirect(googleService.loginInfo());
}

exports.callback = function( req, res ) {

  //res.render('googleClose', function( err, html ) {

    if ( req.query.error) {
      return res.render('googleClose', {'data': { error: req.query.error}});
    }

    /*jshint newcap: false */
    //Q(createTokenJWT(req.query.code))
    if (req.query.code) {
      Q(googleService.authenticate(req.query.code))
        .then(function( data ) {
          console.log('final>>>>', data);
          return res.render('googleClose', {'data': data});
        });
    } else {
      res.render('googleClose', {'data': {error: 'no code returned'}});
    }


  //});
};

//function createTokenJWT( googleCode ) {
//  var options = {
//    uri: 'https://www.googleapis.com/oauth2/v3/token',
//    method: 'POST',
//    json: true,
//    form: {
//      'client_id': '552881844129-imd7v6hlrocg5efcebj6nku28nmoge5s.apps.googleusercontent.com',
//      'redirect_uri': 'http://localhost:12999/auth/google/callback',
//      'code': googleCode,
//      'grant_type': 'authorization_code',
//      'client_secret': '_7wcF_Dfq9Ou9BKBR6ptOVh_'
//    }
//  };
//
//  return reqPromise(options)
//
//    .then(function( data ) {
//      /*jshint camelcase: false */
//      var accessToken = data.access_token;
//
//      return reqPromise({
//        uri: 'https://www.googleapis.com/userinfo/v2/me',
//        method: 'GET',
//        headers: {
//          Authorization: 'Bearer ' + accessToken
//        },
//        json: true
//      })
//        .then(function( data ) {
//
//
//          //console.log('userinfo=', data);
//          /*{ id: '105559687517795015696',
//            email: 'jmmtcarvalho@gmail.com',
//            verified_email: true,
//            name: 'João Carvalho',
//            given_name: 'João',
//            family_name: 'Carvalho',
//            link: 'https://plus.google.com/105559687517795015696',
//            picture: 'https://lh6.googleusercontent.com/-GIEnDENgk5M/AAAAAAAAAAI/AAAAAAAAAGM/VsIQ7p8Gwyk/photo.jpg',
//            gender: 'male',
//            locale: 'en-GB' }*/
//
//          var defer = Q.defer();
//
//          //find the user
//          User.findOne({email: data.email})
//            .exec(function( err, foundUser ) {
//
//              console.log('3----------->>>>>>>>');
//
//              //console.log('----exec:', err, foundUser);
//              if ( err ) {
//                defer.reject(err);
//              }
//              if ( !foundUser ) {
//                defer.reject(new Error('User not found'));
//              }
//
//              foundUser.googleId = data.id;
//              var name = (data.given_name ? data.given_name : '') + ' ' + (data.family_name ? data.family_name : '');
//              foundUser.name = name;
//              foundUser.save(function( err ) {
//                //console.log('----save:', err);
//                if ( err ) {
//                  defer.reject(err);
//                }
//
//                //create tokenjwt
//                defer.resolve({
//                  name: name,
//                  email: data.email,
//                  tokenjwt: 'xxx'
//                });
//              });
//            });
//
//          return defer.promise;
//        })
//        .catch(function( err ) {
//          console.log(err);
//          return null;
//        });
//
//    })
//    .catch(function( err, data ) {
//      console.log(err, data);
//      return null;
//    });
//
//}
