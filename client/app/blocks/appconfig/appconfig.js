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
      getConfig: getConfig,
      urlAbsolute: function() {
        return $state.href($state.current.name, $state.params, {absolute: true});
      }
    };
    return service;

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
          .then(function(data){
            config[key] = data;
            //appconfigHandler.config[key].loading = false;
            notifier.log('Loaded appconfig.getConfig:','',key);
            return data;
          })
          .catch(function() {
            //appconfigHandler.config[key].loading = false;
            notifier.log('Error loading appconfig.getConfig','',key);
          })
          .finally(function(){
            notifier.log('Finish loading appconfig.getConfig:','',key);
          });
      }
      return promise;

    }
  }
}());

