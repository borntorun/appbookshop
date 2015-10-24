/**
 * Controller appBookShop.booksearch BookSearchFilterCategories
 * (João Carvalho, 13-03-2015)
 *
 * Description: Controla filtro de categorias no form de search
 */
(function() {
  'use strict';
  angular
    .module('appBookShop.booksearch')
    .controller('BookSearchFilterCategoriesCtrl', BookSearchFilterCategoriesCtrl);
  /* @ngInject */
  function BookSearchFilterCategoriesCtrl( $scope, $rootScope, _lodash, booksearch ) {
    /*jshint validthis: true */
    var vm = this;
    vm.filtro = booksearch.getFilterCategories();

    vm.options = {
      showLog: true,
      clear: true,
      selectOnAutocomplete: true
    };
    vm.ttoptions = {
      name: 'categories',
      remote: '/api/tables/category/search/%QUERY',
      prefetch: '/assets/data/category.json'
    };
    vm.removeCat = function( item ) {
      removeIfExists(item);
      $rootScope.$broadcast('BookSearchFilterCatChange', vm.filtro);
    };
    vm.onSelected = function( ev, item ) {
      vm.filtro = vm.filtro || [];
      removeIfExists(item.name);
      vm.filtro.push(item.name);
      $rootScope.$broadcast('BookSearchFilterCatChange', vm.filtro);
    };
    function removeIfExists( item ) {
      _lodash.remove(vm.filtro, function( val ) {
        return val === item;
      });
    }

    /*$scope.$on('typeahead:cursorchanged', function (event, suggestion, dataset) {
        alert('on cursor changed');
    });*/
//    $scope.$on('$destroy', function(){
//      console.log('destroy filer cat ctrl');
//    });

  }
}());
