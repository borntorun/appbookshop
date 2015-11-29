/**
 * Created by Joao Carvalho on 11-03-2015.
 */
(function() {
  'use strict';

  angular
    .module('warp.components')
    .constant('_lodash', window._)
    .constant('$', window.$)
    .constant('Q', window.Q)
    .constant('MutationObserver', window.MutationObserver);

}());
