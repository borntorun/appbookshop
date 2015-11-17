/**
 * Module appBookShop.booksearch config
 * (João Carvalho, 15-03-2015)
 *
 * Description: Configura modulo appBookShop.booksearch
 */
(function() {
  'use strict';

  var core = angular.module('appBookShop.booksearch');

  core.config(moduleConfig);

  /* @ngInject */
  function moduleConfig( $stateProvider, _lodash ) {
    var states = {};


    states['main.search'] = {
      url: '',
      views: {
        'main-content@main': {
          templateUrl: 'app/booksearch/jade/booksearchMain.html'
        }
      },
      deepStateRedirect: {
        default: {
          state: 'main.search.featured'/*,
          params: {
            type: 'free',
            limit: 25,
            term: 'nobel'
          }*/
        },
        params: true/*,
        fn: function($dsr$) {
          .....
        }*/
      }
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
        title: { value: '', squash: true },
        authors: { value: '', squash: true },
        subject: { value: '', squash: true },
        collection: { value: '', squash: true },
        categories: { value: '', squash: true },
        edition: { value: '', squash: true }

      },
      templateUrl: 'app/booksearch/jade/booksearchResult.html',
      controller: 'BookSearchResultsCtrl as vm'
    };


    _lodash.forEach(states, function( state, key ) {
      $stateProvider.state(key, state);
    });

  }

}());

