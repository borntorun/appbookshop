/**
 * Created by Joao Carvalho on 11-03-2015.
 */
(function() {
  'use strict';

  angular
    .module('appBookShop.core')
    .constant('toastr', toastr)
    .constant('moment', moment)
    .constant('_lodash', window._)
    .constant('$', window.$)
    .constant('Q', window.Q)
    .constant('MutationObserver', window.MutationObserver)

    .constant('localforageDriver', window.localforageDriver)
    .constant('simpleBasket', window.simplebasket);

}());
