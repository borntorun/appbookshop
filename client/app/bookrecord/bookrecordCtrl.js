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
  function BookrecordCtrl( $scope, $rootScope, bookconfig, formsMng, isbnIsvalid, exception, notifier ) {
    /*jshint validthis: true */
    var model = this;

    model.formsMng = formsMng;

    model.isbnIsvalid = isbnIsvalid;

    model.anoActual = new Date().getFullYear();

    model.clearForm = function() {
      notifier.info('clear', '', 'accao:');
    }
    model.submitForm = function() {
      notifier.info('submit', '', 'accao:');
    }

    model.newForm = function() {
      notifier.info('novo', '', 'accao:');
    }


    model.book = {
      title: '',
      subtitle: '',
      authors: [
        'Sophia de Mello Breyner Andersen'
      ],
      translators: [
        'Vera San Payo de Lemos',
        'João lourenço'
      ],
      categories: [
        'Poesia',
        'Literatura Portuguesa',
        'África',
        'Política',
        'Fotografia', 'Poesia', 'Poesia Portuguesa', 'Biografias'
      ],
      keywords: [
        'Guerra',
        'Fascismo',
        '1ª Guerra Mundial'
      ]
    };

    model.book.author = model.book.authors.length == 1 ? model.book.authors[0] : '';
    model.book.translator = model.book.translators.length == 1 ? model.book.translators[0] : '';
    model.book.categorie = model.book.categories.length == 1 ? model.book.categories[0] : '';
    model.book.keyword = model.book.keywords.length == 1 ? model.book.keywords[0] : '';

    model.config = {
      authors: {
        options: {showLog: true, selectOnAutocomplete: true},
        ttoptions: {
          name: 'categories',
          limit: 4,
          remote: '/api/categories/search/%QUERY',
          prefetch: '/assets/data/categories.json'/*,
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
          remote: '/api/categories/search/%QUERY',
          prefetch: '/assets/data/categories.json'
        }
      }
    };

    model.events = {
      selectOption: function( item, data ) {
        $scope.$apply(function() {
          model.book[item.currentTarget.name].push(data.name);
        });
      }
    };

    model.bookflags = {
      noinformation: false
    };

    model.bookconfig = bookconfig.data;

    notifier.info('BookRecordCtrl', '', 'Controller');

  }

}());
