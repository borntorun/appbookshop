/**
 * Controller appBookShop.auth AuthenticationLogin
 * (João Carvalho, 03-10-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Descrição: Manage login view
*/
(function() {
  'use strict';

  angular
    .module('appBookShop.auth')
    .controller('AuthenticationLoginCtrl', AuthenticationLoginCtrl);

  /* @ngInject */
  function AuthenticationLoginCtrl( $timeout, $previousState, $stateParams, authentication, SignalsService, notifier) {
    /*jshint validthis: true */
    //var model = this;


    authentication.loginWithGoogle()
      .then(function() {
        var user = authentication.user();
        notifier.info('Bem-vindo, ' + user.name + '! - Sessão iniciada!');
        SignalsService.loginsucceded.emit();
        if ($stateParams.signal && SignalsService[$stateParams.signal]) {
          SignalsService[$stateParams.signal].emit();
        }

      })
      .catch(function(err){
        notifier.log(err);
        SignalsService.logoutsucceded.emit();
      });

    $timeout(function(){
      $previousState.go();
    },120);/*10ms cause error? '$digest already in progress error' in firefox?*/


  }
}());
