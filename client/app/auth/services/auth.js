/**
 * Service appBookShop.auth auth
 * (João Carvalho, 19-09-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Description: Authentication Service
 */
(function() {
  'use strict';
  angular
    .module('appBookShop.auth')
    .factory('auth', auth);

  /* @ngInject */
  function auth( $, $window, Q, notifier ) {
    /*
    * Private Block
    */
    var user = null;
    var storage;

    /*
    * Public Interface
    */
    var service = {
      loginWithGoogle: googleAuth,
      logout: logout,
      isAuthenticated: isAuthenticated,
      loadUser: loadUser,
      saveUser: saveUser,
      setStorage: function( driver ) {
        storage = driver;
      }
    };

    return service;
    ///////////////
    //just put functions below this point
    /*
    * Private Block Interface
    */

    function loadUser() {
      if ( !storage ) {
        return;
      }
      storage.load()
        .then(function( data ) {
          console.log(data);
          user = data;
        });
    }

    function saveUser( obj ) {
      storage.save(obj)
        .then(function( data ) {
          console.log(data);
          user = data;
        });
    }

    function isAuthenticated() {
      return user != null;
    }

    function logout() {
      if ( !storage ) {
        return Q(null);
      }
      return Q(storage.clear()
        .then(function() {
          user = null;
        }));
    }

    function googleAuth() {
      var defer = Q.defer();

      var options = 'top=0,left=0';
      //console.log(url);

      console.log('vai abrir');

      $window.open('/auth/google/authenticate', '', options);

      setMessageListener();

      return defer.promise;
      ////////////////
      function setMessageListener() {
        $($window).on("message", messageListener);
      }

      function unsetMessageListener() {
        $($window).off("message", messageListener);
      }

      function messageListener( ev ) {
        var event = ev.originalEvent;
        console.log(event);

        if ( event.origin !== 'http://local.host:12999' || !event.data || event.data.error ) {
          defer.reject(false/*new Error('Invalid Login')*/);
        }
        else {
          if ( event.data && event.data.user ) {
            try {
              saveUser(event.data.user);
              defer.resolve(true);
            }
            catch( err ) {
              notifier.log(err);
              defer.reject(err);
            }
          }
          else {
            user = undefined;
            defer.reject(false);
          }
        }
        unsetMessageListener();
      }
    }

  }
}());
