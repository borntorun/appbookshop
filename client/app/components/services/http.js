/**
 * Service warp.components httpRequest
 * (João Carvalho, 07-09-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Description: Enable a http ajax request with $http
 */
(function() {
  'use strict';
  angular
    .module('warp.components')
    .factory('httpRequest', httpRequest);

  /* @ngInject */
  function httpRequest( $http, Q, err ) {
    /*
    * Private Block
    */
    var defaultOptions = {
      cache: true,
      noError: false,
      intercept: true
    };
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

    function call( options ) {
      //wtf? delete options.method;
      return $http(options)
        .then(response)
        .catch(throwError);
    }

    function post( options ) {
      return call(angular.extend({}, defaultOptions, options || {}, {method: 'POST'}));
    }

    function get( options ) {
      return call(angular.extend({}, defaultOptions, options || {}, {method: 'GET'}));
    }

    function response( response ) {
      return response;
    }
    function throwError( response ) {
      //this one is the last handler for rejection
      //and will catch a error (if any) or a reject promise (Q.reject) from previous httpinterceptors

      //console.log('http', response);
//      if(response.status==0) {
//        response.statusText = 'Network Error (received response empty)';
//      }
//      if(config.emitSignalsOnError === true){
//        var signal = 'http' + response.status;
//        SignalsService[signal] && (SignalsService[signal].emit());
//      }
      if ( response.config.noError !== true) {
        throw err(response.statusText, response);
      }
      return Q.reject(response);
    }
  }
}());

