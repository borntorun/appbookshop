/**
 * Module appBookShop.booksearch config
 * (João Carvalho, 15-03-2015)
 *
 * Description: Configura modulo appBookShop.booksearch
 */
(function() {
  'use strict';

  var module = angular.module('appBookShop.booksearch');

  module.config(moduleConfig);

  /* @ngInject */
  function moduleConfig( $stateProvider, _lodash, SignalsServiceProvider ) {

    SignalsServiceProvider.config({
      init: true,
      signals: {
        searchexecuted: 'searchexecuted'
      }
    });

    var states = {};


    states['main.search'] = {
      url: '',
      views: {
        'main-content@main': {
          templateUrl: 'app/booksearch/jade/booksearchMain.html'
        },
        'main-left@main': {
          template: ''
        },
        'main-right@main': {
          template: ''
        },
        'main-content-bottom@main': {
          template: ''
        },

        'searchfree@main.search': {
          templateUrl: 'app/booksearch/jade/booksearchFreeForm.html',
          controller: 'BookSearchFreeFormCtrl as vm'
        },
        'searchadvanced@main.search': {
          templateUrl: 'app/booksearch/jade/booksearchAdvancedForm.html',
          controller: 'BookSearchAdvancedFormCtrl as vm'
        },
        'searchfiltercat@main.search': {
          templateUrl: 'app/booksearch/jade/booksearchFilterCatForm.html',
          controller: 'BookSearchFilterCategoriesCtrl as vm'
        }
      },
      deepStateRedirect: {
        default: {
          state: 'main.search.featured'
        },
        params: true/*,
        fn: function($dsr$) {
          .....
        }*/
      }/*,
      sticky: true*/

    };

    states['main.search.featured'] = {
      url: '',
      params: {
        type: { value: 'free', squash: false },
        limit: { value: '25', squash: false },
        term: { value: '', squash: true }
      },
      templateUrl: 'app/booksearch/jade/booksearchResult.html',
      controller: 'BookSearchResultsCtrl as vm'
    };
    states['main.search.results'] = {
      url: 'search/:type/:limit/:term',
      params: {
        type: { value: 'free', squash: false },
        limit: { value: '25', squash: false },
        term: { value: '', squash: true }
      },
      templateUrl: 'app/booksearch/jade/booksearchResult.html',
      controller: 'BookSearchResultsCtrl as vm'

    };
    states['main.search.advresults'] = {
      url: 'search/:type/:limit/:title/:authors/:subject/:collection/:categories/:edition',
      params: {
        type: { value: 'advanced', squash: false },
        limit: { value: '25', squash: false },
        title: { value: '',  squash: '-' },
        authors: { value: '',  squash: '-' },
        subject: { value: '',  squash: '-' },
        collection: { value: '',  squash: '-' },
        categories: { value: '',  squash: '-' },
        edition: { value: '',  squash: '-' }

      },
      templateUrl: 'app/booksearch/jade/booksearchResult.html',
      controller: 'BookSearchResultsCtrl as vm'
    };


    _lodash.forEach(states, function( state, key ) {
      $stateProvider.state(key, state);
    });

  }

}());

