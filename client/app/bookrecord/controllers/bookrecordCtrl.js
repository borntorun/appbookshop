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
  function BookrecordCtrl( $scope, bookconfig, bookrecord, notifier, modalpopup ) {
    /*jshint validthis: true */
    var model = this;

    model.book = bookrecord.book;

    model.labels = bookconfig.data.labels;

    model.placeholders = bookconfig.data.placeholders;

    model.valMessages = bookconfig.data.valMessages;

    model.anoActual = new Date().getFullYear();

    var messages = {
      SAVE: 'Pretende gravar as alterações efectuadas?',
      CLEAR: 'Perderá os dados do formulário.\n(o registo na base de dados não será afectado)'
    };

    model.clearForm = function() {
      modalpopup.confirm(messages.CLEAR, 'Limpar formulário')
        .then(function() {
          //$scope.$apply(function(){
//            bookrecord.book = {};
//            model.book = bookrecord.book;
          //});
          bookrecord.clear();

          //bookrecord.book = {};
          notifier.info('form cleared', '', 'Book Record');
          return modalpopup.confirm(messages.SAVE, 'Gravar Alterações')

        })
        .then(function() {
          notifier.info('form saved', '', 'Book Record');
        })
        .catch(function() {
          notifier.info('no done', '', 'Book Record');
        });

    }
    model.submitForm = function() {
      notifier.info('submit', '', 'accao:');
    }

    model.newForm = function() {
      notifier.info('novo', '', 'accao:');
    }

    model.config = {
      authors: {
        options: {showLog: true, selectOnAutocomplete: true},
        ttoptions: {
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
          console.log(item.currentTarget.name);
          model.book[item.currentTarget.name].push(data.name);
        });
      }
    };

    model.bookflags = {
      noinformation: false
    };


    notifier.info('BookRecordCtrl', '', 'Controller');

    model.removeItem = function() {
      notifier('removey','','teste');
    }
  }

}());
