/**
 * Service appBookShop.components httpRequest
 * (João Carvalho, 07-09-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Descrição: Enable a http ajax request with $http
 */
(function() {
  'use strict';
  angular
    .module('appBookShop.components')
    .factory('httpRequest', httpRequest);

  /* @ngInject */
  function httpRequest( $http, err ) {
    /*
    * Private Block
    */
    var privateVar = {};

    /*
    * Public Interface
    */
    var service = {
      get: get
    };
    return service;
    ///////////////
    //just put functions below this point
    /*
    * Private Block Interface
    */
    function get( options ) {

      var promise = $http({
        method: 'GET',
        url: options.url,
        cache: options.cache || true
      })
        .then(function( response ) {
          return response.data;
        })
        .catch(function( response ) {
          throw err(response.statusText, response);
        });

      return promise;

    }
  }
}());

