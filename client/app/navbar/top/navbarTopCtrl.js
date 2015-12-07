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
  function NavBarTopCtrl( $scope, $state, $previousState, $timeout, authentication, SignalsService) {
    var model = this;

    model.isAuthenticated = authentication.isAuthenticated();
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

//        $timeout(function(){
//          //console.log('prev');
//          $previousState.go();
//        },120);/*10ms cause error? '$digest already in progress error' in firefox?*/
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
        model.user = angular.extend(model.user, authentication.user());
      } else {
        model.user = {};
      }
    }
  }
}());
