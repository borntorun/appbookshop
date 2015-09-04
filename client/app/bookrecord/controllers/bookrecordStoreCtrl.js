/**
 * Controller appBookShop.bookrecord BookrecordStore
 * (João Carvalho, 04-09-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Descrição: Book record store controller - Store fields view manager
*/
(function() {
  'use strict';

  angular
    .module('appBookShop.bookrecord')
    .controller('BookrecordStoreCtrl', BookrecordStoreCtrl);

  /* @ngInject */
  function BookrecordStoreCtrl($scope, bookconfig, exception, notifier) {
    /*jshint validthis: true */
    var model = this;


    model.book = {
      dateResgistration: '2001-12-01',
      dateUpdate: '',

      price: 0,
      priceInitial: 0,
      priceCost: 0,
      qtStore: 0,
      qtSold: 0,
      qt:0,

      sellOnline: false,
      sellPresencial: false,
      isNewBook: false,
      isFeatured: false,
      isPromotion: false,
      isRare: false,
      isUnique: false,
      isValuable: false,


      condition:'',
      graphicalPrint: '',
      workmanship: '',
      cover: '',
      dimensions: '',
      weight: 0,
      buyAt: '',
      archive:'',
      lendingTo:''
    };
    model.labels = bookconfig.data.labels;
    model.placeholders = bookconfig.data.placeholders;

  }
}());
