/**
 * Controller appBookShop.auth AuthenticationLogout
 * (João Carvalho, 03-10-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Descrição: Manage logout view
*/
(function() {
  'use strict';

  angular
    .module('appBookShop.auth')
    .controller('AuthenticationLogoutCtrl', AuthenticationLogoutCtrl);

  /* @ngInject */
  function AuthenticationLogoutCtrl($stateParams, $previousState,$timeout, authentication, SignalsService, notifier) {
    /*jshint validthis: true */
    //var model = this;

    authentication.logout()
      /*.catch(function(err){
        notifier.log(err);
      })*/
      .finally(function(){
        SignalsService.logoutsucceded.emit();
        notifier.info('Sessão terminada.');
        $previousState.go();
        if ($stateParams.signal && SignalsService[$stateParams.signal]) {
          $timeout(function(){
            SignalsService[$stateParams.signal].emit();
          }, 200);
        }
      });
  }
}());
