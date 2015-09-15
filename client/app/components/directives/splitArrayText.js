/**
 * Directive appBookShop.components splitArrayText
 * (João Carvalho, 14-09-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Descrição: Manipulate array of strings to be displayed on textarea by split/join by newline
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
    function link(scope, element, attrs, ctrl) {
      var charSplit = element.attr('split-array-text');

      function toArray(value) {
        return value.split(charSplit);
      }

      function toText(value) {
        return value.join(charSplit);
      }

      //ngModel
      ctrl.$parsers.push(toArray);
      ctrl.$formatters.push(toText);
    }

  }
}());
