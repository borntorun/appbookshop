/**
 * Directive appBookShop.components windowScroll
 * (João Carvalho, 30-10-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Description: Allows scroll window by an amount
 *
 */

(function () {
  'use strict';
  /*jshint validthis: true */
  angular
    .module('appBookShop.components')
    .directive('windowScroll', windowScroll);



  /* @ngInject */
  function windowScroll($window, $timeout) {
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
      var timeoutValue = attrs.windowScroll || '0';

      if (timeoutValue && isNaN(parseInt(timeoutValue))) {
        return;
      }


      var onWindowScroll = scope.$on('windowScrollY', function(event, value){
        if (typeof value !== 'number') {return;}
        $timeout(function(){
          $window.scrollBy(0, value);
        }, parseInt(timeoutValue));
      });

      scope.$on('$destroy', function(){
        onWindowScroll();
      });


    }

  }
}());
