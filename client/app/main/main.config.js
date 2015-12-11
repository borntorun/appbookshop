/**
 * Created by Joao Carvalho on 12-03-2015.
 */
(function() {
  'use strict';

  var module = angular.module('appBookShop.main');

//  module
//    .service('BookconfigInit', BookconfigInit);
//  /* @ngInject */
//  function BookconfigInit( Q, appConfig ) {
//    return {
//      prepare: function() {
//        return Q.when(appConfig.getConfig('bookconfig'), function( value ) {
//          return value.data || value;
//        }, function() {
//          return {};
//        });
//      }
//    };
//  }
//
//  var interceptWith = function( initMethod ) {
//    return [initMethod, function( m ) {
//      return m.prepare();
//    }];
//  };

  module.config(moduleConfig);



  /* @ngInject */
  function moduleConfig( $stateProvider, _lodash ) {
    var states = {};

    states['main'] = {
      /* Main view da aplicação */
      abstract: true,
      url: '/',
      templateUrl: 'app/main/views/main.html',
      controller: 'Main as vm',
      deepStateRedirect: {
        default: {
          state: 'main.search'
        }
      },
      sticky: true
    };

    states['message'] = {
      url: '/message/:term', /*QD não tem url  não colocar key */
      views: {
        'auxiliar': {
          template: '',
          controller: ['$state', 'notifier', function( $state, notifier ) {
            notifier.warning($state.params.term);
            $state.go('main.search', {notify: true});
          }]
        }
      }
    };
    states['googlelogin'] = {
      /* ATENÇÃO: NÃO COLOCAR / NO INÍCIO ... CHILD VIEW */
      //      url: '', /*QD não tem url  não colocar key */
      url: '/login/:signal',
      views: {
        'auxiliar': {
          template: ' ',
          controller: 'AuthenticationLoginCtrl as model',
          params: {
            signal: { value: '', squash: true }
          }
        }
      }
    };
    states['logout'] = {
      /* ATENÇÃO: NÃO COLOCAR / NO INÍCIO ... CHILD VIEW */
      //      url: '', /*QD não tem url  não colocar key */
      url: '/logout/:signal',
      views: {
        'auxiliar': {
          template: ' ',
          controller: 'AuthenticationLogoutCtrl as model',
          params: {
            signal: { value: '', squash: true }
          }
        }
      }
    };

    _lodash.forEach(states, function( state, key ) {
      $stateProvider.state(key, state);
    });
  }
}());

