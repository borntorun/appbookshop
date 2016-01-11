/**
 * Module appBookShop.bookrecord Configuration
 * (João Carvalho, 16-03-2015)
 *
 * Description: Configura modulo appBookShop.bookrecord
 */
(function() {
  'use strict';

  var module = angular.module('appBookShop.bookrecord');

  module.config(config);

  /* @ngInject */
  function config( $stateProvider, _lodash ) {
    var states = {};

    ///{ref:[\\d]*}
    states['main.bookrecord'] = {
      /* boorecord view for book */
      /* ATENÇÃO: NÃO COLOCAR / NO INÍCIO ... CHILD VIEW */
      url: '{area:admin}/{type:book|livro}/:reference/:slug',
      params: {
        slug: { value: null, squash: true },
        area: { value: 'admin', squash: false }
      },

      /* Views affected by this url */
      views: {
        'main-content@main': {
          templateUrl: 'app/bookrecord/views/bookrecord.html',
          controller: 'BookrecordCtrl as model'
        },
        'main-left@main': {
          templateUrl: 'app/bookrecord/views/bookrecordNavLeft.html'
        },
        'main-right@main': {
          templateUrl: 'app/bookrecord/views/bookrecordNavRight.html'
        },
        'store@main.bookrecord': {
          templateUrl: 'app/bookrecord/views/bookrecordStore.html',
          controller: 'BookrecordStoreCtrl as model'
        },
        'coverupload@main.bookrecord': {
          templateUrl: 'app/bookrecord/views/bookrecordCoverUpload.html',
          controller: 'BookrecordCoverUploadCtrl as model'
        },
        'similartitle@main.bookrecord': {
          templateUrl: 'app/bookrecord/views/bookrecordSimilarTitle.html',
          controller: 'BookrecordSimilarTitleCtrl as model'
        }
      },
      authorization: {
        requires: {
          login: true
        }
        /*,
        requiredPermissions: ['Admin', 'UserManager'],
        permissionType: 'AtLeastOne'*/
      },
      resolve: {
        Book: ['$stateParams', 'bookrecord', function( $stateParams, bookrecord) {
          return bookrecord.edit($stateParams.reference)
            .then(function( data ) {
              return data;
            })
            .catch(function() {
              return null;
            });
        }],
        $title: ['Book', function( Book ) {
          return '[Edit:' + ((Book || {}).title || 'novo') + ']';
        }]
      }

    };

    _lodash.forEach(states, function( state, key ) {
      $stateProvider.state(key, state);
    });
  }


}());
