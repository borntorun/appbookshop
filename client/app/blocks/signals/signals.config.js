/**
 * Module blocks.signals Configuration
 * (João Carvalho, 16-03-2015)
 *
 * Description: Configura modulo blocks.signals
 */
(function() {
  'use strict';

  var module = angular.module('blocks.signals');

  module.config(config);

  /* @ngInject */
  function config( SignalsServiceProvider ) {

    SignalsServiceProvider.config({
      init: true,
      signals: {
        loginsucceded: 'loginsucceded',
        logoutsucceded: 'logoutsucceded',
        $http403: '$http403',
        $http401: '$http401',
        logoutforced: 'logoutforced',
        logoutisneeded: 'logoutisneeded',
        bookrecordtitlechanged: 'bookrecordtitlechanged',
        reloadbooktosaveneeded: 'reloadbooktosaveneeded',
        searchexecuted: 'searchexecuted'
      }
    });

  }


}());
