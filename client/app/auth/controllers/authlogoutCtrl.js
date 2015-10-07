/**
 * Controller appBookShop.auth AuthLogout
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
    .controller('AuthLogoutCtrl', AuthLogoutCtrl);

  /* @ngInject */
  function AuthLogoutCtrl(auth, $previousState, SignalsService, notifier) {
    /*jshint validthis: true */
    //var model = this;

    auth.logout()
      .catch(function(err){
        notifier.log(err);
      })
      .finally(function(){
        SignalsService.logoutsucceded.emit();
        notifier.info('Sessão terminada.');
        $previousState.go();
      });
  }
}());
