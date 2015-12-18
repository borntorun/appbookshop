/**
 * Service warp.components modalpopup
 * (João Carvalho, 27-08-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Description: Service to use $modal from ui.bootstrap
 */
(function() {
  'use strict';
  /*jshint validthis: true */
  angular
    .module('warp.components')
    .provider('modalpopup', modalpopupProvider);

  /* @ngInject */
  function modalpopupProvider() {

    this.config = function( config ) {
      if ( config ) {
      }
    };

    /* @ngInject */
    this.$get = function( _$uibModal_, _$rootScope_ ) {
      $modal = _$uibModal_;
      $rootScope = _$rootScope_;
      return new ModalPopupServiceFactory();
    };

    /*
    Private block
    */
    //reference to $modal
    var $modal, $rootScope;
    //options to the modal

    //    var options = {
    //      controller: modalCtrl,
    //      controllerAs: 'model'/*,
    //        windowClass:"positionModal"*/
    //    };

    /**
     * Service Factory
     * @returns {{confirm: confirm}}
     * @constructor
     */
    function ModalPopupServiceFactory() {

      /*
      return the service
       */
      return {
        confirm: confirm,
        message: message
      };
    }

    /*
    Public Interface of the service
     */

    /**
     * Show a modal confirmation
     * @param message
     * @param title
     * @returns {*}
     */
    function confirm( message, title, opt ) {
      opt = opt || {};
      opt.templateUrl = opt.templateUrl || 'assets/templates/html/confirm.html';//'/app/components/services/modalpopup/templates/confirm.html';

      return show(message, title, opt);
    }

    function message( message, title, opt ) {
      opt = opt || {};
      opt.templateUrl = opt.templateUrl || 'assets/templates/html/message.html';//'/app/components/services/modalpopup/templates/message.html';
      return show(message, title, opt);
    }

    function show( message, title, opt ) {

      var scope = $rootScope.$new();
      //      options.message = message ? message.replace(/\n/g, '<br/>') : message;
      //      options.title = title ? title.replace(/\n/g, '<br/>') : title;
      //      options.templateUrl = opt.templateUrl;
      //      options.onconfirm = opt.onconfirm;
      //      options.oncancel = opt.oncancel;

      scope.message = message ? message.replace(/\n/g, '<br/>') : message;
      scope.title = title ? title.replace(/\n/g, '<br/>') : title;
      scope.onconfirm = opt.onconfirm;
      scope.oncancel = opt.cancel;

      return $modal.open({
        controller: modalCtrl,
        controllerAs: 'model',
        templateUrl: opt.templateUrl,
        scope: scope/*,
        windowClass:"positionModal"*/
      }).result;
    }

    function modalCtrl( $scope/*,$modalInstance*/ ) {
      var model = this;

      /*console.log($scope);*/
      model.title = /*options*/$scope.title;
      model.message = /*options*/$scope.message;
      model.confirm = function() {
        /*options*/
        $scope.onconfirm && (/*options*/$scope.onconfirm.call());
        $scope.$close();
      };
      model.cancel = function() {
        /*options*/
        $scope.oncancel && (/*options*/$scope.oncancel.call());
        $scope.$dismiss();
      };

    }

  }
}());
