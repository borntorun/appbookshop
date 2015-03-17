/**
 * Created by Joao Carvalho on 12-03-2015.
 */
(function () {
  'use strict';
  angular.module('appBookShop.booksearch').controller('BookSearchFormCtrl', BookSearchFormCtrl);
  /* @ngInject */
  function BookSearchFormCtrl($rootScope, $scope, BookSearch, notifier) {
    /*jshint validthis: true */
    var vm = this;
    //notifier.info('Procura Livros Activa');
    var onstateChangeSuccess = $scope.$on('$stateChangeSuccess', setInputSearch)

    vm.inputsearch = BookSearch.getSearchterm();//data.inputsearch;

    vm.search = function search() {
      $rootScope.$state.go('main.search.results',{term:vm.inputsearch});
      //main.search.results({term:vm.inputsearch})
    }

    function setInputSearch (event, toState, toParams, fromState, fromParams) {
      if (toState.name === 'main.search') {
        vm.inputsearch = BookSearch.data.inputsearchDefault;
        event.preventDefault();
      }
      else if (toState.name === 'main.search.results' && (toState.name !== fromState.name || (toParams.term!==undefined && fromParams.term!==undefined && toParams.term !== fromParams.term)) ) {
        vm.inputsearch = toParams.term;
        event.preventDefault();
      }

      /*console.log(fromState);
      console.log(fromParams);
      console.log(toState);
      console.log(toParams);*/
    }

    /*$scope.$on('$destroy', function(){
      onstateChangeSuccess(); //unregister the listenner 'onstateChangeSuccess'
    });*/
  }
}());


