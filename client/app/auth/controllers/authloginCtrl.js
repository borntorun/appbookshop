/**
 * Controller appBookShop.auth AuthLogin
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
    .controller('AuthLoginCtrl', AuthLoginCtrl);

  /* @ngInject */
  function AuthLoginCtrl(/*$window,*/ auth, $previousState, SignalsService, notifier) {
    /*jshint validthis: true */
    //var model = this;



    auth.loginWithGoogle()
      .then(function() {
        notifier.info('Bem-vindo, ' + auth.user().name + '! - Sessão iniciada!');
        SignalsService.loginsucceded.emit();
      })
      .catch(function(err){
        notifier.log(err);
        SignalsService.logoutsucceded.emit();
      })
      .finally(function(){
        //$previousState.go();
      });

  }
}());
