/**
 * Created by Joao Carvalho on 12-03-2015.
 */
(function() {
  'use strict';

  angular
    .module('appBookShop.main')
    .controller('Main', Main);

  /* @ngInject */
  function Main(notifier, bookconfig) {
    /*jshint validthis: true */
    var vm = this;

//    if (bookconfig.data.labels) {
//      console.log(bookconfig.data.labels);
//    }
//    if (xpto.data.labels) {
//      console.log(xpto.data.labels);
//    }

    //notifier.info('Activated Main View');


  }
}());

