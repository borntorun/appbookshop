/**
 * Controller appBookShop.booksearch BookSearchAdvancedFormCtrl
 * (João Carvalho, 12-03-2015)
 *
 * Description: Controla pesquisa avançada de livros
 */
(function() {
  'use strict';
  angular.module('appBookShop.booksearch').controller('BookSearchAdvancedFormCtrl', BookSearchAdvancedFormCtrl);

  /* @ngInject*/
  function BookSearchAdvancedFormCtrl( $rootScope, $scope, _lodash, booksearchLastQuery, booksearch ) {
    /*jshint validthis: true */
    var vm = this;

    var onstateChangeSuccess = $scope.$on('$stateChangeSuccess', setInputSearch);

    vm.criteria = {
      title: '',
      authors: '',
      subject: '',
      collection: '',
      categories: '',
      edition: false
    };
    vm.limit = booksearch.defaults.limit;

    vm.options = {
      showLog: true
    };
    vm.ttoptions = {
      name: 'categories',
      limit: booksearch.defaults.limit,//TODO:change this
      remote: '/api/tables/category/search/%QUERY',
      prefetch: '/assets/data/category.json',
      classNames: {
        input: 'searchadvcat'
      }
    };

    if ( booksearchLastQuery.query['advanced'] ) {
      var query = booksearchLastQuery.query['advanced'];
      var parameters = booksearchLastQuery.emptyIfdash(query.parameters);
      vm.criteria = _lodash.clone(query.criteria, true);
      vm.criteria.edition = (vm.criteria.edition === '1' ? true : false);
      vm.limit = parameters[0];
    }
    vm.search = function search() {

      var criteria = _lodash.clone(vm.criteria, true);
      criteria.edition = (criteria.edition === true ? '1' : '-');
      for(var k in criteria) {
        criteria[k] = criteria[k] === ''? '-': criteria[k];
      }

      $rootScope.$state.go('main.search.advresults', angular.extend({}, {type: 'advanced', limit: vm.limit}, criteria));

    };
    vm.empty = function() {
      return vm.criteria != null && vm.criteria.edition === false && (vm.criteria.title + vm.criteria.authors + vm.criteria.subject + vm.criteria.collection + vm.criteria.categories).trim().length === 0;
    };
    vm.autocompleteEvents = {
      onchangeCategories: function( event, data ) {
        $scope.$apply(function() {
          vm.criteria.categories = data;
        });
      }
    };


    function setInputSearch( event, toState, toParams/*, fromState, fromParams*/ ) {
      if ( toState.name == 'main.search.advresults' ) {
        vm.criteria = {
          title: toParams.title,
          authors: toParams.authors,
          subject: toParams.subject,
          collection: toParams.collection,
          categories: toParams.categories,
          edition: (toParams.edition === '1' ? true : false)
        };
        for(var k in vm.criteria) {
          vm.criteria[k] = vm.criteria[k] === '-'? '': vm.criteria[k];
        }
        event.preventDefault();
      }
    }

    $scope.$on('$destroy', function() {
      onstateChangeSuccess(); //unregister the listenner 'onstateChangeSuccess'
    });
  }
}());
