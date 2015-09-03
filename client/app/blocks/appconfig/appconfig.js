/**
 * Created by Joao Carvalho on 12-03-2015.
 */
(function() {
  'use strict';
  angular.module('blocks.appconfig')
    .provider('appconfigHandler', appconfigHandler)
    .factory('appconfig', appconfig);

  function appconfigHandler() {
    /* jshint validthis:true */
    this.config = {
    };
    this.$get = function() {
      return {
        config: this.config
      };
    };
  }

  //appconfig.$inject = ['$http', 'exception', 'notifier', 'appconfigHandler'];
  /* @ngInject */
  function appconfig( $http, exception, notifier, appconfigHandler ) {
    var config = {};
    var service = {
      getConfig: getConfig
    };
    return service;

    function getConfig( key ) {
      if ( config[key] ) {
        return config[key];
      }
      if ( appconfigHandler.config[key].loading === false ) {

        appconfigHandler.config[key].loading = true;

        appconfigHandler.config[key].promisse = $http.get(appconfigHandler.config[key].url);

        appconfigHandler.config[key].promisse
          .then(getConfigComplete).catch(function( message ) {
            appconfigHandler.config[key].loading = false;
            appconfigHandler.config[key].promisse = null;
            exception.catcher(appconfigHandler.config[key].message)(message);
          });
      }
      return appconfigHandler.config[key].promisse;
      /*return config[key] || $http.get(appconfigHandler.config[key].url)
        .then(getConfigComplete)
        .catch(function (message) {
          exception.catcher('Configuração aplicação não obtida')(message);
        });
      */
      function getConfigComplete( resp, status, headers, conf ) {
        config[key] = resp.data;
        appconfigHandler.config[key].loading = false;
        appconfigHandler.config[key].promisse = null;
        //notifier.info(appconfigHandler.config[key].message);
        return config[key];
      }
    }
  }
}());

