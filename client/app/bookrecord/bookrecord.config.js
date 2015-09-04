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
  function moduleConfig( $stateProvider, _lodash ) {
    var states = {}

    states["main.bookrecord"] = {
      /* boorecord view for book */
      /* ATENÇÃO: NÃO COLOCAR / NO INÍCIO ... CHILD VIEW */
      url: 'admin/livro/{bookid}',
      /* Views affected by this url */
      views: {
        '': {
          templateUrl: 'app/bookrecord/views/bookrecord.html',
          controller: 'BookrecordCtrl as model'
        },
        'main-left@main': {
          template: 'views navbarleft-books (main.jade)'
        },
        'main-right@main': {
          templateUrl: 'app/bookrecord/views/bookrecordNavRight.html'
        },
        'bookrecord-store@main.bookrecord': {
          templateUrl: 'app/bookrecord/views/bookrecordStore.html',
          controller: 'BookrecordStoreCtrl as model'
        },
        'main-content-bottom@main': {
          template: 'view main-content-bottom (main.jade)'
        },
        'hint@': {
          template: 'view hint - index.html'
        }
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
        bookconfig: [ 'bookconfig', function( bookconfig ) {
          return bookconfig;
        }]
      }
    };
    _lodash.forEach(states, function( state, key ) {
      $stateProvider.state(key, state);
    });
  }

}());
