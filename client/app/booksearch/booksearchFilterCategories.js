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
    function BookSearchFilterCategoriesCtrl($rootScope, $timeout, _lodash, BookSearch) {
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

  /* @ngInject */
  /*function BookSearchFilterCategoriesDirective($rootScope) {
    var directive = {
      // use as attribute: <tag data-catfilter-typeaheadjs="scope_param"/>
      restrict: 'A',
      link: linkfunction
    };

    return directive;

    function configTypeaheadBloodhound(options){
      *//*{
        key: 'name',
        limit: 25,
        remote: 'url' + '%QUERY',
        elId: '#panel-filtercat-dropdown-menu',
        name: 'categories',
        onSelected: func
      }*//*
      var i=1;
      ++i;
    }

    function linkfunction(scope, element, attrs) {
      configTypeaheadBloodhound({});

      var categories = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        limit: 25,
        remote: '/api/categories/search/' + '%QUERY'
      });
      // kicks off the loading/processing of `local` and `prefetch`
      categories.initialize();
      // passing in `null` for the `options` arguments will result in the default
      // options being used
      $('#panel-filtercat-dropdown-menu .typeahead').typeahead(null, {
        name: 'categories',
        displayKey: 'name',
        source: categories.ttAdapter()
      })
      element.on('typeahead:selected', function (objjquery, item, array) {
        scope.vm.filtro = scope.vm.filtro || [];
        scope.vm.filtro.push(item.name);
        $rootScope.$broadcast('categoriesFilterChange', scope.vm.filtro);
        $('#panel-filtercat-dropdown-menu .typeahead').typeahead('val', '');
      });
      scope.$on('$destroy', function () {
        element.typeahead('destroy');
      });
    };
  }*/
}());
