/**
 * Module appBookShop.bookrecord Configuration
 * (João Carvalho, 16-03-2015)
 *
 * Descrição: Configura modulo appBookShop.bookrecord
 */
(function() {
  'use strict';

  var core = angular.module('appBookShop.bookrecord');


  core.config(moduleConfig);

  /* @ngInject */
  function moduleConfig($stateProvider, _lodash) {
    var states = {}

    states["main.bookrecord"] = {
      /* Detail view for book */
      /* ATENÇÃO: NÃO COLOCAR / NO INÍCIO ... CHILD VIEW */
      url: 'admin/livro/{bookid}',
      /* Views affected by this url */
      views: {
        '': {
          templateUrl: 'app/bookrecord/views/bookrecord.html',
          controller: 'BookrecordCtrl as model'}
        /*,
        'navbarleft-books': {
          templateUrl: 'app/bookrecord/views/bookrecordFotoLayout.html'
        }*/
        /* View existente na main view / no index.html *//*
        ,
        'hint@': {
          template: 'teste xpto'
        }*/
      },
      resolve: {
        bookconfig: [ 'bookconfig', function (bookconfig) {
          return bookconfig;
        }]
      }
    };
    _lodash.forEach(states, function(state, key) {
      $stateProvider.state(key, state);
    });
  }

}());
