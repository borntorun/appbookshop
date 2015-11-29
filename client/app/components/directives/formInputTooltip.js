/**
 * Directive warp.components forminputTooltip
 * (João Carvalho, 27-08-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Description: Directive to config a tootip for use with an element
 */
(function() {
  'use strict';
  angular
    .module('warp.components')
    .directive('forminputTooltip', forminputTooltip);

  /* @ngInject */
  function forminputTooltip( $timeout ) {
    /*
    * Public Interface
    */
    var directive = {
      restrict: 'AC',
      link: linkingFunction($timeout)

    };
    return directive;
    ///////////////

  }
  function linkingFunction ( $timeout ) {
    return function( scope, element, attrs/*, form*/ ) {

      //reason to use a timeout: because some elements are included async (like angtypeaheadjs )so
      //this directive must run after (priority may not work)
      $timeout(function() {
        var parent, nameParent = attrs.forminputTooltipParent;
        if ( nameParent ) {
          parent = element.find(nameParent);
        }
        else {
          parent = element.parent();
        }
        if ( parent && parent.append ) {
          parent.append('<div class="tool-tip bottom">' + attrs.forminputTooltip + '</div>');
        }
      }, 50);
    };
  }
}());
