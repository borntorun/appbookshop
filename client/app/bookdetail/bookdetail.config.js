/**
 * Module appBookShop.bookdetail Configuration
 * (João Carvalho, 16-03-2015)
 *
 * Description: Configura modulo appBookShop.bookdetail
 */
(function() {
  'use strict';

  var core = angular.module('appBookShop.bookdetail');

  core.config(moduleConfig);

  /* @ngInject */
  function moduleConfig($stateProvider, _lodash) {
    var states = {};

    states['main.bookdetail'] = {
      /* Detail view for book */
      /* ATENÇÃO: NÃO COLOCAR / NO INÍCIO ... CHILD VIEW */

      url: '{type:book|livro}/{reference}/{slug}',
      params: {
        slug: { value: null, squash: true }
      },
      /* Views affected by this url */
      views: {
        '': {templateUrl: 'app/bookdetail/jade/bookdetailPageLayout.html',controller: 'BookDetailPageCtrl as vm'},
        'navbarleft-books@main': {
          template: 'teste1'
        },
        'main-bottom@main': {
          template: 'view bottom'
        }
        /*,
        'navbarleft-books': {
          templateUrl: 'components/books/detail/bookDetailFeatured.html'
        },
        *//* View existente na main view / no index.html *//*
        'hint@': {
          template: 'teste xpto'
        }*/
      },
      resolve: {
        /*bookconfig: [ 'bookconfig', function (bookconfig) {
          return bookconfig;
        }]*/
        bookconfig: ['appconfig', function (appconfig) {
          return appconfig.getConfig('bookconfig');
        }]
      }
    };
    _lodash.forEach(states, function(state, key) {
      $stateProvider.state(key, state);
    });

  }

}());
