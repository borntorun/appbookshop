/**
 * Module appBookShop.bookdetail Configuration
 * (João Carvalho, 16-03-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Descrição: Configura modulo appBookShop.bookdetail
 */
(function() {
  'use strict';

  var core = angular.module('appBookShop.bookdetail');

  core.config(moduleConfig);

  /* @ngInject */
  function moduleConfig($stateProvider, _lodash) {
    var states = {}

    states["main.bookdetail"] = {
      /* Detail view for book */
      url: 'livro/{bookid}',
      /* Views affected by this url */
      views: {
        '': {templateUrl: 'app/bookdetail/jade/bookdetailPageLayout.html',controller: 'BookDetailPageCtrl as vm'},
        'booksearch-form@main': {templateUrl: 'app/booksearch/jade/booksearchForm.html', controller: 'BookSearchFormCtrl as vm'},
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
        bookconfig: [ 'bookconfig', function (bookconfig) {
          return bookconfig;
        }]
      }
    };
    _lodash.forEach(states, function(state, key) {
      $stateProvider.state(key, state);
    });

  }

}());
