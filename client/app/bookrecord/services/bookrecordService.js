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
  function bookrecord( notifier, $q, Q, httpRequest, _lodash ) {
    var book = {};
    var bookcache = {};

    /*
    * Public Interface
    */
    var service = {
      book: book,
      get: get,
      save: save,
      clear: clear,
      reset: reset
    };
    return service;
    ///////////////

    /*
    * Private Block
    */

    function get( id ) {
      if ( id.toLowerCase() === 'new' ) {
        return getNew();
      }
      else {
        return edit(id);
      }
    }

    function save() {
      var defer = Q.defer();

      /*if ( !book._id ) {
        book.dateResgistration = Date.now();
      }
      book.dateUpdate = Date.now();*/

      httpRequest.post({url: '/api/books/admin/' + book._id || 'new', data: book})
        .then(function( data ) {
          init();
          defer.resolve(data);
        })
        .catch(function( /*data*/ ) {
          //return handlerError({message:'Erro na gravaçao.'});
          defer.reject(handlerError({message: 'Erro na gravaçao.'}));
        });
      return defer.promise;
    }

    function clear() {
      for ( var k in book ) {
        if ( k !== '_id' && k !== 'reference' && book.hasOwnProperty(k) ) {
          book[k] = undefined;
        }
      }
      book = angular.extend(book, newBook());
    }

    function reset() {
      clear();
      book = angular.extend(book, bookcache);
    }

    function setReference( ref ) {
      book.reference = _lodash.padLeft(ref, 5, '0');
    }

    function edit( id ) {
      var defer = Q.defer();

      clear();

      httpRequest.get({url: '/api/books/admin/' + (id || ''), cache: false})
        .then(function( data ) {

          //data["dateUpdate"] = new Date(data["dateUpdate"]);

          for ( var k in data ) {
            if ( data.hasOwnProperty(k) ) {
              book[k] = data[k];
            }
          }
          setReference(book.reference);
          book.dateResgistrationLocal = new Date(data.dateResgistration).getTime();
          book.dateUpdateLocal = new Date(data.dateUpdate).getTime();

          bookcache = angular.copy(book);
          defer.resolve(data);
        })
        .catch(function( /*data*/ ) {
          defer.reject(handlerError({message: 'Livro não encontrado.'}));
          //return handlerError({message:'Livro não encontrado.'});
        });

      return defer.promise;
    }

    function getNew() {
      var defer = Q.defer();

      clear();

      httpRequest.get({url: '/api/counters/newbookreference/'})
        .then(function( data ) {
          setReference(data.seq);
          defer.resolve(data);
        })
        .catch(function( /*data*/ ) {
          defer.reject(handlerError({message: 'Referência inválida.'}));
          //return handlerError({message:'Referência inválida.'});
        });

      return defer.promise;
    }

    function init() {
      for ( var k in book ) {
        if ( book.hasOwnProperty(k) ) {
          delete book[k];
        }
      }
      book = angular.extend(book, newBook());
    }

    function newBook() {
      return {
        authors: [],
        translators: [],
        categories: [],
        keywords: [],
        obs: [],
        prefaceBy: [],
        postfaceBy: [],
        images: [],
        correctors: [],
        title: null,
        subject: null,
        editionNumber: null,
        editionYear: null,
        editionLanguage: null,
        editionCountry: null,
        editionPublisher: null,
        editionTranslatedLanguage: null,
        editionCountryFirstPublisher: null,
        editionYearCountryFirstEdition: null,
        editionISBN: null,
        originalLanguage: null,
        originalTitle: null,
        originalPublisher: null,
        originalYearFirstEdition: null,
        originalCountryEdition: null,
        nameCollection: null,
        numCollection: null,
        graphicalPrint: null,
        cover: null,
        workmanship: null,
        pagesNum: null,
        priceInitial: null,
        priceCost: null,
        price: null,
        buyAt: null,
        editionLegalDeposit: null,
        circulation: null,
        archive: null,
        condition: null,
        lendingTo: null,
        obsInternal: null,
        subtitle: null,
        dimensions: null,
        weight: null,
        numVolume: null,
        qt: null,
        isNewBook: null,
        isFeatured: null,
        isPromotion: null,
        isRare: null,
        isUnique: null,
        isValuable: null,
        sellOnline: null,
        sellPresencial: null,
        qtStore: null,
        qtSold: null,
        discounts: null,
        taxes: null,
        template: null
      };
    }

    function handlerError( options ) {
      notifier.log(options.message, options.data, 'Error');
      return book;
    }
  }
}());
