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
  function BookSearchFormLayout($rootScope) {
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
          advChange = (name === "main.search.advresults" && !advIsOpen),
          freeChange = (name === "main.search.results" && !freeIsOpen);

        advChange = advChange || (name === "main.bookdetail" && advIsOpen);
        freeChange = freeChange || (name === "main.bookdetail" && freeIsOpen);

        if (advChange) {
          $("#toggleAdvSearch").click();
        }
        if (freeChange) {
          $("#toggleFreeSearch").click();
        }

      }

      function changeLayout(event, toState, toParams, fromState, fromParams) {
        if (fromState.name!=="main.search" && toState.name!==fromState.name) {
          setLayout(toState.name);
        }
      }
      setLayout($rootScope.$state.current.name);

      scope.$on('$destroy', function () {
        onstateChangeSuccess();
      });

    }
  }
}());
