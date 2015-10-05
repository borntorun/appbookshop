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
  function AuthLoginCtrl(auth, $window, $previousState) {
    /*jshint validthis: true */
    var model = this;

    console.log('vai para o loginWithGoogle');
    auth.loginWithGoogle()
      .then(function(userdata) {
        //data containd email/name/tokenjwt to store on the localStorage
        //TODO:store it

        console.log('then', userdata);

        $window.location.reload();

      })
      .catch(function(err){
        console.log(err);
      })
      .finally(function(){
        $previousState.go();
      });
  }
}());
