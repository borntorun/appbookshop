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

    /*
    * Public Interface
    */
    var service = {
      get: get,
      post: post

    };
    return service;
    ///////////////
    //just put functions below this point
    /*
    * Private Block Interface
    */

    function call( defaultOptions, options, thenCallback, catchCallback ) {
      delete options.method;
      options = angular.extend(angular.copy(defaultOptions), options || {});
      return $http(options)
        .then(thenCallback)
        .catch(catchCallback);
    }

    function post( options ) {

      var defaultOptions = {
        method: 'POST',
        cache: true
      };

      return call(defaultOptions, options, response, throwError);

    }

    function get( options ) {

      var defaultOptions = {
        method: 'GET',
        cache: true
      };

      return call(defaultOptions, options, response, throwError);

    }

    function response( response ) {
      return response.data;
    }

    function throwError( response ) {
      throw err(response.statusText, response);
    }
  }
}());

