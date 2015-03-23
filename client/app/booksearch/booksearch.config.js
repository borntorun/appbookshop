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
      url: '',
      views: {
        'booksearch-results': {templateUrl: 'app/booksearch/jade/booksearchResult.html', controller: 'BookSearchResultCtrl as vm'}
      }
    };
    states["main.search.results"] = {
      url: 'search/:limit/:term',
      views: {
        'booksearch-results@main': {templateUrl: 'app/booksearch/jade/booksearchResult.html', controller: 'BookSearchResultCtrl as vm'}
      }
    };

    _lodash.forEach(states, function(state, key) {
      $stateProvider.state(key, state);
    });

  }

}());

