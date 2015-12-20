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
  /*jshint validthis: true */
  angular.module('blocks.appconfig')
    .provider('appConfig', appconfigProvider);

  /* @ngInject */
  function appconfigProvider() {
    var _config = {};

    /* @ngInject */
    this.$get = function( $state, Q, httpRequest ) {
      var service = {};

      service.urlAbsolute = function() {
        return $state.href($state.current.name, $state.params, {absolute: true});
      };

      //service.all = [];

      for ( var k in _config ) {
        //service.all.push(setKey(k));
        setKey(k);
      }

      function setKey( key ) {
        var k = key;
        getConfig(key).then(function( value ) {
          service[k] = value;
        });
      }

      function getConfig( key ) {
        var defer = Q.defer();

        httpRequest.get({
          url: _config[key].url
        })
          .then(function( response ) {
            defer.resolve(response.data.config || {});
          })
          .catch(function() {
            defer.resolve({});
          });

        return defer.promise;
      }

      return service;
    };
    this.config = function( config ) {
      angular.extend(_config, config || {});
    };
  }

  //  angular.module('blocks.appconfig')
  //    .provider('appconfigHandler', appconfigHandler)
  //    .factory('appConfig', appConfig);
  //
  //  function appconfigHandler() {
  //    /* jshint validthis:true */
  //    this.config = {};
  //
  //    this.$get = function() {
  //      return {
  //        config: this.config
  //      };
  //    };
  //  }
  //
  //  /* @ngInject */
  //  function appConfig( Q, httpRequest, $state, appconfigHandler ) {
  //    var config = {};
  //
  //    var service = {
  //      appEndPoint: {
  //        search: {
  //          free: '/api/books/search/free',
  //          advanced: '/api/books/search/advanced'
  //        }
  //      },
  //      //getConfig: getConfig,
  //      urlAbsolute: function() {
  //        return $state.href($state.current.name, $state.params, {absolute: true});
  //      }
  //    };
  //
  //
  //    function setKey( key ) {
  //      var k = key;
  //      return getConfig(key).then(function( value ) {
  //        service[k] = value;
  //      });
  //    }
  //
  //    //novo
  //    for ( var k in appconfigHandler.config ) {
  //      setKey(k);
  //    }
  //
  //    return service;
  //
  //    /**
  //     * Gets a configuration object from remote url
  //     * @param {String} key
  //     * @returns {defer.promise|*}
  //     */
  //    function getConfig( key ) {
  //      var defer = Q.defer();
  //
  //      if ( config[key] ) {
  //        defer.resolve(config[key]);
  //      }
  //      else {
  //
  //        httpRequest.get({
  //          url: appconfigHandler.config[key].url
  //        })
  //          .then(function( response ) {
  //            config[key] = response.data.config;
  //            defer.resolve(config[key]);
  //          })
  //          .catch(function() {
  //            defer.resolve({});
  //          });
  //      }
  //      return defer.promise;
  //    }
  //
  //  }
}());

