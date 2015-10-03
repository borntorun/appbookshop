/**
 * Controller appBookShop.bookrecord BookrecordStore
 * (João Carvalho, 04-09-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Description: Book record store controller - Store fields view manager
 */
(function() {
  'use strict';

  angular
    .module('appBookShop.bookrecord')
    .controller('BookrecordStoreCtrl', BookrecordStoreCtrl);

  /* @ngInject */
  function BookrecordStoreCtrl( bookconfig, bookrecord) {
    /*jshint validthis: true */
    var model = this;

    model.book = bookrecord.book;

    model.labels = bookconfig.labels;

    model.placeholders = bookconfig.placeholders;

  }
}());
