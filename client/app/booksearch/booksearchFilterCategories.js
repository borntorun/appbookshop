/**
 * Controller appBookShop.booksearch BookSearchFilterCategories
 * (João Carvalho, 13-03-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Descrição: Controla filtro de categorias no form de search
 */
(function () {
  'use strict';
  angular
    .module('appBookShop.booksearch')
    .controller('BookSearchFilterCategoriesCtrl', BookSearchFilterCategoriesCtrl)

    /* @ngInject */
    function BookSearchFilterCategoriesCtrl($rootScope, _lodash, BookSearch) {
      /*jshint validthis: true */
      var vm = this;
      vm.filtro = BookSearch.getFilterCategories();//[];

      vm.urlRemote = '/api/categories/search/';

      vm.removeCat = function (item) {
        _lodash.remove(vm.filtro, function (val) {
          return val === item;
        });
        $rootScope.$broadcast('BookSearchFilterCatChange', vm.filtro);
      }

      vm.onSelected = function (item) {
        vm.filtro = vm.filtro || [];
        vm.filtro.push(item.name);
        $rootScope.$broadcast('BookSearchFilterCatChange', vm.filtro);
      }
    }

}());
