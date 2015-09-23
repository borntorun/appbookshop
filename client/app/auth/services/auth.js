/**
 * Service appBookShop.auth auth
 * (João Carvalho, 19-09-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Descrição: Authentication Service
 */
(function() {
  'use strict';
  angular
    .module('appBookShop.auth')
    .factory('auth', auth);

  /* @ngInject */
  function auth( exception, notifier, $window, Q,$state ) {
    /*
    * Private Block
    */

    /*
    * Public Interface
    */
    var service = {
      loginWithGoogle: googleAuth
    };
    return service;
    ///////////////
    //just put functions below this point
    /*
    * Private Block Interface
    */
    function googleAuth() {
      var defer = Q.defer();

      var url = 'https://accounts.google.com/o/oauth2/auth?';

      var googlePar = {
        'response_type': 'code',
        'client_id': '552881844129-imd7v6hlrocg5efcebj6nku28nmoge5s.apps.googleusercontent.com',
        'redirect_uri': 'http://localhost:12999/auth/google/callback',//$window.location.origin,//
        'scope': 'profile email'
      };

      for ( var k in googlePar ) {
        url += k + '=' + googlePar[k] + '&';
      }
      url = url.slice(0, -1);

      var options = 'top=0,left=0';
      //console.log(url);

      $window.open(url, '', options);

      $window.addEventListener('message', function(event){
        console.log(event);
        //if (event.origin === $window.location.origin && event.data==='reload'){
        if (event.origin === 'http://localhost:12999' &&
          event.data.email &&
          event.data.name &&
          event.data.tokenjwt){
          //$state.go('main.search');

          if (event.data) {
            defer.resolve(event.data);
          }
          else {
            defer.reject(new Error('Erro!'));
          }
        }
      });

      return defer.promise;
    }
  }
}());
