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
  function NavBarTopCtrl( exception, notifier, auth, $window, $state, SignalsService ) {
    var model = this;

    model.isAuthenticated = auth.isAuthenticated();

    SignalsService.loginsucceded.listen(function( /*value*/ ) {
      model.isAuthenticated = true;
    });
    SignalsService.logoutsucceded.listen(function( /*value*/ ) {
      model.isAuthenticated = false;
    });

    model.googleAuthenticate = function() {

      if (model.isAuthenticated === false) {
        $state.go('googlelogin');
      } else {
        $state.go('logout');
      }


      /*auth.loginWithGoogle()
        .then(function(userdata) {
          //data containd email/name/tokenjwt to store on the localStorage
          //TODO:store it

          console.log('then', userdata);

          $window.location.reload();

        })
        .catch(function(err){
          console.log(err);
        });*/
    };
  }
}());
