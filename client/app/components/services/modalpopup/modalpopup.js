/**
 * Service appBookShop.components modalpopup
 * (João Carvalho, 27-08-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Descrição: Service to use $modal from ui.bootstrap
 */
(function() {
  'use strict';
  /*jshint validthis: true */
  angular
    .module('appBookShop.components')
    .provider('modalpopup', modalpopupProvider);

  /* @ngInject */
  function modalpopupProvider() {


    this.config = function( config ) {
      if ( config ) {
      }
    };

    /* @ngInject */
    this.$get = function($modal) {
      $modal_ = $modal;
      return new ModalPopupServiceFactory();
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
        confirm : confirm
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
    function confirm(message, title) {
      options.message = message? message.replace(/\n/g, '<br/>'): message;
      options.title = title? title.replace(/\n/g, '<br/>'): title;
      return $modal_.open(options).result;
    }

    /*
    Private Interface of the service
     */
    var $modal_;
    var options = {
      templateUrl: '/app/components/services/modalpopup/templates/confirm.html',
      controller: modalCtrl,
      controllerAs: 'model'/*,
        windowClass:"positionModal"*/
    };

    function modalCtrl(/*$scope*/) {
      var model = this;

      model.title = options.title;
      model.message = options.message;
    }


  }
}());
