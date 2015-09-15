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
  function BookrecordStoreCtrl( bookconfig, bookrecord) {
    /*jshint validthis: true */
    var model = this;

    model.book = bookrecord.book;

    model.labels = bookconfig.labels;

    model.placeholders = bookconfig.placeholders;

//    var messages = {
//      TITLE: 'Registo/Edição de Livro',
//      SAVE: 'Pretende gravar as alterações efectuadas?',
//      CLEAR: 'Pretende limpar o formulário?\n\nPerderá os dados constantes no formulário.\n(o registo na base de dados não será afectado enquanto não efectuar "Gravar")',
//      RESET: 'Desfazer alterações efectaudas?\n\nO registo da base de dados será carregado.\n(perderá as alterações efectuadas no formulário)'
//    };
//
//    model.resetForm = function() {
//      modalpopup.confirm(messages.RESET, messages.TITLE)
//        .then(function() {
//          bookrecord.reset();
//        })
//        .catch(function() {
//        });
//    };
//    model.clearForm = function() {
//      modalpopup.confirm(messages.CLEAR, messages.TITLE)
//        .then(function() {
//          bookrecord.clear();
//        })
//        .catch(function() {
//          //notifier.info('no done', '', 'Book Record');
//        });
//
//    };
//    model.save = function() {
//      modalpopup.confirm(messages.SAVE, messages.TITLE)
//        .then(function( /*data*/ ) {
//
//          bookrecord.save()
//            .then(function( data ) {
//              notifier.info('Livro registado<br/>' + data.reference);
//
//              $state.transitionTo($state.current, {
//                bookid: data._id
//              }, {
//                reload: true,
//                inherit: false,
//                notify: true
//              });
//
//              /*$rootScope.$state.go('main.bookrecord', {
//                bookid: data._id
//              });*/
//            })
//            .catch(function( /*data*/) {
//              notifier.warning('Livro não registado', '', 'Registo/Edição');
//            });
//        })
//        .catch(function() {
//          //notifier.info('no done', '', 'Book Record');
//        });
//    };
  }
}());
