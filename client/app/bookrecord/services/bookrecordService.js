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
  function bookrecord( notifier, $q, httpRequest, _lodash ) {
    var book = {};

    var newBook = function() {
      return {
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
      }
    };

    var clear = function() {
      for ( var k in book ) {
        if ( book.hasOwnProperty(k) ) {
          book[k] = undefined;
        }
      }
    }

    /*
    * Public Interface
    */
    var service = {
      book: book,
      get: get,
      clear: clear
    };
    return service;
    ///////////////

    /*
    * Private Block
    */

    function get( id ) {
      var self = this;

      return httpRequest.get({url: '/api/books/admin/' + (id || '')})
        .then(function( data ) {
          self.clear();
          for ( var k in data ) {
            if ( data.hasOwnProperty(k) ) {
              book[k] = data[k];
            }
          }

          book.reference = _lodash.padLeft(book.reference,5,'0');

          return data;
        }).
        catch(function(){
          notifier.error('Livro não encontrado.', id, 'Error');
          return {};
        });
    }

  }
}());
