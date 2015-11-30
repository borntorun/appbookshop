/**
 * Service blocks.appconfig appConfig
 * (João Carvalho, 26-11-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Descrição: Sets/Gets app configuration
 */
(function() {
  'use strict';
  angular.module('blocks.appconfig')
    .provider('appconfigHandler', appconfigHandler)
    .factory('appConfig', appConfig);

  function appconfigHandler() {
    /* jshint validthis:true */
    this.config = {};
    this.$get = function() {
      return {
        config: this.config
      };
    };
  }

  /* @ngInject */
  function appConfig( Q, httpRequest,  $state, appconfigHandler ) {
    var config = {};

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
     * Gets a configuration object from remote url
     * @param {String} key
     * @returns {defer.promise|*}
     */
    function getConfig( key ) {
      var defer = Q.defer();

      if ( config[key] ) {
        defer.resolve(config[key]);
      }
      else {

        httpRequest.get({
          url: appconfigHandler.config[key].url
        })
          .then(function( response ) {
            config[key] = response.data;
            defer.resolve(config[key]);
          })
          .catch(function() {
            defer.resolve({});
          });
      }
      return defer.promise;
    }


  }
}());

