/**
 * Created by Joao Carvalho on 12-03-2015.
 */
(function () {
  'use strict';
  angular.module('appBookShop.booksearch').controller('BookSearchAdvancedFormCtrl', BookSearchAdvancedFormCtrl);
  /* @ngInject */
  function BookSearchAdvancedFormCtrl($rootScope, BookSearch, notifier) {
    /*jshint validthis: true */
    var vm = this;
    //notifier.info('Procura Livros Activa');

    vm.inputsearch = '';//BookSearch.getSearchterm();//data.inputsearch;
    vm.limit = 25;//BookSearch.getSearchlimit();

    vm.search = function search() {
      $rootScope.$state.go('main.search.results',{limit: vm.limit , term:vm.inputsearch});
    }


  }
}());


