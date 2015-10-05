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

    /*states['main.search'] = {
      url: '',
      views: {
        '': {
          templateUrl: 'app/booksearch/jade/booksearchMain.html'
        },
        'booksearch-panel@main.search': {
          templateUrl: 'app/booksearch/jade/booksearchLayout.html'
        },
        'booksearch-results@main.search': {
          templateUrl: 'app/booksearch/jade/booksearchResult.html',
          controller: 'BookSearchResultCtrl as vm'
        }
      }
    };*/
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
          var shouldRedirect = // TODO finish docs;
        }*/
      }
    };
    
    states['main.search.featured'] = {
      url: '',
      templateUrl: 'app/booksearch/jade/booksearchResult.html',
      controller: 'BookSearchResultCtrl as vm'
    };
    states['main.search.results'] = {
      url: 'search/:type/:limit/:term',
      templateUrl: 'app/booksearch/jade/booksearchResult.html',
      controller: 'BookSearchResultCtrl as vm'

    };
    states['main.search.advresults'] = {
      url: 'search/:type/:limit/:title/:authors/:subject/:collection/:categories/:edition',
      templateUrl: 'app/booksearch/jade/booksearchResult.html',
      controller: 'BookSearchResultCtrl as vm'
    };
    /*states['main.search.results'] = {
      url: 'search/:type/:limit/:term',
      views: {
        'booksearch-results@': {
          templateUrl: 'app/booksearch/jade/booksearchResult.html',
          controller: 'BookSearchResultCtrl as vm'
        }
      }
    };
    states['main.search.advresults'] = {
      url: 'search/:type/:limit/:title/:authors/:subject/:collection/:categories/:edition',
      views: {
        'booksearch-results@': {
          templateUrl: 'app/booksearch/jade/booksearchResult.html',
          controller: 'BookSearchResultCtrl as vm'
        }
      }
    };*/

    _lodash.forEach(states, function( state, key ) {
      $stateProvider.state(key, state);
    });

  }

}());

