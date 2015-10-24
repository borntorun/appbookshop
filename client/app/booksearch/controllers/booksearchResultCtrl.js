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
  function BookSearchResultCtrl( $rootScope, $scope, $timeout, auth, SignalsService, booksearch, notifier ) {
    /*jshint validthis: true */
    var vm = this;

    vm.filters = null;
    vm.rankers = null;

    vm.isAuthenticated = auth.isAuthenticated();

    function setViewAuth(/*data*/) {
      $scope.$apply(function(){
        vm.isAuthenticated = auth.isAuthenticated();
        applyAuth(vm.cacheResults);
        vm.results = vm.cacheResults;
      });
    }
    SignalsService.loginsucceded.listen(setViewAuth);
    SignalsService.logoutsucceded.listen(setViewAuth);

    function applyAuth(data){

      data.forEach(function(item){
        //item.isAuthenticated = vm.isAuthenticated;
        item.call = function(show) {
          if (show && item.isAuthenticated){return;}
          item.isAuthenticated = show && vm.isAuthenticated;
        };
      });
    }

    $rootScope.$stateParams.type = ($rootScope.$stateParams.type || 'free').toLowerCase();

    if ( $rootScope.$stateParams.type === 'free' ) {
      booksearch.search($rootScope.$stateParams.term, $rootScope.$stateParams.limit)
        .then(function( data ) {
          applyFilterCategories(booksearch.getFilterCategories());
          vm.cacheResults = data;
          applyAuth(data);
          vm.results = data;
          //issue #37
          if(data.length == 0) {
            notifier.warn('Não foram encontrados resultados\nReformule a sua pesquisa.');
          }
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

      booksearch.searchAdvanced(inputObj, $rootScope.$stateParams.limit)
        .then(function( data ) {

          applyFilterCategories(booksearch.getFilterCategories());
          vm.cacheResults = data;
          applyAuth(data);
          vm.results = data;
          //issue #37
          if(data.length == 0) {
            notifier.warn('Não foram encontrados resultados\nReformule a sua pesquisa.');
          }
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
        booksearch.setFilterCategories(filter);
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
