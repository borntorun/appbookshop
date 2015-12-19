/**
 * Directive warp.components windowScroll
 * (João Carvalho, 30-10-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Description: Allows scroll window by an amount
 *
 */

(function() {
  'use strict';
  /*jshint validthis: true */
  angular
    .module('warp.components')
    .directive('windowScroll', windowScroll);

  /* @ngInject */
  function windowScroll( $window, $timeout ) {
    /*
    * Private Block for private vars
    */

    /*
    * Public Interface
    */
    var directive = {
      restrict: 'EAC',
      link: link
    };
    return directive;
    ///////////////
    //just put functions below this point

    /*
    * Private Block interface
    */

    function link( scope, element, attrs, ctrl ) {

      if (attrs.windowScrollTop) {
        $timeout(function() {
          $window.scrollTo(0,0);
        });
        return;
      }

      var eventName = attrs.windowScrollEvent;
      var timeoutValue = attrs.windowScrollTimeout || '0';

      if ( !eventName || (timeoutValue && isNaN(parseInt(timeoutValue))) ) {
        return;
      }

      var onWindowScroll = scope.$on(eventName, function( event, value ) {
        if ( typeof value !== 'object' || value == null ) {
          return;
        }
        $timeout(function() {
          $window.scrollBy(value.windowScrollX || 0, value.windowScrollY || 0);
        }, parseInt(timeoutValue));
      });

      scope.$on('$destroy', function() {
        onWindowScroll();
      });

    }

  }
}());
