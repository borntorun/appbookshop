/**
 * Created by Joao Carvalho on 11-03-2015.
 */
(function() {
  'use strict';

  var core = angular.module('appBookShop.core');

  /*
  Config da library toastr
   */
  core.config(toastrConfig);

  /* @ngInject */
  function toastrConfig(toastr) {
    toastr.options.closeButton = false;
    toastr.options.debug = false,
    toastr.options.progressBar = false,
    toastr.options.positionClass = 'toast-top-right';
    toastr.options.onclick = null;
    toastr.options.showDuration = 300;
    toastr.options.hideDuration = 1000;
    toastr.options.timeOut = 2000;
    toastr.options.extendedTimeOut = 1000;
    toastr.options.showEasing = 'swing';
    toastr.options.hideEasing = 'linear';
    toastr.options.showMethod = 'fadeIn';
    toastr.options.hideMethod = 'fadeOut';
  }

  /*
  Config object for module
   */
  var config = {
    appErrorPrefix: '[Livraria Torres Erro] ', //Configure the exceptionHandler decorator
    appTitle: 'Livraria Torres',
    version: '0.0.1'
  };
  core.value('config', config);

  /*
  Configure providers for module
   */
  core.config(configure);


  /* @ngInject */
  function configure ( $logProvider, $urlRouterProvider, $locationProvider, exceptionHandlerProvider, appconfigHandlerProvider)  {
    // turn debugging off/on (no info or warn)
    if ($logProvider.debugEnabled) {
      $logProvider.debugEnabled(true);
    }

    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    // Configure the common exception handler
    exceptionHandlerProvider.configure(config.appErrorPrefix);

    // Configure the appconfig provider
    // inserir outras confs
    appconfigHandlerProvider.config.bookconfig = {url: '/api/bookconfig/', message: 'Configuração \'bookconfig\'.', loading: false};

  }

  core.run(run);

  /* @ngInject */
  function run ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    //$rootScope._ = window._;
    //$rootScope.$ = window.$;
  }

//  function configure ($logProvider, $routeProvider, routehelperConfigProvider, exceptionHandlerProvider) {
//    // turn debugging off/on (no info or warn)
//    if ($logProvider.debugEnabled) {
//      $logProvider.debugEnabled(true);
//    }
//
//    // Configure the common route provider
//    routehelperConfigProvider.config.$routeProvider = $routeProvider;
//    routehelperConfigProvider.config.docTitle = 'NG-Modular: ';
//    var resolveAlways = {  @ngInject
//      ready: function(dataservice) {
//        return dataservice.ready();
//      }
//      // ready: ['dataservice', function (dataservice) {
//      //    return dataservice.ready();
//      // }]
//    };
//    routehelperConfigProvider.config.resolveAlways = resolveAlways;
//
//    // Configure the common exception handler
//    exceptionHandlerProvider.configure(config.appErrorPrefix);
//  }
}());

