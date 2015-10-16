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

  /* @ngInject */
  function configProviders( SignalsServiceProvider ) {
    SignalsServiceProvider.config({
      init: false,
      signals: {
        loginsucceded: 'loginsucceded',
        logoutsucceded: 'logoutsucceded'
      }
    });
  }

  /* @ngInject */
  function configureStorage( localforageDriver, auth, notifier, SignalsService ) {

    //config storage localstorage



    localforageDriver.create(localforageDriver.STORAGE.LOCALSTORAGE, {
      key: 'user', name: 'auth', storeName: 'appbookshop', description: 'user data'
    })
      .then(function( driver ) {
        auth.setStorage(driver);
        auth.loadUser()
          .then(function(data){
            //console.log(data);
            if (data!=null) {
              SignalsService.loginsucceded.emit();
            }
          })
          .catch(function( err ) {
            notifier.log(err);
          });
      });
  }

}());

