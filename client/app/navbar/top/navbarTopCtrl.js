/**
 * Controller appBookShop.navbar NavBarTop
 * (João Carvalho, 16-03-2015)
 *
 * Description: Controller para barra de navegação no topo
 */
(function() {
  'use strict';
  /*jshint validthis: true */

  angular
    .module('appBookShop.navbar')
    .controller('NavBarTopCtrl', NavBarTopCtrl);

  /* @ngInject */
  function NavBarTopCtrl( exception, notifier, auth, $window ) {
    var model = this;

    model.loginGoogle = function() {
      auth.loginWithGoogle()
        .then(function(userdata) {
          //data containd email/name/tokenjwt to store on the localStorage
          //TODO:store it

          console.log('then', userdata);

          $window.location.reload();

        })
        .catch(function(err){
          console.log(err);
        });
    };
  }
}());
