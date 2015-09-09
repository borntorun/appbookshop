/**
 * Created by Joao Carvalho on 11-03-2015.
 */
(function() {
  'use strict';

  angular
    .module('blocks.notifier')
    .factory('notifier', notifier);

  //notifier.$inject = ['$log', '$window', 'toastr'];
  /* @ngInject */
  function notifier($log, $window, toastr) {
    var service = {
      showToasts: true,

      error   : error,
      info    : info,
      success : success,
      warning : warning,
      warn : warning,

      // straight to console; bypass toastr
      log     : $log.log
    };

    return service;
    /////////////////////

    function getData(data) {
      var defaultData = data || 'No data recorded';
      return angular.fromJson( angular.toJson(defaultData));
    }

    function verifyBottomPosition() {
      //temp
      /*var mediaDesktop = $window.matchMedia('(max-width: 991px)');
      if (mediaDesktop.matches) {
        toastr.options.positionClass = 'toast-bottom-right';
      }*/
    }

    function error(message, data, title) {
      message = message || 'Erro na pagina.';
      verifyBottomPosition()
      toastr.error(message, title);
      $log.error(message, getData(data));

    }

    function info(message, data, title) {
      verifyBottomPosition()
      toastr.info(message, title);
      $log.info(message, getData(data));
    }

    function success(message, data, title) {
      verifyBottomPosition()
      toastr.success(message, title);
      $log.info(message, getData(data));
    }

    function warning(message, data, title) {
      verifyBottomPosition()
      toastr.warning(message, title);
      $log.warn(message, getData(data));
    }
  }
}());

