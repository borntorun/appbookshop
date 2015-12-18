/**
 * Controller appBookShop.bookrecord BookrecordCoverUpload
 * (João Carvalho, 04-09-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Description: Book record image cover upload view manager
 */
(function() {
  'use strict';

  angular
    .module('appBookShop.bookrecord')
    .controller('BookrecordCoverUploadCtrl', BookrecordCoverUploadCtrl);

  /* @ngInject */
  function BookrecordCoverUploadCtrl( $scope, _lodash, appConfig, Book ) {
    /*jshint validthis: true */
    var model = this;

    model.book = Book;

    model.labels = appConfig.book.labels;

    model.placeholders = appConfig.book.placeholders;

    model.valMessages = appConfig.book.valMessages;

    model.fotos = [];

    var _addFoto = function( src, active, init ) {
      var obj = {
        name: src.slice(-20),
        src: src,
        active: active
      };
      model.fotos[init ? 'unshift' : 'push'].apply(model.fotos, [obj]);
    };

    var _setActive = function( value ) {
      model.fotos.forEach(function( item, index ) {
        item.active = index === value;
      });
    };

    model.book.images.forEach(function( item, index ) {
      _addFoto(item.resized, index === 0);
    });

    model.update = function( original, resized ) {
      $scope.safeApply(function() {
        _lodash.remove(model.fotos, function( item, index ) {
          var remove = item.name === resized.slice(-20);
          if ( remove ) {
            model.book.images.splice(index, 1);
          }
          return remove;
        });

        model.fotos.forEach(function( item ) {
          item.active = false;
        });

        _addFoto(resized, true);

        model.book.images.push({
          resized: resized,
          original: original
        });

      });
    };

    model.remove = function( index ) {

      var este = model.book.images.splice(index, 1);
      model.fotos.splice(index, 1);

      var active = model.fotos.length && model.fotos.length === index ? 0 : index;

      _setActive(active);

      return este[0];
    };

    model.setCover = function( index ) {
      var este = model.remove(index);

      _addFoto(este.resized, true, true);
      model.book.images.unshift(este);

      _setActive(0);
    };

  }
}());
