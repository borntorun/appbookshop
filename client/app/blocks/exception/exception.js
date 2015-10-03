/**
 * Created by Joao Carvalho on 11-03-2015.
 */
(function() {
  'use strict';

  angular
    .module('blocks.exception')
    .factory('exception', exception);

  /* @ngInject */
  function exception(notifier) {
    var service = {
      catcher: catcher
    };
    return service;

    function catcher(message) {
      return function(reason) {
        notifier.error(message, '',reason);
      };
    }
  }
}());



