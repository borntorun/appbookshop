/**
 * Controller appBookShop.bookrecord Bookrecord
 * (João Carvalho, 16-03-2015)
 *
 * Description: Book Record Controller - Form de edição livro
 */
(function() {
  'use strict';

  angular
    .module('appBookShop.bookrecord')
    .controller('BookrecordCtrl', BookrecordCtrl);

  /* @ngInject */
  function BookrecordCtrl( $scope, $state, _lodash, bookconfig, bookrecord, notifier, logicform, message ) {
    /*jshint validthis: true */
    var model = this;

    bookrecord.load($state.params.reference)
      .then(function( /*data*/ ) {
        emitInitValues();
      })
      .catch(function( /*data*/ ) {
        message('bookrecord', 'notfound')
          .finally(function() {
            $state.go('main.search');
          });
      });

    model.book = bookrecord.book;

    model.labels = bookconfig.labels;

    model.placeholders = bookconfig.placeholders;

    model.valMessages = bookconfig.valMessages;

    model.anoActual = new Date().getFullYear();

    model.resetForm = function() {
      message('bookrecord', 'reset')
        .then(function() {
          bookrecord.reset();
          emitInitValues();
          logicform.bookrecord.setPristine();
        });
      /*.catch(function() {});*/
    };

    model.clearForm = function() {
      message('bookrecord', 'clear')
        .then(function() {
          bookrecord.clear();
        });
      /*.catch(function() {});*/
    };

    model.save = function() {
      message('bookrecord', 'save')
        .then(function( /*data*/ ) {

          model.bookrecordLogicForm.processing(true);

          bookrecord.save()
            .then(function( data ) {
              notifier.info('Livro registado', 'Registo/Edição', data.reference);

              $state.transitionTo($state.current,
                {area: 'admin', type: $state.params.type, reference: data.reference, slug: data.slug},
                {reload: true, inherit: false, notify: true}
              );
            })
            .catch(function( err ) {
              notifier.warning('Livro não registado', 'Registo/Edição');
              message('bookrecord', 'notsaved', err);
            })
            .finally(function() {
              model.bookrecordLogicForm.processing(false);
            });
        })
        .catch(function() {
        });
    };

    model.removeItem = function( field, item ) {
      removeIfExists(model.book[field], item);
      $scope.$emit('angtty:setval:' + field, model.book[field].length > 1 ? '' : model.book[field][0]);
    };

    model.autocompleteEvents = {
      active: false,
      onbeforeopen: function( item/*, data*/ ) {
        /*console.log(item.type);*/
        if ( model.autocompleteEvents.active ) {
          item.preventDefault();
        }
        model.autocompleteEvents.active = false;
      },
      onactive: function( /*item, data*/ ) {
        //to avoid open suggestions when input receiving focus
        model.autocompleteEvents.active = true;
      },
      onchange: function( event, data ) {
        if ( isArray(model.book[event.currentTarget.name]) ) {
          var field = model.book[event.currentTarget.name];
          removeIfExists(field, data);

          $scope.$apply(function() {
            field.push(data);
            $scope.$emit('angtty:setval:' + event.currentTarget.name, field.length > 1 ? '' : field[0]);
          });
        }
        else {
          $scope.$apply(function() {
            model.book[event.currentTarget.name] = data;
          });
        }

      }
    };

    var autocompleteOptions = {
      showLog: true,
      clear: false,
      selectOnAutocomplete: false,
      emitOnlyIfPresent: true,
      watchInitEvent: true,
      watchSetValEvent: true
      /*, setSameListenerEventBefore: true*/};
    var autocompleteTTOptions = {minLength: 3, limit: 20};

    model.config = {
      author: {options: autocompleteOptions, ttoptions: autocompleteTTOptions},
      language: {options: autocompleteOptions, ttoptions: autocompleteTTOptions},
      country: {options: autocompleteOptions, ttoptions: autocompleteTTOptions},
      publisher: {options: autocompleteOptions, ttoptions: autocompleteTTOptions},
      category: {options: autocompleteOptions, ttoptions: autocompleteTTOptions},
      keyword: {options: autocompleteOptions, ttoptions: autocompleteTTOptions},
      translator: {options: autocompleteOptions, ttoptions: autocompleteTTOptions}
    };

    function emitInitValues() {
      emitInitArray('authors', 'author', getFirstItemIfOne(model.book.authors));
      emitInitArray('translators', 'translator', getFirstItemIfOne(model.book.translators));
      emitInitArray('categories', 'category', getFirstItemIfOne(model.book.categories));
      emitInitArray('keywords', 'keyword', getFirstItemIfOne(model.book.keywords));
      emitInitArray('correctors', 'corrector', getFirstItemIfOne(model.book.correctors));
      emitInitArray('postfaceBy', 'postface', getFirstItemIfOne(model.book.postfaceBy));
      emitInitArray('prefaceBy', 'preface', getFirstItemIfOne(model.book.prefaceBy));
      emitInitString('editionPublisher', model.book.editionPublisher);
      emitInitString('editionLanguage', model.book.editionLanguage);
      emitInitString('editionCountry', model.book.editionCountry);
      emitInitString('editionTranslatedLanguage', model.book.editionTranslatedLanguage);
      emitInitString('editionCountryFirstPublisher', model.book.editionCountryFirstPublisher);
      emitInitString('originalPublisher', model.book.originalPublisher);
      emitInitString('originalLanguage', model.book.originalLanguage);
      emitInitString('originalCountryEdition', model.book.originalCountryEdition);
    }

    configTT('author');
    configTT('language');
    configTT('country');
    configTT('publisher');
    configTT('category');
    configTT('keyword');
    configTT('translator');

    function configTT( table ) {
      model.config[table].ttoptions = angular.extend(
        angular.copy(model.config[table].ttoptions),
        {name: table, remote: '/api/tables/' + table + '/search/%QUERY', prefetch: '/assets/data/' + table + '.json'});
    }

    //for fields that are strings
    function emitInitString( name, value ) {
      $scope.$emit('angtty:init:' + name, value);
    }

    //for fields that arrrays
    function emitInitArray( name, fieldModel, value ) {
      model.book[fieldModel] = value;
      emitInitString(name, model.book[fieldModel]);
    }

    function removeIfExists( varray, item ) {
      _lodash.remove(varray, function( val ) {
        return val === item;
      });
    }

    function getFirstItemIfOne( vArray ) {
      return (vArray && vArray.length > 0) ? vArray[0] : '';
    }

    //////////////
    //util
    function isArray( obj ) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    }

  }

}());
