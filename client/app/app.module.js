/**
 * Created by Joao Carvalho on 11-03-2015.
 */
(function() {
  'use strict';
  angular.module('appBookShop', [
    /*
     * Order is not important. Angular makes a
     * pass to register all of the modules listed
     */
    'ngCookies', 'ngResource', 'ngSanitize', 'ngAnimate', 'ui.router','ct.ui.router.extras', 'ui.bootstrap', 'dynamicLayout',
    'angularTypeaheadjs', 'jsSignalsServiceModule'/*'testDirective',*/
    /*
     * Everybody has access to these.
     * We could place these under every feature area,
     * but this is easier to maintain.
     */
    ,'appBookShop.core'
    /*
     * Feature areas
     */
    ,'appBookShop.main'
    ,'appBookShop.auth'
    ,'appBookShop.navbar'
    ,'appBookShop.booksearch'
    ,'appBookShop.bookdetail'
    ,'appBookShop.bookrecord'
  ]);
}());
