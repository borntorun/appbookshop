/**
 * Created by Joao Carvalho on 27-11-2015.
 */
(function() {
  'use strict';

  var module = angular.module('blocks.appconfig');

  module.config(config);

  /* @ngInject */
  function config(appconfigHandlerProvider) {
    appconfigHandlerProvider.config = {
      book: {url: '/api/appconfig/book/', message: 'Configuração \'bookconfig\'.', loading: false},
      message: {url: '/api/appconfig/message/', message: 'Configuração \'messageconfig\'.', loading: false}
    };
  }
}());
