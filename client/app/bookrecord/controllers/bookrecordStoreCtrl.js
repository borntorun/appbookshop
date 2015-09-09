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
  function BookrecordStoreCtrl(bookconfig, bookrecord, notifier, modalpopup) {
    /*jshint validthis: true */
    var model = this;

    model.book = bookrecord.book;

    model.labels = bookconfig.labels;

    model.placeholders = bookconfig.placeholders;

    var messages = {
      SAVE: 'Pretende gravar as alterações efectuadas?',
      CLEAR: 'Perderá os dados do formulário.\n(o registo na base de dados não será afectado)'
    };

    model.clearForm = function() {
      modalpopup.confirm(messages.CLEAR, 'Limpar formulário')
        .then(function() {
          bookrecord.clear();

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
  }
}());
