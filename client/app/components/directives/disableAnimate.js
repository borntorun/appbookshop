/**
* Directive warp.components disableAnimation
* (João Carvalho, 30-10-2015)
* Criado com base em angular design style de John Papa
* (https://github.com/johnpapa/angular-styleguide)
*
* Description: Allows disable disableNgAnimate on an element
* https://github.com/angular-ui/bootstrap/issues/1350
* Dependencies:
*/

(function () {
  'use strict';
  /*jshint validthis: true */
  angular
    .module('warp.components')
    .directive('disableAnimation', disableAnimation);


  /* @ngInject */
  function disableAnimation($animate) {
    /*
    * Private Block for private vars
    */

    /*
    * Public Interface
    */
    var directive = {
      restrict: 'A',
      link: link
    };
    return directive;
    ///////////////
    //just put functions below this point

    /*
    * Private Block interface
    */
    function link(scope, element, attrs, ctrl) {
      attrs.$observe('disableAnimation', function(value){
        $animate.enabled(element, !value);
      });
    }

  }
}());
