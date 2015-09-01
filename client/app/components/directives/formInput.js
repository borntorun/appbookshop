/**
 * Directive appBookShop.components forminput
 * (João Carvalho, 27-08-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Descrição: Directive to config an form group element
 */
(function() {
  'use strict';
  angular
    .module('appBookShop.components')
    .directive('forminput', forminput)
    /*.controller('forminputCtrl', forminputCtrl)*/;

  /*
  * Private block
  *
   */

  var CONTENT = {
    text: '<div class="form-group jmmtc-forminput">' +
      '<label for="$name" class="sr-only"></label>' +
      '<div class="input-group">' +
//      '<span id="$name" class="input-group-addon"></span>' +
      '</div>' +
      '</div>'
  };

  function getAttrValue (obj) {
    return (obj? obj.value || '': '');
  }

  var linkingFunction = function( $compile ) {

  //var linkingFunction = /*function( transclude ) {*/
    return function( scope, element, attrs , ctrls, transclude) {
      //console.log(element[0].outerHTML, attrs);

      transclude(scope, function(dom){
//        console.log(dom);
//        console.log(element[0].outerHTML);
        var name = getAttrValue(dom[0].attributes.name);
        var label = getAttrValue(dom[0].attributes.label);
        var placeholder = getAttrValue(dom[0].attributes.placeholder);

        var elInput = dom[0].localName === 'input' || dom[0].localName === 'textarea'? dom: dom.find('input');

        if (elInput) {
          elInput[0].classList.add('form-control');
          elInput[0].setAttribute('aria-label', label);
        }

//        console.log(dom);



        /*var span = element[0].querySelector('span');
        if (span) {
          span.setAttribute('id', name);
          span.innerText = label;
        }*/

        /*var label = element[0].querySelector('label');
        if (label){
          label.setAttribute('for', name);
          label.innerText = placeholder;
        }*/



//        console.log(element[0].outerHTML);

        element.find('div').append(dom);
      });
    };
  }

  /* @ngInject */
  /*function forminputCtrl( $scope ) {
  }*/

  /* @ngInject */
  function forminput($compile) {
    /*
    * Public Interface
    */
    var directive = {
      restrict: 'E',
      transclude: true,
      replace: true,
      template: function( element, attrs ) {
        return CONTENT.text;
      },
      //link: linkingFunction
      link: linkingFunction($compile)

      /*compile: function(element, attrs, transclude) {
        return linkingFunction(transclude);
      }*/
    };
    return directive;
    ///////////////

  }
}());
