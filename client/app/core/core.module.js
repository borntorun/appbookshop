/**
 * Created by Joao Carvalho on 11-03-2015.
 */
(function() {
  'use strict';

  angular.module('appBookShop.core', [
    /*
     * Angular modules
     */
    //'ngCookies', 'ngResource', 'ngSanitize', 'ngAnimate', 'ui.router', 'ui.bootstrap', 'angular.jquery', 'dynamicLayout',

    /*
     * Our reusable cross app code modules
     */
    //'blocks.exception', 'blocks.logger', 'blocks.router',
    'blocks.notifier',
    'blocks.exception',
    'blocks.appconfig',
    'appBookShop.components',
    /*
     * 3rd Party modules
     */
    'ngplus'
  ]);
}());
