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
  angular
    .module('appBookShop.components')
    .directive('enterAsTab', enterAsTab)
    .controller('enterAsTabCtrl', enterAsTabCtrl);

  function enterAsTabCtrl( $scope, mutationObserver ) {
    /*jshint validthis: true */
    var model = this;
    var observer;

    $scope.allTabindex = [];

    model.setMutationObserver = function() {
      observer = mutationObserver.apply(
        $scope.observableElement,
        $scope.observableConfig,
        $scope.observableCallback
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

  /* @ngInject */
  function enterAsTab() {
    /*
    * Private Block
    */

    function link( scope, element, attrs, ctrl ) {
      //element must be a form
      if ( element[0].tagName !== 'FORM' ) {
        return;
      }

      scope.observableElement = element[0];
      scope.observableConfig = { attributes: true, childList: true, subtree: true, attributeFilter: ['tabindex', 'visible', 'disabled'] };
      scope.observableCallback = function( /*mutation*/ ) {
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

        scope.allTabindex = allTabindex;
      }

      function getNextItem( el ) {
        var next = scope.allTabindex.eq(scope.allTabindex.index(el) + 1);
        if ( next.length === 0 ) {
          next = scope.allTabindex[0];
        }
        return next;
      }

      element.on('keydown', function( e ) {
        if ( e.keyCode === 13 ) {
          if ( e.target.tagName === 'TEXTAREA' ) {
            return true;
          }

          if ( scope.allTabindex.length === 0 ) {
            //no items yet
            findAllItemsWithTabindex();

            ctrl.setMutationObserver();

            ctrl.setDestroyMutationObserver();
          }
          getNextItem(e.target).focus().select();

          return false;
        }
        return true;
      });
    }

    /*
    * Public Interface
    */
    var directive = {
      restrict: 'AC',
      scope: {
      },
      controller: 'enterAsTabCtrl',
      controllerAs: 'model',
      link: link
    };
    return directive;
    ///////////////

  }
}());
