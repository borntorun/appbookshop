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
  function toastrConfig( toastr ) {
    toastr.options.closeButton = false;
    toastr.options.debug = false;
    toastr.options.progressBar = false;
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
    appErrorPrefix: '[Livros & Livros] ', //Configure the exceptionHandler decorator
    appTitle: 'Livros & Livros',
    version: '0.0.1'
  };
  core.value('config', config);
  /*
  Configure providers for module
   */
  core.config(configureAngularProviders);
  core.config(configureOtherProviders);


  /* @ngInject */
  function configureAngularProviders( $httpProvider, $logProvider, $urlRouterProvider, $locationProvider, $animateProvider, $stickyStateProvider ) {
    $httpProvider.useApplyAsync(true);
    $animateProvider.classNameFilter(/(carousel|dynamic-layout|app-anima)/);//feature do ngAnimate...
    // turn debugging off/on (no info or warn)
    if ( $logProvider.debugEnabled ) {
      $logProvider.debugEnabled(true);
    }


//    $urlRouterProvider
//      .when('/:area/:type/:reference/:slug', ['$state', '$match', '$stateParams',function ($state, $match, $stateParams) {
//        console.log($state);
//        console.log($match);
//        console.log($stateParams);
//      }]);

    $urlRouterProvider.otherwise('/');


    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    $stickyStateProvider.enableDebug(false);
  }

  /* @ngInject */
  function configureOtherProviders( exceptionHandlerProvider, SignalsServiceProvider ) {
    // Configure the common exception handler
    exceptionHandlerProvider.configure(config.appErrorPrefix);
    // Configure the appConfig provider
    // inserir outras confs

    SignalsServiceProvider.config({
      init: true,
      signals: {
        searched: 'searched'
      }
    });
  }

  core.run(run);
  /* @ngInject */
  function run( $rootScope, $state, $stateParams, $location ) {
    if($location.host() === 'local.host'){
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
    }

  }

  core.run(runStateChangeError);


  /* @ngInject */
  function runStateChangeError($rootScope, err) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
      throw err('Erro ao carregar: ' + toState.name, error);//notifier.error('Erro ao carregar: ' + toState.name, error);
    });
  }

}());

