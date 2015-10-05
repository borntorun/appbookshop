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
      .then(function(data) {
        console.log('loginWithGoogle.then-',data);
        SignalsService.loginsucceded.emit();
      })
      .catch(function(data){
        console.log('loginWithGoogle.catch-',data);

        SignalsService.logoutsucceded.emit();
        notifier.warning(err.message);
      })
      .finally(function(data){
        console.log('loginWithGoogle.finally-',data);
        $previousState.go();
      });
  }
}());
