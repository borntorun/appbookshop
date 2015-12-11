(function() {
  'use strict';

  var module = angular.module('blocks.httpInterceptor');


  module.config(config);

  /* @ngInject */
  function config($httpProvider) {
    //order is important:
    //in request FIFO - first pushed first called
    //in response LIFO - last pushed first called
    $httpProvider.interceptors.push('httpErrStatusInterceptor');
    $httpProvider.interceptors.push('httpErrEmptyResponseInterceptor');



  }

}());



