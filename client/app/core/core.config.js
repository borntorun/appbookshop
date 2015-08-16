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
    appErrorPrefix: '[Livraria Torres Erro] ', //Configure the exceptionHandler decorator
    appTitle: 'Livraria Torres',
    version: '0.0.1'
  };
  core.value('config', config);
  /*
  Configure providers for module
   */
  core.config(configureAngularProviders);
  core.config(configureOtherProviders);
//  core.config(configTest);
  /* @ngInject */
  function configureAngularProviders( $httpProvider, $logProvider, $urlRouterProvider, $locationProvider, $animateProvider ) {
    $httpProvider.useApplyAsync(true);
    $animateProvider.classNameFilter(/(carousel|dynamic-layout|app-anima)/);//feature do ngAnimate...
    // turn debugging off/on (no info or warn)
    if ( $logProvider.debugEnabled ) {
      $logProvider.debugEnabled(true);
    }
    $urlRouterProvider
      .otherwise('/');
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }

  /* @ngInject */
  function configureOtherProviders( exceptionHandlerProvider, appconfigHandlerProvider, SignalsServiceProvider ) {
    // Configure the common exception handler
    exceptionHandlerProvider.configure(config.appErrorPrefix);
    // Configure the appconfig provider
    // inserir outras confs
    appconfigHandlerProvider.config.bookconfig = {url: '/api/bookconfig/', message: 'Configuração \'bookconfig\'.', loading: false};
    //
    SignalsServiceProvider.config({
      init: true,
      signals: {
        searched: 'searched'
      }
    });
  }

//  /* @ngInject */
//  function configTest( lfDriver, simpleBasket ) {
//    lfDriver
//      .create(lfDriver.STORAGE.LOCALSTORAGE, {name: 'livrariaTorres', storeName: 'livros', key: 'basketshop'})
//      .then(function( value ) {
//
//        var basket = simpleBasket.create();
//        basket.implements(basket.ISTORAGE, value);
//        console.log('count=', basket.count());
//        basket.load()
//          .then(function(){
//            console.log('count in=', basket.count());
//          });
//        console.log('count out=', basket.count());
//        /*basket.add({key:1, titulo:'teste'},{key:2, titulo:'teste 2'});
//
//        console.log('count=',basket.count());
//        console.log('basket before save=',basket.getAll());
//
//        basket.save()
//          .then(function( data ) {
//            console.log('save=',data);
//          })
//          .catch(function( error ) {
//            console.log('save error=',error);
//          });
//
//        console.log('count before remove=',basket.count());
//        console.log('basket before remove=',basket.getAll());
//
//        basket.removeAll();
//
//        console.log('count after remove=',basket.count());
//        console.log('basket before remove=',basket.getAll());
//
//        basket.load()
//          .then(function( data ) {
//            console.log('count after 1 load=',basket.count());
//            console.log('basket after 1 load=',basket.getAll());
//            return basket.clear();
//          })
//          .then(function( data ) {
//            return basket.load();
//          })
//          .then(function( data ) {
//            console.log('count after 2 load=',basket.count());
//            console.log('basket after 2 load=',basket.getAll());
//            basket.add({key:1000, titulo:'teste'},{key:2000, titulo:'teste 2'});
//            basket.save();
//
//
//          })
//          .catch(function( error ) {
//            console.log('load error=',error);
//          });*/
//
//      });
//  }

  core.run(run);
  /* @ngInject */
  function run( $rootScope, $state, $stateParams ) {
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

