/**
 * Service appBookShop.bookrecord bookrecord
 * (João Carvalho, 04-09-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Description: Service to bookrecord view managment
 */
(function() {
  'use strict';
  angular
    .module('appBookShop.bookrecord')
    .factory('bookrecord', bookrecord);

  /* @ngInject */
  function bookrecord( notifier, Q, httpRequest, bookrecordCache ) {
    /*
    * Public Interface
    */
    var service = {
//      get: get,
      edit: load,
      save: save,
      clear: clear,
      reset: reset,
      count: count
    };
    return service;
    ///////////////////////////////////////////

    /*
    * Private Block Interface
    */
//    function get( id ) {
//      var defer = call({method: httpRequest.get, url: '/api/books/store/' + (id || '')},
//        function( response ) {
//          defer.resolve(response.data);
//        },
//        function(err){
//          defer.reject(err);
//        });
//      return defer.promise;
//    }

    function count() {
      var defer = call({method: httpRequest.get, url: '/api/books/count', cache: false},
        function( response ) {
          defer.resolve(response.data);
        },
        function( err ) {
          reject(defer, err);
        }
      );
      return defer.promise;
    }

    function load( reference ) {
      bookrecordCache.remove('bookreset');
      return reference.toLowerCase() === 'new' ? editNew() : edit(reference);
    }

    function save(book) {
      var defer = call({method: httpRequest.post, url: '/api/books/admin/' + book._id || 'new', data: book},
        function( response ) {
          defer.resolve(response.data);
        },
        function( err ) {
          reject(defer, err);
        }
      );
      return defer.promise;
    }

    function clear(book) {
      for ( var k in book ) {
        if ( book.hasOwnProperty(k) && k !== '_id' && k !== 'reference' ) {
          book[k] = undefined;
        }
      }
      angular.extend(book || {}, model());
    }

    function reset( book, value ) {
      service.clear(book);
      return angular.extend(book, value || bookrecordCache.get('bookreset'));
    }

    //Private Block
    ///////////////////////////////////////////
    function edit( reference ) {
      clear();
      var defer = call({method: httpRequest.get, url: '/api/books/admin/' + (reference || ''), cache: false},
        function( response ) {
          var data = response.data;
          var book=angular.extend({},model(), data);
          book.dateResgistrationLocal = new Date(data.dateResgistration).getTime();
          book.dateUpdateLocal = new Date(data.dateUpdate).getTime();
          bookrecordCache.put('bookreset', angular.copy(book));
          defer.resolve(book);
        },
        function( err ) {
          reject(defer, err);
        }
      );
      return defer.promise;
    }

    function editNew() {
      var book = model();
      var defer = call({method: httpRequest.get, url: '/api/counters/newbookreference/', cache: false},
        function( response ) {
          book.reference = response.data.seq;
          defer.resolve(book);
        },
        function( err ) {
          reject(defer, err);
        });
      return defer.promise;
    }

    function model() {
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
        slug: null,
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

    function call( options, thenCallback, catchCallback ) {
      var defer = Q.defer();
      var method = options.method;
      delete options.method;
      method.call(null, options)
        .then(thenCallback)
        .catch(catchCallback);
      return defer;
    }

    function reject( defer, err ) {
      defer.reject(handlerError(err));
    }

    function handlerError( err ) {
      notifier.log(err.message, 'Error', err.cause.data);

      return err;
    }
  }
}());
