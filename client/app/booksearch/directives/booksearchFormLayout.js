/**
 * Directive appBookShop.booksearch bookSearchFormLayout
 * (João Carvalho, 01-12-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Description: Manage accordion in booksearchMain.jade depending on state
*/
(function () {
  'use strict';
  /*jshint validthis: true */
  angular
    .module('appBookShop.booksearch')
    .directive('bookSearchFormLayout', BookSearchFormLayout);

  /* @ngInject */
  function BookSearchFormLayout( $timeout, booksearchCache ) {
    var directive = {
      restrict: 'CA',
      link: linkfunction
    };
    return directive;
    ////////////////
    function linkfunction( scope ) {
      var onstateChangeSuccess = scope.$on('$stateChangeSuccess', changeLayout);

      function setLayout( name ) {

        var
          advIsOpen = $('#toggleAdvSearch').attr('aria-expanded') === 'true',
          freeIsOpen = $('#toggleFreeSearch').attr('aria-expanded') === 'true',
          filterIsOpen = $('#toggleFilterSearch').attr('aria-expanded') === 'true',
          advChange = (name === 'main.search.advresults' && !advIsOpen) || (name === 'main.search.featured' && advIsOpen),
          freeChange = (name === 'main.search.results' && !freeIsOpen) || (name === 'main.search.featured' && freeIsOpen),
          filterChange = filterChange || (!filterIsOpen && (booksearchCache.get('categories') || []).length > 0) || (name === 'main.search.featured' && filterIsOpen);

        if ( filterChange ) {
          tabClick('#toggleFilterSearch');
        }
        if ( advChange ) {
          tabClick('#toggleAdvSearch');
        }
        if ( freeChange ) {
          tabClick('#toggleFreeSearch');
        }

      }

      function tabClick( tab ) {
        $timeout(function() {
          $(tab).click();
        }, 200);
      }

      function changeTab( tab ) {
        if ( $(tab).attr('aria-expanded') === 'true' ) {
          tabClick(tab);
        }
      }

      function changeLayout( event, toState, toParams, fromState, fromParams ) {
        if ( fromState.name !== 'main.search' && toState.name !== fromState.name ) {
          setLayout(toState.name);
        }
        if ( toState.name == 'main.search.featured' ) {
          changeTab('#toggleAdvSearch');
          changeTab('#toggleFreeSearch');
          changeTab('#toggleFilterSearch');
        }

      }

      scope.$on('$destroy', function() {
        onstateChangeSuccess();
      });

    }
  }

}());
