/**
 * Controller appBookShop.booksearch BookSearchTotalCtrl
 * (João Carvalho, 13-03-2015)
 *
 * Description:
 */
(function() {
  'use strict';
  angular
    .module('appBookShop.booksearch')
    .controller('BookSearchTotalCtrl', BookSearchTotalCtrl);
  /* @ngInject */
  function BookSearchTotalCtrl( bookrecord ) {
    /*jshint validthis: true */
    var vm = this;

    bookrecord.count()
      .then(function( value ) {
        vm.total = value;
      });
  }
}());
