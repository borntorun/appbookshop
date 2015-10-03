/**
 * Created by Joao Carvalho on 11-03-2015.
 */
(function() {
  'use strict';

  angular
    .module('blocks.notifier')
    .factory('notifier', notifier);


  /* @ngInject */
  function notifier( $log, toastr) {
    var service = {
      showToasts: true,

      error: function(message, title, data) {
        return write('error', message, title, data, {timeOut: 2500});
      },
      info: function(message, title, data) {
        return write('info', message, title, data, {timeOut: 2500});
      },
      success: function(message, title, data) {
        return write('success', message, title, data, {timeOut: 2500});
      },
      warning: function(message, title, data) {
        return write('warning', message, title, data, {timeOut: 2500});
      },
      warn: function(message, title, data) {
        return write('warning', message, title, data, {timeOut: 2500});
      },
      /*errorx   : error,
      info    : info,
      success : success,
      warning : warning,
      warn : warning,*/
      log: log //straight to console; bypass toastr

    };

    var mapActionsLog = {
      error: 'error',
      info: 'info',
      success: 'info',
      warning: 'warn'
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

    function write(type, message, title, data, options) {
      verifyBottomPosition();
      toastr[type](message, title, options);
      $log[mapActionsLog[type]](message, getData(data));
    }

    function log(message, data) {
      //straight to console; bypass toastr
      $log.log(message, getData(data));
    }

    /*function error(message, data, title) {
      write('error', message, title, data, {timeOut: 2500});
//      verifyBottomPosition();
//      toastr.error(message, title, );
//      $log.error(message, getData(data));

    }

    function info(message, data, title) {
      verifyBottomPosition();
      toastr.info(message, title, {timeOut: 2500});
      $log.info(message, getData(data));
    }

    function success(message, data, title) {
      verifyBottomPosition();
      toastr.success(message, title, {timeOut: 2500});
      $log.info(message, getData(data));
    }

    function warning(message, data, title) {
      verifyBottomPosition();
      toastr.warning(message, title, {timeOut: 2500});
      $log.warn(message, getData(data));
    }*/



  }
}());

