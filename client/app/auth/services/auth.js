/**
 * Service appBookShop.auth auth
 * (João Carvalho, 19-09-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Description: Authentication Service
 */
(function() {
  'use strict';
  angular
    .module('appBookShop.auth')
    .factory('auth', auth);

  /* @ngInject */
  function auth( $window, Q, httpRequest ) {
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

      var options = 'top=0,left=0';
      //console.log(url);

      console.log('vai abrir');
      $window.open('/auth/google/authenticate', '', options);

      $window.addEventListener('message', function( event ) {
        console.log(event);



        if ( event.origin !== 'http://local.host:12999' || event.data.error ) {
          console.log('erro 1');
          defer.reject(new Error('Erro 1!'));
        }
        else {
          if ( event.data.email && event.data.name && event.data.tokenjwt ) {
            //$state.go('main.search');
            defer.resolve(event.data);
          }
          else {
            console.log('erro 2');
            defer.reject(new Error('Erro 2!'));
          }
        }
      });

      return defer.promise;
    }
  }
}());
