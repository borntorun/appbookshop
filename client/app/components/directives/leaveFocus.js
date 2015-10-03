/**
 * Directive appBookShop.components leaveFocus
 * (João Carvalho, 02-09-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Description: Directive to cancel hover state on button after click
 */
(function() {
  'use strict';
  angular
    .module('appBookShop.components')
    .directive('leaveFocus', leaveFocus)
    /*.controller('leaveFocusCtrl', leaveFocusCtrl)*/;

  /*function leaveFocusCtrl( *//*$scope*//*) {
    *//*jshint validthis: true *//*
    //var model = this;

  }*/

  /* @ngInject */
  function leaveFocus() {
    /*
    * Private Block
    */

    function link( scope, element/*, attrs, ctrl */) {
      //element must be a form
      if ( element[0].tagName !== 'BUTTON' ) {
        return;
      }
      element.on('mouseup', function( e ) {
        this.blur();
        return true;
      });
    }

    /*
    * Public Interface
    */
    var directive = {
      restrict: 'AC',
      //controller: 'leaveFocusCtrl',
      //controllerAs: 'model',
      link: link
    };
    return directive;
    ///////////////

  }
}());
