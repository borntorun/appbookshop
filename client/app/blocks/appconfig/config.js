/**
 * Service blocks.appconfig <message|book>Config
 * (João Carvalho, 26-11-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Descrição: Creates this services:
 * - bookConfig: Load book related configuration
 * - messageConfig: Load message popup related configuration
 */
(function() {
  'use strict';
  angular
    .module('blocks.appconfig')
    .run(run)
    .factory('messageConfig', config('message'))
    .factory('bookConfig', config('book'));

  var obj = {};
//  var groups = ['book', 'message'];

  /* @ngInject */
  function run(appconfig, appconfigHandler) {

    function getConfigKey(k) {
      appconfig.getConfig(k).then(function(value){
        obj[k] = value;
      });
    }

    for (var k in appconfigHandler.config) {
      //a function is needed to create a new scope/closure for var k
      //if the statement 'obj[k] = value;' is made here
      //because of the promise the value is always set on the last 'k' after all the promise/get return
      getConfigKey(k);
    }

  }

  function config(group) {
    return function() {
      return obj[group];
    };
  }
}());
