'use strict';
var _ = require('lodash');
var q = require('q');
var util = require('../../util');
var requestP = require('request-promise');
var User = require('../user/user.model');

exports.callback = function( req, res ) {

  res.render('googleClose', function( err ) {
    if ( err ) {
      return res.status(500).json({ error: err.message })
    }

    q(createTokenJWT(req.query.code))
      .then(function( data ) {
        console.log('....>>>>>',data);
        res.render('googleClose', {'userdata': data});
      })

  });
};

function createTokenJWT( googleCode ) {
  var options = {
    uri: 'https://www.googleapis.com/oauth2/v3/token',
    method: 'POST',
    json: true,
    form: {
      'client_id': '552881844129-imd7v6hlrocg5efcebj6nku28nmoge5s.apps.googleusercontent.com',
      'redirect_uri': 'http://localhost:12999/auth/google/callback',
      'code': googleCode,
      'grant_type': 'authorization_code',
      'client_secret': '_7wcF_Dfq9Ou9BKBR6ptOVh_'
    }
  };

  return requestP(options)
    .then(function( data ) {
      /*jshint camelcase: false */
      var accessToken = data.access_token;

      return requestP({
        uri: 'https://www.googleapis.com/userinfo/v2/me',
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + accessToken
        },
        json: true
      })
        .then(function( data ) {
          console.log('userinfo=', data);
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

          var defer = q.defer();

          //find the user
          User.findOne({email: data.email})
            .exec(function( err, foundUser ) {
              console.log('----exec:', err, foundUser);
              if ( err ) {defer.reject(err);}
              if ( !foundUser ) {defer.reject(new Error('User not found'));}

              foundUser.googleId = data.id;
              var name = (data.given_name ? data.given_name : '') + ' ' + (data.family_name ? data.family_name : '');
              foundUser.name = name;
              foundUser.save(function( err ) {
                console.log('----save:', err);
                if ( err ) {defer.reject(err);}

                //create tokenjwt
                defer.resolve({
                  name: name,
                  email: data.email,
                  tokenjwt: 'xxx'
                });
              });
            });

          return defer.promise;
        })
        .catch(function( err ) {
          console.log(err);
          return null;
        });

      //console.log(data);
    })
    .catch(function( err, data ) {
      console.log(err, data);
      return null;
    });
}
