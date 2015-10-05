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
  function AuthLogoutCtrl(/*$window,*/ auth, $previousState, SignalsService, notifier) {
    /*jshint validthis: true */
    //var model = this;

    auth.logout()
      .then(function() {
        notifier.info('Logged out.');
        //$window.location.reload();
      })
      .catch(function(err){
        console.log(err);
        notifier.warning(err.message);

      })
      .finally(function(){
        SignalsService.logoutsucceded.emit();
        $previousState.go();
      });
  }
}());
