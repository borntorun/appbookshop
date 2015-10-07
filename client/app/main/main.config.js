/**
 * Created by Joao Carvalho on 12-03-2015.
 */
(function() {
  'use strict';

  var core = angular.module('appBookShop.main');

  core.config(moduleConfig);

  /* @ngInject */
  function moduleConfig($stateProvider, _lodash) {
    var states = {};


    states['main'] = {
      /* Main view da aplicação */
      abstract: true,
      url: '/',
      templateUrl: 'app/main/views/main.html',
      controller: 'Main as vm',
      resolve: {
        bookconfig: ['appconfig', function (appconfig) {
          return appconfig.getConfig('bookconfig');
        }]
      },
      sticky: true
    };

    states['message'] = {
      url: '/message/:term', /*QD não tem url  não colocar key */
      views: {
        'auxiliar': {
          template: '',
          controller: ['$state', 'notifier', function($state, notifier) {
            notifier.warning($state.params.term);

            $state.go('main.search');
          }]
        }
      }
    };

    states['googlelogin'] = {
      /* ATENÇÃO: NÃO COLOCAR / NO INÍCIO ... CHILD VIEW */
//      url: '', /*QD não tem url  não colocar key */
      views: {
        'auxiliar': {
          template: '',
          controller: 'AuthLoginCtrl as model'
        }
      }
    };
    states['logout'] = {
      /* ATENÇÃO: NÃO COLOCAR / NO INÍCIO ... CHILD VIEW */
      //      url: '', /*QD não tem url  não colocar key */
      views: {
        'auxiliar': {
          template: '',
          controller: 'AuthLogoutCtrl as model'
        }
      }
    };

    _lodash.forEach(states, function(state, key) {
      $stateProvider.state(key, state);
    });
  }
}());

