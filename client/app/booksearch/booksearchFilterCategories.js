/**
 * Controller appBookShop.booksearch BookSearchFilterCategories
 * (João Carvalho, 13-03-2015)
 *
 * Descrição: Controla filtro de categorias no form de search
 */
(function () {
    'use strict';
    angular
        .module('appBookShop.booksearch')
        .controller('BookSearchFilterCategoriesCtrl', BookSearchFilterCategoriesCtrl);
    /* @ngInject */
    function BookSearchFilterCategoriesCtrl($rootScope, $scope, _lodash, BookSearch) {
        /*jshint validthis: true */
        var vm = this;
        vm.filtro = BookSearch.getFilterCategories();//[];
        vm.urlRemote = '/api/categories/search/%QUERY';
        vm.urlPrefetch = '/assets/data/categories.json';
        vm.removeCat = function (item) {
            removeIfExists(item);
            $rootScope.$broadcast('BookSearchFilterCatChange', vm.filtro);
        }
        vm.onSelected = function (item) {
            vm.filtro = vm.filtro || [];
            removeIfExists(item.name);
            vm.filtro.push(item.name);
            $rootScope.$broadcast('BookSearchFilterCatChange', vm.filtro);
        }
        function removeIfExists(item) {
            _lodash.remove(vm.filtro, function (val) {
                return val === item;
            });
        }

//        $scope.$on('typeahead:cursorchanged', function (event, suggestion, dataset) {
//            alert('on cursor changed');
//        });
    }
}());
