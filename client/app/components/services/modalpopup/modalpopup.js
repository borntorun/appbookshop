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
    this.$get = function( $uibModal, $rootScope ) {
      $modal = $uibModal;
      _$rootScope = $rootScope;
      return new ModalPopupServiceFactory();
    };

    /*
    Private block
    */
    //reference to $modal
    var $modal, _$rootScope;


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
      opt.templateUrl = opt.templateUrl || 'assets/templates/html/confirm.html';

      return show(message, title, opt);
    }

    function message( message, title, opt ) {
      opt = opt || {};
      opt.templateUrl = opt.templateUrl || 'assets/templates/html/message.html';
      return show(message, title, opt);
    }

    function show( message, title, opt ) {

      var scope = _$rootScope.$new();

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

    function modalCtrl( $scope ) {
      var model = this;

      model.title = $scope.title;
      model.message = $scope.message;
      model.confirm = function() {
        $scope.onconfirm && ($scope.onconfirm.call());
        $scope.$close();
      };
      model.cancel = function() {
        $scope.oncancel && (/*options*/$scope.oncancel.call());
        $scope.$dismiss();
      };

    }

  }
}());
