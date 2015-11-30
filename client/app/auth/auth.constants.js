(function() {
  'use strict';

  angular
    .module('appBookShop.auth')
    .constant('$', window.$)
    .constant('Q', window.Q)
    .constant('localforageDriver', window.localforageDriver);

}());
