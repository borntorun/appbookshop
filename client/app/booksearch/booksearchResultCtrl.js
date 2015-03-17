/**
 * Created by Joao Carvalho on 12-03-2015.
 */
(function () {
  'use strict';
  angular.module('appBookShop.booksearch').controller('BookSearchResultCtrl', BookSearchResultCtrl);
  /* @ngInject */
  function BookSearchResultCtrl($timeout, $rootScope, $scope, notifier, BookSearch) {
    /*jshint validthis: true */
    var vm = this;
    /*console.log($rootScope.$state);
    console.log($rootScope.$stateParams.term);*/
    vm.filters = null;
    vm.rankers = null;
    BookSearch.search(getSearchInput()).then(function (data) {
      //notifier.info('Procura Ok');
      vm.results = data;
      applyFilterCategories(BookSearch.getFilterCategories());
    }, function (error) {
      notifier.error('Erro procura');
    });
    var onBookSearchFilterCatChange = $rootScope.$on('BookSearchFilterCatChange', function (event, filter) {
      applyFilterCategories(filter);
    });
    function getSearchInput() {
      return BookSearch.data.isinit ? $rootScope.$stateParams.term || BookSearch.data.inputsearchDefault : $rootScope.$stateParams.term === undefined ? BookSearch.data.inputsearchDefault : $rootScope.$stateParams.term;
    }

    function applyFilterCategories(filter) {
      $timeout(function () {
        var aCategories = [];
        BookSearch.setFilterCategories(filter);
        filter.forEach(function (element, index, array) {
          aCategories.push([
            ['categories', 'contains', element]
          ]);
        });
        vm.filters = aCategories;
      }, 5);
    }

    $scope.$on('$destroy', function(){
      onBookSearchFilterCatChange(); //unregister the listenner 'BookSearchFilterCatChange'
    });

    //notifier.info('View Resultados');
  }
}());
