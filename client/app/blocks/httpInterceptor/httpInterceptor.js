/**
 * Service blocks.httpInterceptor httpInterceptor
 * (João Carvalho, 08-12-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Descrição: Intercepts http calls & responses
 */
(function() {
  'use strict';
  /*jshint validthis: true */
  angular
    .module('blocks.httpInterceptor')
    .factory('httpErrStatusInterceptor', httpErrStatusInterceptor)
    .factory('httpErrEmptyResponseInterceptor', httpErrEmptyResponseInterceptor);




  /* @ngInject */
  function httpErrStatusInterceptor( Q, SignalsService ) {


    /*
    * Public Interface
    */

    var service = {
      responseError: responseError
    };
    return service;

    ///////////////
    //just put functions below this point
    /*
    * Private Block Interface
    */

    function responseError( response ) {

      if ( response.config.intercept === true ) {

        //console.log('httpErrStatusInterceptor', response);

        var key = '$http' + response.status;
        var nokey = '$nohttp' + response.status;

        if ( response.config[key] && response.config[key].fn ) {
          //call function quem definir $<status>
          angular.bind(null, response.config[key].fn, response.config[key].data);
        }

        //emit excepto quem definir $no<status>
        if ( SignalsService[key] && !response.config[nokey] ) {
          SignalsService[key].emit();
        }
      }
      return Q.reject(response);

    }
  }

  /* @ngInject */
  function httpErrEmptyResponseInterceptor( Q, err ) {
    /*
    * Public Interface
    */
    var service = {
      responseError: responseError
    };
    return service;
    ///////////////
    //just put functions below this point
    /*
    * Private Block Interface
    */
    function responseError( response ) {
      if ( response.config.intercept === true ) {
        //console.log('httpErrEmptyResponseInterceptor', response);
        if ( response.status === -1 ) {
          response.statusText = 'Network Error (received empty response)';
        }
      }
      return Q.reject(response);
    }
  }

}());

