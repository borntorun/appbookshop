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
      var promise;

      if ( appconfigHandler.config[key].loading === false ) {

        appconfigHandler.config[key].loading = true;

        promise = httpRequest.get({
          url: appconfigHandler.config[key].url
        });

        appconfigHandler.config[key].promisse = promise;

        promise
          .then(function(data){
            config[key] = data;
            appconfigHandler.config[key].loading = false;
            //? appconfigHandler.config[key].promisse = null;
            return data;
          })
          .catch(function() {
            appconfigHandler.config[key].loading = false;
            //? pq esta linha appconfigHandler.config[key].promisse = null;
            notifier.log('Error in appconfig.getConfig');
          });
      }
      return promise;
      /*return config[key] || $http.get(appconfigHandler.config[key].url)
        .then(getConfigComplete)
        .catch(function (message) {
          exception.catcher('Configuração aplicação não obtida')(message);
        });
      */

    }
  }
}());

