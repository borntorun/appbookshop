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
    this.$get = function( $modal ) {
      $modal_ = $modal;
      return new ModalPopupServiceFactory();
    };

    /*
    Private block
    */
    //reference to $modal
    var $modal_;
    //options to the modal
    var options = {
      controller: modalCtrl,
      controllerAs: 'model'/*,
        windowClass:"positionModal"*/
    };

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
      options.message = message ? message.replace(/\n/g, '<br/>') : message;
      options.title = title ? title.replace(/\n/g, '<br/>') : title;
      options.templateUrl = opt.templateUrl;
      return $modal_.open(options).result;
    }

    function modalCtrl( /*$scope*/ ) {
      var model = this;

      model.title = options.title;
      model.message = options.message;
    }

  }
}());
