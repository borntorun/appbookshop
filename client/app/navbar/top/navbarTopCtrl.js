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
  function NavBarTopCtrl( $scope, $state, $previousState, $timeout, auth, SignalsService) {
    var model = this;

    model.isAuthenticated = auth.isAuthenticated();
    model.user = {};


    setUser();

    SignalsService.loginsucceded.listen(function( /*value*/ ) {
      setViewAuthenticate(true);

    });
    SignalsService.logoutsucceded.listen(function( /*value*/ ) {
      setViewAuthenticate(false);
    });

    model.googleAuthenticate = function() {

      if (model.isAuthenticated === false) {
        $state.go('googlelogin');
        $timeout(function(){
          //console.log('prev');
          $previousState.go();
        },10);
      } else {
        $state.go('logout');
      }



    };

    function setViewAuthenticate(state) {
      $scope.$apply(function(){
        model.isAuthenticated = state;
        setUser();
      });
    }
    function setUser() {

      if (model.isAuthenticated) {
        model.user = angular.extend(model.user, auth.user());
      } else {
        model.user = {};
      }
    }
  }
}());
