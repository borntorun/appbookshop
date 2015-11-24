/**
 * Directive appBookShop.components enterAsTab
 * (João Carvalho, 02-09-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Description: Directive to make input text elements have Enter key to behave as Tab key
 */
(function() {
  'use strict';
  /*jshint validthis: true */
  angular
    .module('appBookShop.components')
    .directive('enterAsTab', enterAsTab)
    .controller('enterAsTabCtrl', enterAsTabCtrl);

  /* @ngInject */
  function enterAsTab() {

    /*
    * Public Interface
    */
    var directive = {
      restrict: 'AC',
      controller: 'enterAsTabCtrl',
      controllerAs: '_enterAsTab',
      link: link
    };
    return directive;
    ///////////////

  }
  function enterAsTabCtrl( $scope, mutationObserver ) {
    var model = this;
    var observer;

    model.allTabindex = [];

    model.setMutationObserver = function() {
      observer = mutationObserver.apply(
        model.observableElement,
        model.observableConfig,
        model.observableCallback
      );
    };
    model.setDestroyMutationObserver = function() {
      if ( observer ) {
        $scope.$on('$destroy', function() {
          mutationObserver.disconnect(observer);
        });
      }
    };

  }
  function link( scope, element, attrs/*, ctrl*/ ) {
    //element must be a form
    if ( element[0].tagName !== 'FORM' ) {
      return;
    }

    var ctrl = scope._enterAsTab;

    ctrl.observableElement = element[0];
    ctrl.observableConfig = { attributes: true, childList: true, subtree: true, attributeFilter: ['tabindex', 'visible', 'disabled'] };
    ctrl.observableCallback = function( /*mutation*/ ) {
      findAllItemsWithTabindex();
    };

    function findAllItemsWithTabindex() {
      var allTabindex = element.find('input[tabindex], textarea[tabindex], select[tabindex], a[tabindex], button[tabindex], i[tabindex]')
        .filter(':not([tabindex="-1"])')
        .filter(':visible')
        .filter(':not([disabled])');
      allTabindex.sort(function( first, second ) {
        var one = parseInt(first.getAttribute('tabindex')),
          two = parseInt(second.getAttribute('tabindex'));
        return one > two ? 1 : one < two ? -1 : 0;
      });

      ctrl.allTabindex = allTabindex;
    }

    function getNextItem( el ) {
      var next = ctrl.allTabindex.eq(ctrl.allTabindex.index(el) + 1);
      if ( next.length === 0 ) {
        next = ctrl.allTabindex[0];
      }
      return next;
    }

    function onKeyDown ( e ) {
      if ( e.keyCode === 13 ) {
        if ( e.target.tagName === 'TEXTAREA' ) {
          return true;
        }

        if ( ctrl.allTabindex.length === 0 ) {
          //no items yet
          findAllItemsWithTabindex();

          ctrl.setMutationObserver();

          ctrl.setDestroyMutationObserver();
        }
        getNextItem(e.target).focus().select();

        return false;
      }
      return true;
    }

    element.on('keydown', onKeyDown);

    scope.$on('$destroy', function(){
      element.off('keydown', onKeyDown);
    });
  }
}());
