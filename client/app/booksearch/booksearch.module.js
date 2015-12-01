/**
 * Module appBookShop.booksearch
 * (João Carvalho, 12-03-2015)
 *
 * Description: Definição módulo para funcionalidade de pesquisa de livros
 */
(function() {
  'use strict';

  angular.module('appBookShop.booksearch', [
    'ui.router',
    'appBookShop.auth',
    'blocks.notifier',
    'blocks.appconfig',
    'warp.components',
    'jsSignalsServiceModule',
    'angularTypeaheadjs',
    'dynamicLayout'
  ])
    //.directive('bookSearchFormLayout', BookSearchFormLayout)
    .factory('booksearchCache', function( $cacheFactory ) {
      return $cacheFactory('booksearchCache');
    });

}());
