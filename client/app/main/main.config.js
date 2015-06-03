/**
 * Created by Joao Carvalho on 12-03-2015.
 */
(function() {
  'use strict';

  var core = angular.module('appBookShop.main');

  core.config(moduleConfig);

  /* @ngInject */
  function moduleConfig($stateProvider, _lodash) {
    var states = {}

    states["main"] = {
      /* Main view da aplicação */
      abstract: true,
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'Main as vm',
      resolve: {
        bookconfig: ['appconfig', function (appconfig) {
          return appconfig.getConfig('bookconfig');
        }]
      }
    };

    _lodash.forEach(states, function(state, key) {
      $stateProvider.state(key, state);
    });

  }

}());

