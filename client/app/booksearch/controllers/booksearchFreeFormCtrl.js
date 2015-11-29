/**
 * Controller appBookShop.booksearch BookSearchFreeFormCtrl
 * (João Carvalho, 12-03-2015)
 *
 * Description: Controla pesquisa livre de livros
 */
(function() {
  'use strict';
  angular.module('appBookShop.booksearch').controller('BookSearchFreeFormCtrl', BookSearchFreeFormCtrl);
  /* @ngInject */
  function BookSearchFreeFormCtrl( $rootScope, $scope, _lodash, SignalsService) {
    /*jshint validthis: true */
    var vm = this;
    vm.criteria = {};
    vm.search = search;

    //set listener for changing criteria
    SignalsService.searchexecuted.listen(setCriteria);

    function search() {
      $rootScope.$state.go('main.search.results', angular.extend({}, {type: 'free'}, vm.criteria));
    }

    function setCriteria(query){
      if(query.type === 'free') {
        vm.criteria = _lodash.clone(query.criteria, true);
      }
    }

    var ondestroy = $scope.$on('$destroy', function() {
      SignalsService.searchexecuted.unlisten(setCriteria);
      ondestroy();
    });
  }
}());


