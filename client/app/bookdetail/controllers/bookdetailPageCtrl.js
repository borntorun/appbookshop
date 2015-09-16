/**
 * Controller appBookShop.bookdetail BookDetailPage
 * (João Carvalho, 16-03-2015)
 *
 * Descrição: Book Detail Controller - Detalhe de livro mode view page
 */
(function() {
  'use strict';

  angular
    .module('appBookShop.bookdetail')
    .controller('BookDetailPageCtrl', BookDetailPageCtrl);

  /* @ngInject */
  function BookDetailPageCtrl( $rootScope, bookdetail, bookconfig ) {
    /*jshint validthis: true */
    var vm = this;

    vm.book = {};
    vm.bookflags = {
      noinformation: false
    };

    vm.bookconfiglabels = bookconfig.labels;

    bookdetail.get($rootScope.$stateParams.reference)
      .then(function( data ) {
        //$scope.$apply(function(){
        vm.book = data;
        //});

        vm.bookflags.notranslatores = !vm.book.translators || vm.book.translators.length === 0;
        vm.bookflags.nocategories = !vm.book.categories || vm.book.categories.length === 0;
        vm.bookflags.noobs = !vm.book.obs || vm.book.obs.length === 0;
        vm.bookflags.originalinfo = vm.book.originalTitle || vm.book.originalLanguage || vm.book.originalPublisher || vm.book.originalCountryEdition || vm.book.originalYearFirstEdition;
        vm.bookflags.noprefaceBy = !vm.book.prefaceBy || vm.book.prefaceBy.length === 0;
        vm.bookflags.nopostfaceBy = !vm.book.postfaceBy || vm.book.postfaceBy.length === 0;
        vm.bookflags.nocorrector = !vm.book.corrector || vm.book.corrector.length === 0;

        vm.bookflags.hasinformation =
          vm.book.circulation ||
          vm.book.editionLegalDeposit ||
            vm.book.graphicalPrint ||
            vm.book.cover ||
            !vm.bookflags.noprefaceBy ||
            !vm.bookflags.nopostfaceBy ||
            !vm.bookflags.nocorrector;

        console.log(vm.book);
      }, function( data ) {
        console.log(data);
      });

    vm.searchCategoria = function( item ) {
      //TODO: colocar limit
      $rootScope.$state.go('main.search.advresults', {
        type: 'advanced',
        limit: 25,
        title: '-',
        authors: '-',
        subject: '-',
        collection: '-',
        categories: item,
        edition: '-'
      });
    };

    //notifier.info(bookconfig);

  }

}());
