/**
 * Directive appBookShop.components splitArrayText
 * (João Carvalho, 14-09-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Descrição: Manipulate array of strings to bw displayed on textarea
*/
(function () {
  'use strict';
  angular
    .module('appBookShop.components')
    .directive('splitArrayText', splitArrayText);

  /* @ngInject */
  function splitArrayText() {
    /*
    * Private Block for private vars
    */

    /*
    * Public Interface
    */
    var directive = {
      restrict: 'AEC',
      require: 'ngModel',
      link: link
    };
    return directive;
    ///////////////
    //just put functions below this point

    /*
    * Private Block interface
    */
    function link(scope, element, attrs, ctrl) {
      function toText(value) {
        return value.split('\n');
      }

      function toArray(text) {
        return text.join('\n');
      }

      //ngModel
      ctrl.$parsers.push(toText);
      ctrl.$formatters.push(toArray);
    }

  }
}());
