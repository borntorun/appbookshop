/**
 * Service appBookShop.auth authorization
 * (João Carvalho, 01-12-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Descrição:
 */
(function() {
  'use strict';
  angular
    .module('appBookShop.auth')
    .factory('authorization', authorization);

  /* @ngInject */
  function authorization( Q, authentication ) {
    /*
    * Private Block
    */

    /*
    * Public Interface
    */
    var service = {
      authorize: authorize
    };
    return service;
    ///////////////
    //just put functions below this point
    /*
    * Private Block Interface
    */
    function authorize( config, fromState ) {
      var result = null;

      if ( config && config.requires && config.requires.login === true ) {
        if ( !authentication.isAuthenticated() ) {
          result = {};

          var toState = config.requires.redirectTo;
          var params;

          if ( !toState && fromState.name !== 'logout' ) {
            toState = 'message';
            params = {term: 'Não tem sessão iniciada!<br/>A redireccionar para o início...'};
          }
          result.to = {
            state: toState || 'main.search',
            params: params
          };
        }
      }
      return result;

    }
  }
}());
