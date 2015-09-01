/**
 * Directive appBookShop.components forminputTooltip
 * (João Carvalho, 27-08-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Descrição: Directive to config a tootip for use with an element
 */
(function() {
  'use strict';
  angular
    .module('appBookShop.components')
    .directive('forminputTooltip', forminputTooltip)
    /*.controller('forminputCtrl', forminputCtrl)*/;

  /*
  * Private block
  *
   */


  var linkingFunction = function($timeout) {
    return function( scope, element, attrs/*, form*/ ) {

      $timeout(function() {
        var parent, nameParent = attrs.forminputTooltipParent;
        if (nameParent) {
          parent = element.find(nameParent);
        } else {
          parent = element.parent();
        }
        if (parent && parent.append) {
          parent.append('<div class="tool-tip bottom">' + attrs.forminputTooltip + '</div>');
        }


      },50);

    };
  }

  /* @ngInject */
  /*function forminputTooltipCtrl( $scope ) {
  }*/

  /* @ngInject */
  function forminputTooltip($timeout) {
    /*
    * Public Interface
    */
    var directive = {
      priority: 1,
      restrict: 'AC',
      link: linkingFunction($timeout)

    };
    return directive;
    ///////////////

  }
}());
