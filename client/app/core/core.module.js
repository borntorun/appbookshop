/**
 * Created by Joao Carvalho on 11-03-2015.
 */
(function() {
  'use strict';

  angular.module('appBookShop.core', [

    /*
     * Our reusable cross app code modules
     */
    'warp.components',
    'blocks.notifier',
    'blocks.exception',
    'blocks.appconfig',
    'blocks.message',

    /*
     * 3rd Party modules
     */
    //'ngplus' //this is from extras.angular.plus - https://github.com/AngularPlus/AngularPlus - install with bower
  ]);
}());
