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

  /* @ngInject */
  function appconfig( httpRequest, notifier, appconfigHandler, $state ) {
    var config = {};
    var promise;

    var service = {
      appEndPoint: {
        search: {
          free: '/api/books/search/free',
          advanced: '/api/books/search/advanced'
        }
      },
      getConfig: getConfig,
      urlAbsolute: function() {
        return $state.href($state.current.name, $state.params, {absolute: true});
      }
    };

    return service;

    /**
     * Get a 'config' for something from an url
     * (the config object parameters is configured in core.config)
     * @param key
     * @returns {*}
     */
    function getConfig( key ) {

      if ( config[key] ) {
        return config[key];
      }
      if ( promise == null || promise.$$state.status != 0 /*appconfigHandler.config[key].loading === false*/ ) {
        //appconfigHandler.config[key].loading = true;

        promise = httpRequest.get({
          url: appconfigHandler.config[key].url
        });

        appconfigHandler.config[key].promisse = promise;

        promise
          .then(function( response ) {
            config[key] = response.data;
            return config[key];
            //notifier.log('Loaded appconfig.getConfig:','',key);

          })
          .catch(function() {
            notifier.log('Error loading appconfig.getConfig', '', key);
          })
          .finally(function() {
            //notifier.log('Finish loading appconfig.getConfig:','',key);
          });
      }
      return promise;

    }
  }
}());

