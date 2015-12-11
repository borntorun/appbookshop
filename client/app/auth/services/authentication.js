/**
 * Service appBookShop.auth authentication
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
    .factory('authentication', authentication);

  /* @ngInject */
  function authentication( $, $window, $timeout, Q, httpRequest, message, SignalsService ) {
    /*
    * Private Block
    */
    var user = null;
    var storage;
    var expireSessionTimeout;

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
      verifySession: verifySession,
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
      return Q(null).then(function() {
        throw new Error('Error in session storage');
      });
    }

    function loadUser() {
      if ( !storage ) {
        return errStorage();
      }

      return Q(storage.load()
        .then(function( obj ) {

          if ( obj === null ) {
            return null;
          }

          var expireIn = isSessionExpired(obj);

          expireSessionIn(expireIn > 0 ? 0 : -1 * expireIn);

          //set the user in memory
          user = obj;
          return user;
        }));
    }

    function saveUser( obj ) {
      if ( !storage ) {
        return errStorage();
      }
      return Q(storage.save(obj)
        .then(function( data ) {
          //set the user in memory equals to storage
          user = data;

          expireSessionIn(user.expires * 1000);

          return user;
        }));
    }

    function verifySession() {
      var defer = Q.defer();

      httpRequest.get({url: '/auth/user', cache: false, noError: true, intercept: false})
        .then(function() {
          defer.resolve(true);
        })
        .catch(function() {
          defer.reject(false);
          expireSessionIn(0, {params:{signal: 'logoutforced'}});
        });

      return defer.promise;
    }

    function isAuthenticated() {
      return user != null;
    }

    function isSessionExpired( obj ) {
      var value = new Date().getTime() - (obj.sessionExpiresAt || 0);
      return value;
    }

    function setSessionExpiresAt( obj ) {
      obj.sessionExpiresAt = new Date().getTime() + (obj.expires * 1000);
    }

    function expireSessionIn( miliseconds, emitValue ) {
      expireSessionTimeout = $timeout(function() {
        SignalsService.logoutisneeded.emit(emitValue);
      }, miliseconds);
    }

    function logout() {
      if ( !storage ) {
        return Q(null);
      }
      return Q.allSettled([
        httpRequest.post({url: '/auth/logout', $nohttp403: true, noError: true}),
        storage.clear()
      ])
        .finally(function() {
          $timeout.cancel(expireSessionTimeout);
          //with error or not user set to null
          user = null;
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

        var domainurl = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');

        //console.log(event.data);
        //console.log(event.origin);
        //console.log(domainurl);

        if ( event.origin !== domainurl || !event.data || event.data.error ) {
          user = null;
          defer.reject(new Error('Invalid data from message'));
        }
        else {
          if ( event.data && event.data.user ) {
            setSessionExpiresAt(event.data.user);
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
