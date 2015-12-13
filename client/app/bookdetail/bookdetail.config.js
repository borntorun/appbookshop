/**
 * Module appBookShop.bookdetail Configuration
 * (João Carvalho, 16-03-2015)
 *
 * Description: Configura modulo appBookShop.bookdetail
 */
(function() {
  'use strict';

  var module = angular.module('appBookShop.bookdetail');

  module.config(config);

  module.run(run);

  /* @ngInject */
  function config( $stateProvider, _lodash ) {
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
      },
      resolve: {
        //TODO: something like this...a more generice loader
//        Book: ['loader', function(loader){
//          return loader('bookdetail', 'get').then(function(data){return data;}).catch(function(){return null;});
//        }],

        Book: ['$stateParams', 'bookdetail', function($stateParams, bookdetail) {
          return bookdetail.get($stateParams.reference)
            .then(function(data){
              return data;
            })
            .catch(function(){return null;});
        }],
        $title: ['Book', function(Book) {
          return '[' + (Book || {}).title + ']';
        }]

      }
    };

    _lodash.forEach(states, function( state, key ) {
      $stateProvider.state(key, state);
    });
  }

  //TESTE
  /* @ngInject */
  function run() {
//    angular.module('appBookShop.bookdetail')['_invokeQueue']
//      .forEach(function( value ) {
//        if (value[0] === '$controllerProvider') {
//          value[2][1].prototype.$_$setTitle = function $_$setTitle(value) {
//            console.log(value);
//          };
//        }
//      });
  }
}());
