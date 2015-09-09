/**
 * Controller appBookShop.bookrecord Bookrecord
 * (João Carvalho, 16-03-2015)
 *
 * Descrição: Book Record Controller - Form de edição livro
 */
(function() {
  'use strict';

  angular
    .module('appBookShop.bookrecord')
    .controller('BookrecordCtrl', BookrecordCtrl);

  /* @ngInject */
  function BookrecordCtrl( $scope, $rootScope,bookconfig, bookrecord, notifier) {
    /*jshint validthis: true */
    var model = this;

    model.book = bookrecord.book;

    model.labels = bookconfig.labels;

    model.placeholders = bookconfig.placeholders;

    model.valMessages = bookconfig.valMessages;

    model.anoActual = new Date().getFullYear();

    function getFirstItemIfOne(vArray){
      return (vArray && vArray.length == 1) ? vArray[0] : '';
    }

    bookrecord.get($rootScope.$stateParams.bookid)
      .then(function(data){
        //treat book fields here

        model.book.author = getFirstItemIfOne(model.book.authors);
        model.book.translator = getFirstItemIfOne(model.book.translators);
        model.book.categorie = getFirstItemIfOne(model.book.categories);
        model.book.keyword = getFirstItemIfOne(model.book.keywords);
        model.book.corrector = getFirstItemIfOne(model.book.correctors);
        model.book.postface = getFirstItemIfOne(model.book.postfaceBy);
        model.book.preface = getFirstItemIfOne(model.book.prefaceBy);

      });



    model.config = {
      authors: {
        options: {showLog: true, selectOnAutocomplete: true, emitOnlyIfPresent: true},
        ttoptions: {
          minLength: '0',
          name: 'authors',
          limit: 20,
          remote: '/api/tables/author/search/%QUERY',
          prefetch: '/assets/data/authors.json'/*,
          classNames: {
            input: ''
          }*/
        }
      },
      languages: {
        options: {showLog: true, selectOnAutocomplete: true},
        ttoptions: {
          name: 'languages',
          limit: 15,
          remote: '/api/tables/language/search/%QUERY',
          prefetch: '/assets/data/languages.json'/*,
          classNames: {
            input: ''
          }*/
        }
      },
      countries: {
        options: {showLog: true, selectOnAutocomplete: true},
        ttoptions: {
          name: 'countries',
          limit: 15,
          remote: '/api/tables/country/search/%QUERY',
          prefetch: '/assets/data/countries.json'/*,
          classNames: {
            input: ''
          }*/
        }
      },
      publishers: {
        options: {showLog: true, selectOnAutocomplete: true},
        ttoptions: {
          name: 'publishers',
          limit: 15,
          remote: '/api/tables/publisher/search/%QUERY',
          prefetch: '/assets/data/publishers.json'/*,
          classNames: {
            input: ''
          }*/
        }
      },
      categories: {
        options: {showLog: true, selectOnAutocomplete: true},
        ttoptions: {
          name: 'categories',
          limit: 4,
          remote: '/api/tables/category/search/%QUERY',
          prefetch: '/assets/data/categories.json'
        }
      },
      keywords: {
        options: {showLog: true, selectOnAutocomplete: true},
        ttoptions: {
          name: 'keywords',
          limit: 4,
          remote: '/api/tables/keyword/search/%QUERY',
          prefetch: '/assets/data/keywords.json'
        }
      },
      translators: {
        options: {showLog: true, selectOnAutocomplete: true},
        ttoptions: {
          name: 'translators',
          limit: 4,
          remote: '/api/tables/translator/search/%QUERY'/*,
          prefetch: '/assets/data/categories.json'*/
        }
      }
    };

    model.events = {
      selectOption: function( item, data ) {
        $scope.$apply(function() {
          console.log('target: ', item.currentTarget.name);

          var v = model.book[item.currentTarget.name];
          if (v && isArray(v)) {
            model.book[item.currentTarget.name].push(data.name);
          }


        });
      }
    };

    $scope.$on('typeahead:select', function() {
      console.log('select');
    });
    $scope.$on('typeahead:active', function() {
      console.log('active');
    });
    $scope.$on('typeahead:idle', function() {
      console.log('idle');
    });
    $scope.$on('typeahead:open', function() {
      console.log('open');
    });
    $scope.$on('typeahead:close', function(item, data) {
      if (data[1].value === '' && model.book[data[1].name] && model.book[data[1].name]!=='') {
        $scope.$digest();
      }
    });
    $scope.$on('typeahead:change', function() {
      console.log('change');
    });
    $scope.$on('typeahead:render', function() {
      console.log('render');
    });
/*
    $scope.$on('typeahead:select', function() {
      console.log('select');
    });
    $scope.$on('typeahead:autocomplete', function() {
      console.log('select');
    });
    $scope.$on('typeahead:cursorchange', function() {
      console.log('select');
    });
    $scope.$on('typeahead:asyncrequest', function() {
      console.log('select');
    });
    $scope.$on('typeahead:asynccancel', function() {
      console.log('select');
    });
    $scope.$on('typeahead:asyncreceive', function() {
      console.log('select');
    });
*/





    model.bookflags = {
      noinformation: false
    };


    notifier.log('BookRecordCtrl', '', 'Controller');

    model.removeItem = function() {
      notifier('removey','','teste');
    }
    //////////////
    //util
    function isArray( obj ) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    }

  }

}());
