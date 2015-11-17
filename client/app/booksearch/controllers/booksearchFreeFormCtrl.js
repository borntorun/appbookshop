/**
 * Controller appBookShop.booksearch BookSearchFreeFormCtrl
 * (João Carvalho, 12-03-2015)
 *
 * Description: Controla pesquisa livre de livros
 */
(function() {
  'use strict';
  angular.module('appBookShop.booksearch').controller('BookSearchFreeFormCtrl', BookSearchFreeFormCtrl);
  /* @ngInject */
  function BookSearchFreeFormCtrl( $rootScope, $scope, booksearch, booksearchLastQuery) {
    /*jshint validthis: true */
    var vm = this;

    console.log(booksearch);
    var onstateChangeSuccess = $scope.$on('$stateChangeSuccess', setInputSearch);

    if ( booksearchLastQuery.query['free'] ) {
      var parameters = booksearchLastQuery.emptyIfdash(booksearchLastQuery.query['free'].parameters);
      vm.inputsearch = parameters[1];
      vm.limit = parameters[0];
    }

    vm.search = function search() {
      $rootScope.$state.go('main.search.results', {type: 'free', limit: vm.limit, term: vm.inputsearch});
    };

    function setInputSearch( event, toState, toParams, fromState, fromParams ) {
      if ( toState.name == 'main.search.results' && (toState.name !== fromState.name || (toParams.term !== undefined && fromParams.term !== undefined && toParams.term !== fromParams.term)) ) {
        vm.inputsearch = toParams.term;
        vm.limit = toParams.limit;
        event.preventDefault();
      }
    }

    $scope.$on('$destroy', function() {
      onstateChangeSuccess(); //unregister the listenner 'onstateChangeSuccess'
    });
  }
}());


