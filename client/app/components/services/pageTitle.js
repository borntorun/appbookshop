/**
 * Service warp.components pageTitle
 * (João Carvalho, 11-12-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Descrição: Set/Get Page Title using $title from angular-ui-router-title
 */
(function() {
  'use strict';
  angular
    .module('warp.components')
    .factory('pageTitle', pageTitle);

  /* @ngInject */
  function pageTitle( $rootScope ) {
    /*
    * Private Block
    */

    /*
    * Public Interface
    */
    function service( value, obj, args ) {
      if ( !value ) {
        return $rootScope.$title;
      }

      var f = angular.isFunction(value) ?
        function() {
          return value.apply(obj || null, args);
        }
        :
        function() {
          return value;
        };

      $rootScope.safeApply(function(){
        $rootScope.$title = f();
      });

     /* if ( $rootScope.$$phase == null ) {
        $rootScope.$apply(function() {
          $rootScope.$title = f();
        });
      }
      else {
        $rootScope.$title = f();
      }*/

    }

    return service;
    ///////////////
    //just put functions below this point

  }
}());
