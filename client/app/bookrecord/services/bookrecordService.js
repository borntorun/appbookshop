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
  function bookrecord( notifier, $q, Q, httpRequest, _lodash ) {
    var book = {};
    var bookcache = {};

    /*
    * Public Interface
    */
    var service = {
      book: book,
      load: load,
      save: save,
      clear: clear,
      reset: reset,
      setReference: setReference
    };
    return service;
    ///////////////

    /*
    * Private Block
    */
    function reset() {
      clear();
      book = angular.extend(book, bookcache);
    }

    //TODO: extract to a util book service (repeated at bookrecordSimilarTitleCtrl)
    function setReference( ref ) {
      /*book.reference =*/return _lodash.padLeft(ref, 5, '0');
    }

    function load( id ) {
      if ( id.toLowerCase() === 'new' ) {
        return editNew();
      }
      else {
        return edit(id);
      }
    }

    function save() {
      var defer = call({method: httpRequest.post, url: '/api/books/admin/' + book._id || 'new', data: book},
        function( response ) {
          init();
          defer.resolve(response.data);
        },
        function(err) {
          reject(defer, err);
        }
      );
      return defer.promise;
    }

    function edit( id ) {
      clear();
      var defer = call({method: httpRequest.get, url: '/api/books/admin/' + (id || ''), cache: false},
        function( response ) {
          var data = response.data;
          for ( var k in data ) {
            if ( data.hasOwnProperty(k) ) {
              book[k] = data[k];
            }
          }
          book.reference = setReference(book.reference);
          book.dateResgistrationLocal = new Date(data.dateResgistration).getTime();
          book.dateUpdateLocal = new Date(data.dateUpdate).getTime();
          bookcache = angular.copy(book);
          defer.resolve(data);
        },
        function( err ) {
          reject(defer, err);
        }
      );
      return defer.promise;
    }

    function editNew() {
      init();
      var defer = call({method: httpRequest.get, url: '/api/counters/newbookreference/', cache: false},
        function( data ) {
          book.reference = setReference(data.seq);
          defer.resolve(data);
        },
        function( err ) {
          reject(defer, err);
        });
      return defer.promise;
    }

    function init() {
      for ( var k in book ) {
        if ( book.hasOwnProperty(k) ) {
          delete book[k];
        }
      }
      book = angular.extend(book, model());
    }

    function clear() {
      for ( var k in book ) {
        if ( k !== '_id' && k !== 'reference' && book.hasOwnProperty(k) ) {
          book[k] = undefined;
        }
      }
      book = angular.extend(book, model());
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
      notifier.log(err.message, 'Error',err.cause.data);

      return err;
    }
  }
}());
