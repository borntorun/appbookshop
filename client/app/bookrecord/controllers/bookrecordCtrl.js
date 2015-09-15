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
  function BookrecordCtrl( $scope, $rootScope, _lodash, bookconfig, bookrecord, notifier ) {
    /*jshint validthis: true */
    var model = this;

    model.book = bookrecord.book;

    model.labels = bookconfig.labels;

    model.placeholders = bookconfig.placeholders;

    model.valMessages = bookconfig.valMessages;

    model.anoActual = new Date().getFullYear();

    function getFirstItemIfOne( vArray ) {
      return (vArray && vArray.length > 0) ? vArray[0] : '';
    }

    //for fields that are strings
    function emitInitString(name, value) {
      $scope.$emit('angtty:init:' + name, value);
    }

    //for fields that arrrays
    function emitInitArray(name, fieldModel, value) {
      model.book[fieldModel] = value;
      emitInitString(name, model.book[fieldModel]);
    }


    bookrecord.get($rootScope.$stateParams.bookid)
      .then(function( /*data*/ ) {
        //treat book fields here


//        model.book.author = getFirstItemIfOne(model.book.authors);
//        $scope.$emit('angtty:init:authors', model.book.author);

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
        notifier.warning('Livro não encontrado', '', 'Registo/Edição');
      });

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

    function configTT(table){
      model.config[table].ttoptions = angular.extend(
        angular.copy(model.config[table].ttoptions),
        {name: table, remote: '/api/tables/' + table + '/search/%QUERY', prefetch: '/assets/data/' + table + '.json'});
    }

    configTT('author');
    configTT('language');
    configTT('country');
    configTT('publisher');
    configTT('category');
    configTT('keyword');
    configTT('translator');

    /*model.config.authors.ttoptions = angular.extend(
      angular.copy(model.config.authors.ttoptions),
      {name: 'authors', remote: '/api/tables/author/search/%QUERY', prefetch: '/assets/data/authors.json'});
    model.config.languages.ttoptions = angular.extend(
      angular.copy(model.config.languages.ttoptions),
      {name: 'languages', remote: '/api/tables/language/search/%QUERY', prefetch: '/assets/data/languages.json'});
    model.config.countries.ttoptions = angular.extend(
      angular.copy(model.config.countries.ttoptions),
      {name: 'countries', remote: '/api/tables/country/search/%QUERY', prefetch: '/assets/data/countries.json'});
    model.config.publishers.ttoptions = angular.extend(
      angular.copy(model.config.publishers.ttoptions),
      {name: 'publishers', remote: '/api/tables/publisher/search/%QUERY', prefetch: '/assets/data/publishers.json'});
    model.config.categories.ttoptions = angular.extend(
      angular.copy(model.config.categories.ttoptions),
      {name: 'categories', remote: '/api/tables/category/search/%QUERY', prefetch: '/assets/data/categories.json'});
    model.config.keywords.ttoptions = angular.extend(
      angular.copy(model.config.keywords.ttoptions),
      {name: 'keywords', remote: '/api/tables/keyword/search/%QUERY', prefetch: '/assets/data/keywords.json'});
    model.config.translators.ttoptions = angular.extend(
      angular.copy(model.config.translators.ttoptions),
      {name: 'translators', remote: '/api/tables/translator/search/%QUERY', prefetch: '/assets/data/translators.json'});
*/
    var active;

    function logevent( func, item, data ) {
      console.log(func + '----' + item.type, '  --target:', item.currentTarget.name, '--data:', data);
    }

    function removeIfExists( varray, item ) {
      _lodash.remove(varray, function( val ) {
        return val === item;
      });
    }

    model.events = {
      /*onevent: function( item, data ) {
        console.log('type:' + item.type, '--target:', item.currentTarget.name);
        if(item.type === 'typeahead:change' && !data) {
          var v = model.book[item.currentTarget.name];
          if ( v && isArray(v) && v.length > 0 ) {
            console.log('trigggg');

            $scope.$emit('angtty:setval:' + item.currentTarget.name, v[0] );
          }
        }
      },*/
      onevent: function( item, data ) {
        logevent('onevent', item, data);
      },
      onactive: function( item, data ) {
        logevent('onactive', item, data);
        //para evitar abrir as sugestões ao receber p focus
        active = true;
      },
      onopen: function( item, data ) {
        logevent('onopen', item, data);

        //para evitar abrir as sugestões ao receber p focus
        if ( item.type === 'typeahead:beforeopen' ) {
          if ( active ) {
            item.preventDefault();
          }
        }
        active = false;
      },
      onchange: function( event, data ) {
        logevent('onchange', event, data);

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
        logevent('onselect', item, data);

        //        if ( item.type.indexOf('before') === -1 ) {
        //          $scope.$apply(function(){
        //            model.book['authors'].push(data.name);
        //
        //            /*model.book['author'] = model.book['authors'][0];*/
        //          });
        //          $scope.$apply(function() {
        //            $scope.$emit('angtty:setval:authors', model.book['authors'].length > 1 ? '' : model.book['authors'][0]);
        //          });
        //        }
        //
        //        /*$scope.$apply(function() {
        //          var v = model.book[item.currentTarget.name];
        //          if ( v && isArray(v) ) {
        //            model.book[item.currentTarget.name].push(data.name);
        //          }
        //
        //        });*/
      }

    };

    model.bookflags = {
      noinformation: false
    };

    notifier.log('BookRecordCtrl', '', 'Controller');

    model.removeItem = function( field, item ) {
      removeIfExists(model.book[field], item);
      $scope.$emit('angtty:setval:' + field, model.book[field].length > 1 ? '' : model.book[field][0]);
    };

    //////////////
    //util
    function isArray( obj ) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    }

  }

}());
