/**
 * Controller appBookShop.bookdetail BookDetailPage
 * (João Carvalho, 16-03-2015)
 *
 * Description: Book Detail Controller - Detalhe de livro mode view page
 */
(function() {
  'use strict';

  var module = angular.module('appBookShop.bookdetail');

  module.controller('BookDetailPageCtrl', BookDetailPageCtrl);

  //  BookDetailPageCtrl.prototype.setTitle = function() {
  //
  //    this.constructor.prototype.ola=function(){alert('sss');}
  //
  //
  //    console.log(this);
  //  };
  /* @ngInject */
  function BookDetailPageCtrl( $scope, $stateParams, $state, authentication, SignalsService, Book/*bookdetail*/, appConfig, message, pageTitle ) {
    /*jshint validthis: true */
    var vm = this;

    //TESTE
    //this.$_$setTitle('teste');

    vm.isAuthenticated = authentication.isAuthenticated();

    function setViewAuth( /*data*/ ) {
      $scope.$apply(function() {
        vm.isAuthenticated = authentication.isAuthenticated();
      });
    }

    SignalsService.loginsucceded.listen(setViewAuth);
    SignalsService.logoutsucceded.listen(setViewAuth);

    vm.book = {};
    vm.bookflags = {
      noinformation: false
    };

    vm.bookconfiglabels = appConfig.book.labels;

    //    bookdetail.get(/*$rootScope.*/$stateParams.reference)
    //      .then(function( data ) {
    if ( Book ) {
      //$scope.$apply(function() {

        vm.book = Book/*data*/;

        pageTitle(vm.book.title);

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
          vm.book.cover || !vm.bookflags.noprefaceBy || !vm.bookflags.nopostfaceBy || !vm.bookflags.nocorrector;
      //});
    }
    else {
      message('bookdetail', 'notfound')
        .finally(function() {
          $state.go('main.search');
        });
    }
    //      })
    //      .catch(function() {
    //        message('bookdetail', 'notfound')
    //          .finally(function() {
    //            $state.go('main.search');
    //          });
    //      });

    vm.searchCategoria = function( item ) {
      //TODO: colocar limit
      /*$rootScope.*/
      $state.go('main.search.advresults', {
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

  }

}());
