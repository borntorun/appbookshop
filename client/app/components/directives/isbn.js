/**
 * Directive warp.components isbn
 * (João Carvalho, 06-09-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Description: Apply validation to an input to accept an ISBN
*/
(function () {
  'use strict';
  angular
    .module('warp.components')
    .directive('isbn', isbn);

  /* @ngInject */
  function isbn(isbnIsvalid) {
    /*
    * Private Block for private vars
    */

    /*
    * Public Interface
    */
    var directive = {
      restrict: 'AC',
      require: 'ngModel',
      link: link
    };
    return directive;
    ///////////////
    //just put functions below this point

    /*
    * Private Block interface
    */
    function link(scope, element, attrs, controllers) {
      controllers.$validators.isbn = function(modelValue, viewValue) {
        if (controllers.$isEmpty(modelValue)) {
          return true;
        }
        return isbnIsvalid(viewValue);
      };
    }

  }
}());
