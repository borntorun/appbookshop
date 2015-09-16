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
    this.$get = function( $modal ) {
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
    function confirm( opt ) {
      //      options.message = opt.message? opt.message.replace(/\n/g, '<br/>'): opt.message;
      //      options.title = opt.title? opt.title.replace(/\n/g, '<br/>'): opt.title;
      //      options.message = replaceArgs(opt.message, opt.vars);
      opt.templateUrl = opt.templateUrl || '/app/components/services/modalpopup/templates/confirm.html';
      return show(opt);
    }

    function message( opt ) {
      //      options.message = opt.message? opt.message.replace(/\n/g, '<br/>'): opt.message;
      //      options.message = replaceArgs(opt.message, opt.vars);
      //      options.title = opt.title? opt.title.replace(/\n/g, '<br/>'): opt.title;
      opt.templateUrl = opt.templateUrl || '/app/components/services/modalpopup/templates/message.html';
      return show(opt);
    }

    function show( opt ) {
      options.message = replaceArgs(opt.message ? opt.message.replace(/\n/g, '<br/>') : opt.message, opt.vars);
      options.title = opt.title ? opt.title.replace(/\n/g, '<br/>') : opt.title;
      options.templateUrl = opt.templateUrl;
      return $modal_.open(options).result;
    }

    function replaceArgs( message, vars ) {
      for ( var k in vars ) {
        message = message.replace(new RegExp('%' + k, 'ig'), vars[k]);
      }
      return message;
    }

    /*
    Private Interface of the service
     */
    var $modal_;
    var options = {
      //templateUrl: '/app/components/services/modalpopup/templates/confirm.html',
      controller: modalCtrl,
      controllerAs: 'model'/*,
        windowClass:"positionModal"*/
    };

    function modalCtrl( /*$scope*/ ) {
      var model = this;

      model.title = options.title;
      model.message = options.message;
    }

  }
}());
