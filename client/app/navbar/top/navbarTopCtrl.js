/**
 * Controller appBookShop.navbar NavBarTop
 * (João Carvalho, 16-03-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Descrição: Controller para barra de navegação no topo
*/
(function() {
  'use strict';

  angular
    .module('appBookShop.navbar')
    .controller('NavBarTopCtrl', NavBarTopCtrl);

  /* @ngInject */
  function NavBarTopCtrl($scope, exception, notifier) {
    /*jshint validthis: true */
    var vm = this;
    notifier.info('NavBar top loaded');

  }
}());
