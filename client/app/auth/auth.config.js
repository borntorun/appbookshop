/**
 * Created by Joao Carvalho on 11-03-2015.
 */
(function() {
  'use strict';
  var auth = angular.module('appBookShop.auth');
  /*
  Config da library toastr
   */
  auth.config(configProviders);

  auth.run(configureStorage);

  auth.run(run);

  /* @ngInject */
  function configProviders( SignalsServiceProvider ) {
    SignalsServiceProvider.config({
      init: true,
      signals: {
        loginsucceded: 'loginsucceded',
        logoutsucceded: 'logoutsucceded',
        errorforbiddenoccured: 'errorforbiddenoccured',
        logoutforced: 'logoutforced',
        logoutisneeded: 'logoutisneeded'
      }
    });
  }

  /* @ngInject */
  function configureStorage( localforageDriver, authentication, notifier, SignalsService ) {

    localforageDriver.create(localforageDriver.STORAGE.LOCALSTORAGE, {
      key: 'user', name: 'authentication', storeName: 'appbookshop', description: 'user data'
    })
      .then(function( driver ) {
        authentication.setStorage(driver);
        authentication.loadUser()
          .then(function( data ) {
            //console.log(data);
            if ( data != null ) {
              SignalsService.loginsucceded.emit();
            }
          })
          .catch(function( err ) {
            notifier.log(err);
          });
      });
  }

  /* @ngInject */
  function run( $rootScope, $state, $timeout, $window, authorization, SignalsService, message ) {
    Q.fcall(function() {
      $rootScope.$on('$stateChangeStart', function( e, to, toParams, from/*, fromParams*/ ) {


        if ( !to.authorization ) return;

        var result = authorization.authorize(to.authorization, from);

        if ( result ) {
          if ( to.status !== 'inactive' ) {
            e.preventDefault();
          }

          if ( result.to && result.to.state ) {
            $timeout(function() {
              $state.go(result.to.state, result.to.params, {notify: true});
            }, 100)
              /*.then(function() {
                SignalsService.logoutisneeded.emit();
              })*/;
          }
        }
      });
    });

    //called when http status error code 403 is received
    //on save a book
    SignalsService.errorforbiddenoccured.listen(function() {
      message('authentication', 'forbidden')
        .finally(function() {
          //force logout
          $state.go('logout', {signal: 'logoutforced'}, {location: 'replace'});
        });
    });
    //action to do after forced logout
    SignalsService.logoutforced.listen(function() {
      $window.location.reload();
    });

    SignalsService.logoutisneeded.listen(function() {
      $timeout(function() {
        $state.go('logout', {}, {location: 'replace'});
      }, 200);
    });
  }
}());

