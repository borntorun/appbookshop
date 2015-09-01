/**
 * Created by Joao Carvalho on 12-03-2015.
 */
(function () {
    'use strict';
    angular
        .module('appBookShop.main')
        .controller('Main', Main);
    /* @ngInject */
    function Main($scope, $rootScope, notifier, bookconfig, $window) {
        /*jshint validthis: true */
        var vm = this;


        vm.options = null;//{opcao1: "teste", opcao2: {sub1: true}};

        //    if (bookconfig.data.labels) {
        //      console.log(bookconfig.data.labels);
        //    }
        //    if (xpto.data.labels) {
        //      console.log(xpto.data.labels);
        //    }
        //notifier.info('Activated Main View');

      /*var $rootScope = angular.element($window.document.querySelectorAll("[ui-view]")[0]).injector().get('$rootScope');

      $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
        console.log('$stateChangeStart to '+toState.to+'- fired when the transition begins. toState,toParams : \n',toState, toParams);
      });

      $rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams){
        console.log('$stateChangeError - fired when an error occurs during transition.');
        console.log(arguments);
      });

      $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
        console.log('$stateChangeSuccess to '+toState.name+'- fired once the state transition is complete.');
      });

      $rootScope.$on('$viewContentLoaded',function(event){
        console.log('$viewContentLoaded - fired after dom rendered',event);
      });

      $rootScope.$on('$stateNotFound',function(event, unfoundState, fromState, fromParams){
        console.log('$stateNotFound '+unfoundState.to+'  - fired when a state cannot be found by its name.');
        console.log(unfoundState, fromState, fromParams);
      });*/




    }
}());

