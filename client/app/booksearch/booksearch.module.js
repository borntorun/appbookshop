/**
 * Module appBookShop.booksearch
 * (João Carvalho, 12-03-2015)
 *
 * Description: Definição módulo para funcionalidade de pesquisa de livros
 */
(function() {
  'use strict';

  angular.module('appBookShop.booksearch',
    [
      'ui.router'
    ])
    .directive('bookSearchFormLayout', BookSearchFormLayout);

  /**
   * Directive appBookShop.booksearch BookSearchFormLayout
   * (João Carvalho, 12-03-2015)
   *
   * Description:
   *  responsável por gerir accordion em booksearchLayout.jade consoante o state
   */
  /* @ngInject */
  function BookSearchFormLayout($rootScope, BookSearch, $timeout) {
    var directive = {
      restrict: 'A',
      link: linkfunction
    };
    return directive;
    ////////////////
    function linkfunction(scope/*, element, attrs*/) {
      var onstateChangeSuccess = scope.$on('$stateChangeSuccess', changeLayout);

      function setLayout(name) {

        var
          advIsOpen = $('#toggleAdvSearch').attr('aria-expanded')=== 'true',
          freeIsOpen = $('#toggleFreeSearch').attr('aria-expanded')=== 'true',
          filterIsOpen = $('#toggleFilterSearch').attr('aria-expanded')=== 'true',
          advChange = (name === 'main.search.advresults' && !advIsOpen) || (name === 'main.search.featured' && advIsOpen),
          freeChange = (name === 'main.search.results' && !freeIsOpen) || (name === 'main.search.featured' && freeIsOpen),
          filterChange = filterChange || (!filterIsOpen && BookSearch.getFilterCategories().length>0) || (name === 'main.search.featured' && filterIsOpen);


        if (filterChange) {
          tabClick('#toggleFilterSearch');
        }
        if (advChange) {
          tabClick('#toggleAdvSearch');
        }
        if (freeChange) {
          tabClick('#toggleFreeSearch');
        }

      }

      function tabClick(tab){
        $timeout(function(){
          $(tab).click();
        },200);
      }
      function changeTab(tab) {
        if ($(tab).attr('aria-expanded')=== 'true') {
          tabClick(tab);
        }
      }

      function changeLayout(event, toState, toParams, fromState, fromParams) {
        /*//if (fromState.name!=="main.search" && toState.name!==fromState.name) {
          setLayout(toState.name);
        //}*/
        if (toState.name == 'main.search.featured') {
          changeTab('#toggleAdvSearch');
          changeTab('#toggleFreeSearch');
          changeTab('#toggleFilterSearch');
        }

      }

      setLayout($rootScope.$state.current.name);

      scope.$on('$destroy', function () {
        onstateChangeSuccess();
      });

    }
  }
}());
