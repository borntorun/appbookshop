/**
 * Controller appBookShop.booksearch BookSearchResults
 * (João Carvalho, 03-11-2015)
 *
 * Descrição: Manage search view results
*/
(function() {
  'use strict';

  angular
    .module('appBookShop.booksearch')
    .controller('BookSearchResultsCtrl', BookSearchResultsCtrl);

  /* @ngInject */
  function BookSearchResultsCtrl( $rootScope, $scope, $stateParams, $timeout, Criteria, notifier, SignalsService, authentication, appConfig, booksearch, booksearchCache) {
    /*jshint validthis: true */
    var vm = this;

    vm.results = [];
    vm.filters = null;
    vm.rankers = null;
    vm.isAuthenticated = authentication.isAuthenticated();


//    vm.criteria = _lodash.clone($stateParams, true);
//    delete vm.criteria.type;
//    if (!vm.criteria.limit) {vm.criteria.limit = appConfig.book.search.limitDefault;}
    vm.criteria = Criteria;

    //call search and get results
    var funcSearch = $stateParams.type === 'advanced'? booksearch.queryAdvanced : booksearch.queryFree;
    vm.query = funcSearch.call(null, vm.criteria);

    //get the real limit as it can change
    var limit = vm.query.parameters[0];

    //set viewport
    var viewport = !appConfig.book? 75: (appConfig.book.search.viewportDefault % limit !== 0? limit * 3: appConfig.book.search.viewportDefault);

    vm.query = vm.query.setViewport(viewport);

    SignalsService.searchexecuted.emit(vm.query);

    vm.query.execute()
      .then(function( data ) {

        //issue #37
        if ( data.length == 0 ) {
          notifier.warn('Não foram encontrados resultados\nReformule a sua pesquisa.');
        }

        setAuth(data);

        data = addBottom(data);

        data = setNext(data);

        $timeout(function(){
          vm.results = data;
        },10);
      })
      .catch(function() {
        notifier.warning('Erro na pesquisa', 'Pesquisa ');
      });


    //on event 'booksearch-next-on' call search.next and get results
    var onBookSearchNext = $scope.$on('booksearch-next-on', function( event, done ) {

      vm.query.next()
        .then(function( data ) {

          removeBottomLoader();
          removeTopLoader();

          if (!data.length) { return; }

          setAuth(data);

          data = addBottom(data);

          data = removeTop(data);

          data = setNext(data);

          data = setPrevious(data);

          /*$scope.$apply*/$timeout(function(){
            vm.results = data;
            if (vm.query.previous){
              $scope.$emit('booksearchresultsscroll', { windowScrollY: -1 * vm.query.parameters[0] * 48 /* * 4 * 300*/ });
            }
          });

        })
        .catch(function( /*error*/ ) {
          notifier.warning('Erro na pesquisa', 'Pesquisa ');
        })
        .finally(function(){
          done();
        });
    });

    //on event 'booksearch-next-previous' call search.previous and get results
    var onBookSearchPrevious = $scope.$on('booksearch-previous-on', function( event, done ) {
      vm.query.previous()
        .then(function( data ) {

          removeBottomLoader();
          removeTopLoader();

          if (!data.length) {
            return;
          }

          setAuth(data);
          data = addTop(data);
          data = removeBottom(data);
          data = setNext(data);
          data = setPrevious(data);

          /*$scope.$apply*/$timeout(function(){
            vm.results = data;
            //console.log(vm.query,vm.results.length, vm.query.previous? true: false,vm.query.next?true:false);

            $scope.$emit('booksearchresultsscroll', {windowScrollY: vm.query.parameters[0] * 60 /*5*300*/});

          });

        })
        .catch(function( /*error*/ ) {
          notifier.warning('Erro na pesquisa', 'Pesquisa ');
        })
        .finally(function(){
          done();
        });
    });

    var onBookSearchFilterCatChange = $rootScope.$on('BookSearchFilterCatChange', function( event, filter ) {
      //...update the view with the filter
      applyFilterCategories(filter);
    });

    //listen for signal loginsucceded
    //...update the view for the 'authenticated' user
    SignalsService.loginsucceded.listen(setAuthentication);

    //listen for signal logoutsucceded
    //...update the view for the 'not authenticated' user
    SignalsService.logoutsucceded.listen(setAuthentication);

    $scope.$on('$destroy', function() {
      //unregister listeners
      onBookSearchFilterCatChange();
      onBookSearchNext();
      onBookSearchPrevious();

    });

    function addBottom(data) {
      return vm.results.concat(data);
    }
    function addTop(data) {
      return data.concat(vm.results);
    }
    function removeBottom(results) {
      results.splice(-1 * vm.query.parameters[0]);
      return results;
    }
    function removeTop(results) {
      if (vm.query.previous) {
        results.splice(0, vm.query.parameters[0]);
      }
      return results;
    }
    function removeTopLoader() {
      if (!vm.results.length) {return;}
      vm.results.splice(0,vm.results[0].loadtype? 1 : 0);
    }
    function removeBottomLoader() {
      if (!vm.results.length) {return;}
      vm.results.splice(-1,vm.results[vm.results.length-1].loadtype? 1 : 0);
    }
    function setNext(results) {
      if (vm.query.next) {
        results.push({loadtype: 'next', loadmessage: 'a ler mais livros...', categories:getCategoriesFromCache(), template: 'app/booksearch/jade/booksearchResultInfiniteScroll.html'});
      }
      return results;
    }
    function setPrevious(results) {
      if (vm.query.previous) {
        results.splice(0, 0,{loadtype: 'previous',loadmessage: 'a ler livros anteriores...',categories:getCategoriesFromCache(),template: 'app/booksearch/jade/booksearchResultInfiniteScroll.html'});
      }
      return results;
    }
    //functions to deal with state for authenticated/or not users
    function setAuthentication(){
      vm.isAuthenticated = authentication.isAuthenticated();
      var aux = setAuth(vm.results.concat([]));
      $scope.safeApply(function() {
        vm.results = aux;
      });
    }
    function setAuth(data) {

      function itemAuth ( show ) {
        //this = each item in vm.results
        if ( show && this.isAuthenticated ) {
          return;
        }
        if ( !show && !this.isAuthenticated ) {
          return;
        }
        if (this.isAuthenticated !== (show && vm.isAuthenticated)) {
          this.isAuthenticated = show && vm.isAuthenticated;
        }

      }

      data.forEach(function( item ) {
        item.setAuth = itemAuth;
      });
      return data;
    }
    function getCategoriesFromCache() {
      var cacheCategories = booksearchCache.get('categories');
      return cacheCategories? cacheCategories: [];
    }
    function applyFilterCategories( filter ) {
      filter = filter || getCategoriesFromCache();
      $timeout(function() {
        var aCategories = [];

        booksearchCache.put('categories', filter);

        filter.forEach(function( element/*, index, array*/ ) {
          aCategories.push([
            ['categories', 'contains', element]
          ]);
        });
        vm.filters = aCategories;
      }, 1);
    }


  }
}());

