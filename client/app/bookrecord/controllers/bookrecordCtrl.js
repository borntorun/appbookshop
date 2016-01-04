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
  function BookrecordCtrl( $scope, $stateParams, $state, _lodash, localforageDriver, appConfig, Book, bookrecord, notifier, logicform, message, SignalsService ) {
    /*jshint validthis: true */
    var model = this;
    var storage = {};
    var autocompleteOptions = {
      showLog: true,
      clear: false,
      selectOnAutocomplete: false,
      emitOnlyIfPresent: true,
      watchInitEvent: true,
      watchSetValEvent: true
    };
    var autocompleteTTOptions = {minLength: 3, limit: 20};

    model.params = $stateParams;

    if ( Book ) {
      model.book = Book;
      emitInitValues();
    }
    else {
      message('bookrecord', 'notfound')
        .finally(function() {
          $state.go('main.search');
        });
      return;
    }

    model.labels = appConfig.book.labels;

    model.placeholders = appConfig.book.placeholders;

    model.valMessages = appConfig.book.valMessages;

    model.anoActual = new Date().getFullYear();

    model.resetForm = function() {
      message('bookrecord', 'reset')
        .then(function() {
          bookrecord.reset(model.book);
          emitInitValues();
          logicform.bookrecord.setPristine();
        });

    };

    model.clearForm = function() {
      console.log(Book);
      message('bookrecord', 'clear')
        .then(function() {
          bookrecord.clear(Book);
        });

    };

    model.newForm = function() {
      function go() {
        $state.go('main.bookrecord', {type: 'livro', reference: 'new', slug: ''}, {reload: true});
      }

      if ( logicform.bookrecord.isPristine() === false ) {
        message('bookrecord', 'new')
          .then(function() {
            go();
          });
      }
      else {
        go();
      }
    };

    model.save = function() {
      message('bookrecord', 'save')
        .then(function() {

          model.bookrecordLogicForm.processing(true);

          //TODO:temp remove this after async image upload is effective
          if (model.book.images && model.book.images.length) {
            model.book.images.forEach(function(item, index, items){
              items[index].original = '';
            });
          }

          saveToStorage();


          bookrecord.save(model.book)
            .then(function( data ) {
              notifier.info('Livro registado', 'Registo/Edição', data.reference);
              storage.booktosave.clear();
              $state.go($state.current,
                {area: 'admin', type: $state.params.type, reference: data.reference, slug: data.slug},
                {reload: true, inherit: false, notify: true}
              );
            })
            .catch(function( err ) {
              notifier.warning('Livro não registado', 'Registo/Edição');
              message('bookrecord', 'notsaved', {error: err});
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

    model.showSimilarTitles = function( done ) {
      SignalsService.bookrecordtitlechanged.emit(done);
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

          //issue #38
          if ( !data.trim() ) {
            $scope.$apply(function() {
              $scope.$emit('angtty:setval:' + event.currentTarget.name, field.length > 1 ? '' : field[0]);
            });
            return;
          }
          //end issue #38

          //issue #34
          var aData = data.split(',');
          //removeIfExists(field, data);

          $scope.$apply(function() {
            aData.forEach(function( item ) {
              item = item.trim().replace(/\s{2,}/g, ' ');
              if ( item ) {
                var aItem = item.split(' ');
                aItem.forEach(function( word, index ) {
                  aItem[index] = _.capitalize(word);
                });
                item = aItem.join(' ');
                removeIfExists(field, item);
                field.push(item);
              }
            });
            //field.push(data);
            $scope.$emit('angtty:setval:' + event.currentTarget.name, field.length > 1 ? '' : field[0]);
          });
          //end issue #34
        }
        else {
          $scope.$apply(function() {
            model.book[event.currentTarget.name] = data;
          });
        }

      }
    };

    model.config = {
      author: {options: autocompleteOptions, ttoptions: autocompleteTTOptions},
      language: {options: autocompleteOptions, ttoptions: autocompleteTTOptions},
      country: {options: autocompleteOptions, ttoptions: autocompleteTTOptions},
      publisher: {options: autocompleteOptions, ttoptions: autocompleteTTOptions},
      category: {options: autocompleteOptions, ttoptions: autocompleteTTOptions},
      keyword: {options: autocompleteOptions, ttoptions: autocompleteTTOptions},
      translator: {options: autocompleteOptions, ttoptions: autocompleteTTOptions}
    };

    //sets local storage to record cache
    localforageDriver.create(localforageDriver.STORAGE.LOCALSTORAGE, {
      key: 'booktosave', name: 'bookrecord', storeName: 'appbookshop', description: 'last book to save'
    })
      .then(function( driver ) {
        storage.booktosave = driver;
        return storage.booktosave.load();
      })
      .then(function( data ) {
        if ( data ) {
          if ( data.url === $state.href($state.current.name, $state.params, {absolute: true}) ) {
            message('bookrecord', 'reloadsaved')
              .then(function() {
                bookrecord.reset(model.book, data.book);
                emitInitValues();
                logicform.bookrecord.setPristine();
              });
          }
        }
      });

    //listen for session ending
    SignalsService.logoutisneeded.listen(function() {
      saveToStorage();
    }, {priority:10});//runs with 10 priority (default=0)

    //save record to storage
    function saveToStorage(){
      storage.booktosave && (storage.booktosave.save({
        url: $state.href($state.current.name, $state.params, {absolute: true}),
        book: model.book
      }));
    }

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
        return val.trim().toLowerCase() === item.trim().toLowerCase();
      });
    }

    function getFirstItemIfOne( vArray ) {
      return (vArray && vArray.length > 0) ? vArray[0] : '';
    }

    $scope.$on('$destroy', function() {

    });

    //////////////
    //util
    function isArray( obj ) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    }

  }

}());
