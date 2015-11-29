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
  function BookSearchAdvancedFormCtrl( $rootScope, $scope, _lodash, SignalsService ) {
    /*jshint validthis: true */
    var vm = this;

    //set listener for changing criteria
    SignalsService.searchexecuted.listen(setCriteria);

    vm.criteria = {};
    vm.selectCategories = {
      options: {
        showLog: true
      },
      ttoptions: {
        name: 'categories',
        limit: 15,//TODO:change this
        remote: '/api/tables/category/search/%QUERY',
        prefetch: '/assets/data/category.json',
        classNames: {
          input: 'searchadvcat'
        }
      },
      autocompleteEvents: {
        onchange: function( event, data ) {
          $scope.$apply(function() {
            vm.criteria.categories = data;
          });
        }
      }
    };
    vm.search = search;
    vm.empty = empty;

    function setCriteria( query ) {
      if(query.type === 'advanced') {
        vm.criteria = _lodash.clone(query.criteria, true);
        vm.criteria.edition = (vm.criteria.edition === '1' ? true : false);
      }
    }

    function search() {
      var criteria = _lodash.clone(vm.criteria, true);
      criteria.edition = criteria.edition === true? '1': '-';
      $rootScope.$state.go('main.search.advresults', angular.extend({}, {type: 'advanced'}, criteria  ));
    }

    function empty() {
      return false;
//      return vm.criteria != null && vm.criteria.edition === false &&
//        (vm.criteria.title +
//          vm.criteria.authors +
//          vm.criteria.subject +
//          vm.criteria.collection +
//          vm.criteria.categories).trim().length === 0;
    }

    var ondestroy = $scope.$on('$destroy', function() {
      SignalsService.searchexecuted.unlisten(setCriteria);
      ondestroy();
    });
  }
}());
