/**
 * Controller appBookShop.booksearch BookSearchResultCtrl
 * (João Carvalho, 12-03-2015)
 *
 * Description: Controla resultados da pesquisa de livros
 */
(function() {
  'use strict';
  angular.module('appBookShop.booksearch')
    .controller('BookSearchResultCtrl', BookSearchResultCtrl);

  /* @ngInject */
  function BookSearchResultCtrl( $rootScope, $scope, $timeout, BookSearch, notifier ) {
    /*jshint validthis: true */
    var vm = this;

    vm.filters = null;
    vm.rankers = null;

    $rootScope.$stateParams.type = ($rootScope.$stateParams.type || 'free').toLowerCase();

    if ( $rootScope.$stateParams.type === 'free' ) {
      BookSearch.search($rootScope.$stateParams.term, $rootScope.$stateParams.limit)
        .then(function( data ) {
          applyFilterCategories(BookSearch.getFilterCategories());
          vm.results = data;
        })
        .catch(function( /*error*/ ) {
          notifier.warning('Erro na pesquisa', 'Pesquisa Livre');
        });
    }
    if ( $rootScope.$stateParams.type === 'advanced' ) {
      var inputObj = {
        title: $rootScope.$stateParams.title,
        authors: $rootScope.$stateParams.authors,
        subject: $rootScope.$stateParams.subject,
        collection: $rootScope.$stateParams.collection,
        categories: $rootScope.$stateParams.categories,
        edition: $rootScope.$stateParams.edition
      };

      BookSearch.searchAdvanced(inputObj, $rootScope.$stateParams.limit)
        .then(function( data ) {

          applyFilterCategories(BookSearch.getFilterCategories());
          vm.results = data;
        })
        .catch(function( /*error*/ ) {
          notifier.warning('Erro na pesquisa', 'Pesquisa Avançada');
        });
    }

    var onBookSearchFilterCatChange = $rootScope.$on('BookSearchFilterCatChange', function( event, filter ) {
      applyFilterCategories(filter);
    });

    function applyFilterCategories( filter ) {
      $timeout(function() {
        var aCategories = [];
        BookSearch.setFilterCategories(filter);
        filter.forEach(function( element/*, index, array*/ ) {
          aCategories.push([
            ['categories', 'contains', element]
          ]);
        });
        vm.filters = aCategories;
      }, 1);
    }

    $scope.$on('$destroy', function() {
      onBookSearchFilterCatChange(); //unregister the listenner 'BookSearchFilterCatChange'
    });

    //notifier.info('View Resultados');
  }
}());
