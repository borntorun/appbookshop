/**
 * Controller appBookShop.bookdetail BookDetailPage
 * (João Carvalho, 16-03-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Descrição: Book Detail Controller - Detalhe de livro mode view page
*/
(function() {
  'use strict';

  angular
    .module('appBookShop.bookdetail')
    .controller('BookDetailPageCtrl', BookDetailPageCtrl);

  /* @ngInject */
  function BookDetailPageCtrl($rootScope, BookDetail, bookconfig, exception, notifier) {
    /*jshint validthis: true */
    var vm = this;

    vm.book = {};

    vm.bookconfiglabels = bookconfig.data.labels;

    BookDetail.get($rootScope.$stateParams.bookid).then(function(data){
      vm.book = data;
    }, function(data) {
      console.log(data);
    });

    //notifier.info(bookconfig);

  }
}());
