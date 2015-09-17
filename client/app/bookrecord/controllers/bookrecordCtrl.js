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
  function BookrecordCtrl( $scope, /*$rootScope,*/ _lodash, bookconfig, bookrecord, notifier, $state, modalpopup, logicform, appconfig ) {
    /*jshint validthis: true */
    var model = this;

    var messages = {
      TITLE: 'Registo/Edição de Livro',
      NOTFOUND: 'Livro não encontrado\n\n%url\n\nVerifique o endereço e tente novamente',
      SAVE: 'Pretende gravar as alterações efectuadas?',
      CLEAR: 'Pretende limpar o formulário?\n\nPerderá os dados constantes no formulário.\n(o registo na base de dados não será afectado enquanto não efectuar "Gravar")',
      RESET: 'Desfazer alterações efectuadas?\n\nO registo da base de dados será carregado.\n(perderá as alterações efectuadas no formulário)'
    };

    bookrecord.load($state.params.reference)
      .then(function( /*data*/ ) {
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

      })
      .catch(function( /*data*/ ) {
        //notifier.warning('Livro não encontrado', '', 'Registo/Edição');
        modalpopup.message({message: messages.NOTFOUND, title: messages.TITLE, vars: {url: appconfig.urlAbsolute()}})
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
      modalpopup.confirm({message: messages.RESET, title: messages.TITLE})
        .then(function() {
          bookrecord.reset();
          logicform.bookrecord.setPristine();
        })
        .catch(function() {});
    };

    model.clearForm = function() {
      modalpopup.confirm({message: messages.CLEAR, title: messages.TITLE})
        .then(function() {
          bookrecord.clear();
        })
        .catch(function() {});

    };

    model.save = function() {
      modalpopup.confirm({message: messages.SAVE, title: messages.TITLE})
        .then(function( /*data*/ ) {

          bookrecord.save()
            .then(function( data ) {
              notifier.info('Livro registado<br/>' + data.reference);

              $state.transitionTo($state.current, {
                area: 'admin',
                type: $state.params.type,
                reference: data.reference,
                slug: data.slug
              }, {
                reload: true,
                inherit: false,
                notify: true
              });
            })
            .catch(function( /*data*/ ) {
              notifier.warning('Livro não registado', '', 'Registo/Edição');
            });
        })
        .catch(function() {});
    };

    model.removeItem = function( field, item ) {
      removeIfExists(model.book[field], item);
      $scope.$emit('angtty:setval:' + field, model.book[field].length > 1 ? '' : model.book[field][0]);
    };

    model.autocompleteEvents = {
      active: false,

      onevent: function( item, data ) {
        //logevent('onevent', item, data);
      },
      onactive: function( item, data ) {
        //logevent('onactive', item, data);
        //para evitar abrir as sugestões ao receber p focus
        model.autocompleteEvents.active = true;
      },
      onopen: function( item, data ) {
        //logevent('onopen', item, data);

        //para evitar abrir as sugestões ao receber p focus
        if ( item.type === 'typeahead:beforeopen' ) {
          if ( model.autocompleteEvents.active ) {
            item.preventDefault();
          }
        }
        model.autocompleteEvents.active = false;
      },
      onchange: function( event, data ) {
        //logevent('onchange', event, data);

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

      },
      onselect: function( item, data ) {
        //logevent('onselect', item, data);
      }
    };

    var autocompleteOptions = {showLog: true, clear: false, selectOnAutocomplete: false, emitOnlyIfPresent: true, watchInitEvent: true, watchSetValEvent: true};
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

    function logevent( func, item, data ) {
      console.log(func + '----' + item.type, '  --target:', item.currentTarget.name, '--data:', data);
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
