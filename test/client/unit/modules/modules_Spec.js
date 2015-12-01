'use strict';

testModule('appBookShop.booksearch', [
  'ui.router',
  'appBookShop.auth',
  'blocks.notifier',
  'blocks.appconfig',
  'warp.components',
  'jsSignalsServiceModule',
  'angularTypeaheadjs',
  'dynamicLayout'
]);
testModule('appBookShop.bookrecord', [
  'ui.router',
  'blocks.message',
  'blocks.appconfig',
  'blocks.notifier',
  'warp.components',
  'jsSignalsServiceModule',
  'angularTypeaheadjs'
]);
