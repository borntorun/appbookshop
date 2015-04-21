/**
 * Module appBookShop.booksearch
 * (João Carvalho, 12-03-2015)
 *
 * Descrição: Definição módulo para funcionalidade de pesquisa de livros
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
   * Descrição:
   *  responsável por gerir accordion em booksearchLayout.jade consoante o state
   */
  /* @ngInject */
  function BookSearchFormLayout($rootScope, BookSearch) {
    var directive = {
      restrict: 'A',
      link: linkfunction
    };
    return directive;
    ////////////////
    function linkfunction(scope, element, attrs) {
      var onstateChangeSuccess = scope.$on('$stateChangeSuccess', changeLayout)

      function setLayout(name) {

        var
          advIsOpen = $("#toggleAdvSearch").attr("aria-expanded")==="true",
          freeIsOpen = $("#toggleFreeSearch").attr("aria-expanded")==="true",
          filterIsOpen = $("#toggleFilterSearch").attr("aria-expanded")==="true",

          filterhide = (name === "main.bookdetail"),
          filterChange = (name === "main.bookdetail" && filterIsOpen),
          advChange = (name === "main.search.advresults" && !advIsOpen),
          freeChange = (name === "main.search.results" && !freeIsOpen);

        filterChange = filterChange || (name !== "main.bookdetail" && !filterIsOpen && BookSearch.getFilterCategories().length>0);
        advChange = advChange || (name === "main.bookdetail" && advIsOpen);
        freeChange = freeChange || (name === "main.bookdetail" && freeIsOpen);


        if (filterhide) {
          $("span:has(#toggleFilterSearch)").hide();
        } else {
          $("span:has(#toggleFilterSearch)").show();
        }
        if (filterChange) {
          $("#toggleFilterSearch").click();
        }
        if (advChange) {
          $("#toggleAdvSearch").click();
        }
        if (freeChange) {
          $("#toggleFreeSearch").click();
        }

      }

      function changeLayout(event, toState, toParams, fromState, fromParams) {
        //if (fromState.name!=="main.search" && toState.name!==fromState.name) {
          setLayout(toState.name);
        //}
      }
      setLayout($rootScope.$state.current.name);

      scope.$on('$destroy', function () {
        onstateChangeSuccess();
      });

    }
  }
}());
