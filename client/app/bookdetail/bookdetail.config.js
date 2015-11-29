/**
 * Module appBookShop.bookdetail Configuration
 * (João Carvalho, 16-03-2015)
 *
 * Description: Configura modulo appBookShop.bookdetail
 */
(function() {
  'use strict';

  var module = angular.module('appBookShop.bookdetail');

  module.config(moduleConfig);

  /* @ngInject */
  function moduleConfig($stateProvider, _lodash) {
    var states = {};

    states['main.bookdetail'] = {
      /* Detail view for book */
      /* ATENÇÃO: NÃO COLOCAR / NO INÍCIO ... CHILD VIEW */

      url: '{type:book|livro}/{reference}/{slug}',
      params: {
        slug: { value: null, squash: true }
      },
      /* Views affected by this url */
      views: {
        'main-content@main': {
          templateUrl: 'app/bookdetail/jade/bookdetailPageLayout.html',
          controller: 'BookDetailPageCtrl as vm'
        }
      }
    };

    _lodash.forEach(states, function(state, key) {
      $stateProvider.state(key, state);
    });
  }
}());
