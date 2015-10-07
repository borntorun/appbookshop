/**
 * Controller appBookShop.booksearch BookSearchFreeFormCtrl
 * (João Carvalho, 12-03-2015)
 *
 * Description: Controla pesquisa livre de livros
 */
(function () {
  'use strict';
  angular.module('appBookShop.booksearch').controller('BookSearchFreeFormCtrl', BookSearchFreeFormCtrl);
  /* @ngInject */
  function BookSearchFreeFormCtrl(notifier,$rootScope, $scope, BookSearch, SignalsService ) {
    /*jshint validthis: true */
    var vm = this;

    /*var onstateChangeSuccess = $scope.$on('$stateChangeSuccess', setInputSearch);*/

    vm.inputsearch = BookSearch.getSearchTerm();
    vm.limit = BookSearch.getSearchLimit();

    vm.search = function search() {
      $rootScope.$state.go('main.search.results',{type: 'free', limit: vm.limit , term:vm.inputsearch});
      SignalsService.searched.emit(vm.inputsearch);
    };

    /*function setInputSearch (event, toState, toParams, fromState, fromParams) {
      if (toState.name === 'main.search') {
        vm.inputsearch = BookSearch.getSearchInputDefault();
        vm.limit = BookSearch.getSearchLimit();
        event.preventDefault();
      }
      else if (toState.name === 'main.search.results' && (toState.name !== fromState.name || (toParams.term!==undefined && fromParams.term!==undefined && toParams.term !== fromParams.term)) ) {
        vm.inputsearch = toParams.term;
        vm.limit = toParams.limit;
        event.preventDefault();
      }
    }*/

    /*$scope.$on('$destroy', function(){
      onstateChangeSuccess(); //unregister the listenner 'onstateChangeSuccess'
    });*/
  }
}());


