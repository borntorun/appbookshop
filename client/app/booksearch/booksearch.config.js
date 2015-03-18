/**
 * Module appBookShop.booksearch config
 * (João Carvalho, 15-03-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Descrição: Configura modulo appBookShop.booksearch
 */
(function() {
  'use strict';

  var core = angular.module('appBookShop.booksearch');

  core.config(moduleConfig);

  /* @ngInject */
  function moduleConfig($stateProvider, _lodash) {
    var states = {}


    states["main.search"] = {
      /* Search view for books */
      url: '',
      /* Views affected by this url */
      views: {
        //activa view booksearch-form do main
        'booksearch-form': {templateUrl: 'app/booksearch/jade/booksearchForm.html', controller: 'BookSearchFormCtrl as vm'},
        'booksearch-filter': {templateUrl: 'app/booksearch/jade/booksearchFilterCatForm.html', controller:'BookSearchFilterCategoriesCtrl as vm'},
        '': {templateUrl: 'app/booksearch/jade/booksearchResult.html', controller: 'BookSearchResultCtrl as vm'}
      }
    };
    states["main.search.results"] = {
      url: 'search/:limit/:term',
      views: {
        '@main': {templateUrl: 'app/booksearch/jade/booksearchResult.html', controller: 'BookSearchResultCtrl as vm'}
      }
    };

//    states["main.search"] = {
//      /* Search view for books */
//      url: '',
//      /* Views affected by this url */
//      views: {
//        //activa view principal do main
//        '': {templateUrl: 'app/booksearch/jade/booksearchLayout.html'},
//        //activa view booksearch-form do main.search
//        'booksearch-form@main.search': {templateUrl: 'app/booksearch/jade/booksearchForm.html', controller: 'BookSearchFormCtrl as vm'},
//        //activa view booksearch-catfilter do main.search
//        'booksearch-catfilter@main.search': {templateUrl: 'app/booksearch/jade/booksearchFilterCatForm.html', controller:'BookSearchFilterCategoriesCtrl as vm'},
//        //activa view principal do main.search
//        '@main.search': {
//          templateUrl: 'app/booksearch/jade/booksearchResult.html',
//          controller: 'BookSearchResultCtrl as vm'
//        }
//      }
//    };
//    states["main.search.results"] = {
//      /* Result view for search books (search request)*/
//      //activa view principal do main.search
//      url: 'search/:term',
//      templateUrl: 'app/booksearch/jade/booksearchResult.html',
//      controller: 'BookSearchResultCtrl as vm'
//    };



    _lodash.forEach(states, function(state, key) {
      $stateProvider.state(key, state);
    });

  }

}());

