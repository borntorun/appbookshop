/**
 * Service warp.components err
 * (João Carvalho, 07-09-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Description: A Custom Error object
 */
(function() {
  'use strict';

  angular
    .module('warp.components')
    .factory('err', err);

  /* @ngInject */
  function err() {
    return function( message, cause ) {
      function CustomError() {
        this.message = message;
        if ( cause.constructor.name === 'Error' ) {
          this.cause = {};
          this.cause.message = cause.message;
          this.cause.stack = cause.stack;
        }
        else {
          this.cause = cause;
        }
        this.stack = (new Error()).stack;
      }

      CustomError.prototype = new Error();
      return new CustomError();
    };
  }
}());
