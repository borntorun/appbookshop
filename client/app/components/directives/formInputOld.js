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
    .directive('forminputOld', forminput)
    /*.controller('forminputCtrl', forminputCtrl)*/;

  /*FUNCIONA*/


  /*
  * Private block
  *
   */

  var CONTENT = {
    text: '<div class="form-group on-focus jmmtc-forminput">' +
      '<label for="$name" class="sr-only">$label</label>' +
      '<ng-transclude></ng-transclude>' +
      '<!--pre>{{bookrecordForm.$name | json}}</pre -->' +
      //'<div class="tool-tip slideIn top">Tool Tip</div>' +
      '</div>'
  };


  function replaceContent( html, attrs ) {

    html = html
      .replace(/\$label/g, attrs.label || '')
      .replace(/\$name/g, attrs.name || attrs.id || '')
      .replace(/\$placeholder/g, attrs.placeholder || '');
    return html;
  }

  var linkingFunction = function( scope, element, attrs, form ) {
      var fieldHtml = element[0].querySelector('input ,textarea, select');


      if ( fieldHtml ) {
        fieldHtml.classList.add('form-control');
        fieldHtml.setAttribute('placeholder', attrs.placeholder || '');
        fieldHtml.setAttribute('aria-label', attrs.label || attrs.placeholder || '');
        /*if ( !fieldHtml.attributes.name) {
          fieldHtml.setAttribute('name', attrs.name || attrs.id || '');
        }*/
      }
  }

  /* @ngInject */
  /*function forminputCtrl( $scope ) {
  }*/

  /* @ngInject */
  function forminput() {
    /*
    * Public Interface
    */
    var directive = {
      restrict: 'ACE',

      require: '^form',
      //      scope: {
      //        //ngModel: '=?'
      //      },
      //      controller: 'forminputCtrl',
      //      controllerAs: 'model',
      transclude: true,
      replace: true,
      template: function( element, attrs ) {
        return replaceContent(CONTENT.text, attrs);
      },
      link: linkingFunction

    };
    return directive;
    ///////////////

  }
}());
