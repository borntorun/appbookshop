(function() {
  'use strict';

  angular
    .module('blocks.forms')
    .factory('formsMng', formsMng);

  //notifier.$inject = ['$log', '$window', 'toastr'];
  /* @ngInject */
  function formsMng(notifier) {
    var messages = {
      SAVE: 'Pretende gravar as alterações efectuadas?',
      CLEAR: 'Perderá os dados do formulário.\n(o registo na base de dados não será afectado)'
    };
    var service = {
      MESSAGES: messages,
      isErrorRequired: isErrorRequired,
      isErrorInvalid: isErrorInvalid,
      confirm: confirm
    };

    return service;
    /////////////////////

    function confirm(message) {

      return false;
    }
    function isErrorRequired(form, field) {
      var field = form[field];
      return field.$dirty && field.$error.required;
    }
    function isErrorInvalid(form, field) {
      var field = form[field];
      return field.$dirty && field.$invalid;
    }

  }
}());

