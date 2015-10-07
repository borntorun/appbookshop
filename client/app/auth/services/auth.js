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
  /*jshint newcap: false */

  angular
    .module('appBookShop.auth')
    .factory('auth', auth);

  /* @ngInject */
  function auth( $, $window, Q, httpRequest) {
    /*
    * Private Block
    */
    var user = null;
    var storage;

    /*
    * Public Interface
    */
    var service = {
      user: function() {
        return user;
      },
      loginWithGoogle: loginWithGoogle,
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

    function errStorage() {
      return Q(null).then(function(){
        throw new Error('Error in session storage');
      });
    }

    function loadUser() {
      if ( !storage ) {return errStorage();}

      return Q(storage.load()
        .then(function( data ) {
          //set the user in memory
          user = data;
        }));
    }

    function saveUser( obj ) {
      if ( !storage ) {return errStorage();}

      return Q(storage.save(obj)
        .then(function( data ) {
          //set the user in memory equals to storage
          user = data;
        }));
    }

    function isAuthenticated() {
      return user != null;
    }

    function logout() {
      if ( !storage ) {
        return Q(null);
      }


      return Q.allSettled([httpRequest.post({url: '/auth/logout'}),storage.clear()])
        .then(function (results) {
          /*results.forEach(function (result) {
            console.log(result.state, result.value, result.reason);
          });*/
          user = null;
        })
        .catch(function(err){
          user = null;
          throw err;
        });

    }



    function loginWithGoogle() {
      var defer = Q.defer();

      var options = 'top=0,left=0,width=500,height=640';

      $window.open('/auth/google/authenticatewait', '', options);

      setMessageListener();

      return defer.promise;
      ////////////////
      function setMessageListener() {
        $($window).on('message', messageListener);
      }

      function unsetMessageListener() {
        $($window).off('message', messageListener);
      }

      function messageListener( ev ) {
        var event = ev.originalEvent;
        //console.log(event);

        if ( event.origin !== 'http://local.host:12999' || !event.data || event.data.error ) {
          user = null;
          defer.reject(false/*new Error('Invalid Login')*/);
        }
        else {
          if ( event.data && event.data.user ) {
            defer.resolve(saveUser(event.data.user));
          }
          else {
            user = null;
            defer.reject(false);
          }
        }
        unsetMessageListener();
      }
    }

  }
}());
