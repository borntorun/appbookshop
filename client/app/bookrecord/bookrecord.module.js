/**
 * Module appBookShop.bookrecord
 * (João Carvalho, 16-03-2015)
 *
 * Description: Book Record feature
 */
(function() {
  'use strict';
  angular.module('appBookShop.bookrecord', [
    'ui.router',
    'blocks.message',
    'blocks.appconfig',
    'blocks.notifier',
    'warp.components',
    'jsSignalsServiceModule',
    'angularTypeaheadjs'
  ])
    .factory('bookrecordCache', function( $cacheFactory ) {
      return $cacheFactory('bookrecordCache');
    });
}());
