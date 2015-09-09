/**
 * Created by Joao Carvalho on 11-03-2015.
 */
(function() {
  'use strict';

  angular.module('appBookShop.core', [

    /*
     * Our reusable cross app code modules
     */
    //'blocks.exception', 'blocks.logger', 'blocks.router',
    'appBookShop.components',
    'blocks.notifier',
    'blocks.exception',
    'blocks.appconfig',

    /*
     * 3rd Party modules
     */
    'ngplus'
  ]);
}());
