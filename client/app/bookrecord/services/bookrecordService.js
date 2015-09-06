/**
 * Service appBookShop.bookrecord bookrecord
 * (João Carvalho, 04-09-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Descrição: Service to bookrecord view managment
 */
(function() {
  'use strict';
  angular
    .module('appBookShop.bookrecord')
    .factory('bookrecord', bookrecord);

  /* @ngInject */
  function bookrecord( exception, notifier ) {
    var bookrecord = {};

    bookrecord.book = {
      reference: '0000554',
      title: '',
      subtitle: '',
      authors: [],
      editionLegalDeposit: '',
      translators: [],
      categories: [],
      keywords: [],
      obs: [].join('\n'),
      obsInternal: [],

      dateResgistration: '2001-12-01',
//      dateUpdate: '',
//      price: 0,
//      priceInitial: 0,
//      priceCost: 0,
//      qtStore: 0,
//      qtSold: 0,
//      qt:0,

      sellOnline: false,
      sellPresencial: false,
      isNewBook: false,
      isFeatured: false,
      isPromotion: false,
      isRare: false,
      isUnique: false,
      isValuable: false,


//      condition:'',
//      graphicalPrint: '',
//      workmanship: '',
//      cover: '',
//      dimensions: '',
//      weight: 0,
//      buyAt: '',
//      archive:'',
//      lendingTo:''
    };

    bookrecord.book.author = bookrecord.book.authors.length == 1 ? bookrecord.book.authors[0] : '';
    bookrecord.book.translator = bookrecord.book.translators.length == 1 ? bookrecord.book.translators[0] : '';
    bookrecord.book.categorie = bookrecord.book.categories.length == 1 ? bookrecord.book.categories[0] : '';
    bookrecord.book.keyword = bookrecord.book.keywords.length == 1 ? bookrecord.book.keywords[0] : '';


    bookrecord.clear = function() {
      for (var k in bookrecord.book) {
        if (bookrecord.book.hasOwnProperty(k)) {
          bookrecord.book[k] = undefined;
        }
      };
    }

    var forms = [];

    /*
    * Public Interface
    */
    var service = {
      registerForm: registerForm,
      book: bookrecord.book,
      clear: bookrecord.clear,
      isValid: isValid
    };
    return service;
    ///////////////

    /*
    * Private Block
    */
    function registerForm(form) {
      forms.push(form);
    }
    function isValid() {
      //avaliar form bookrecordForm e bookrecordStoresForm

      for(var form=0; form<forms.length; form++) {
        if (forms[form].$invalid) {return false;}
      }
      return true;
    }
  }
}());
