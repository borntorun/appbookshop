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
  function auth( $, $window, $timeout, Q, httpRequest, SignalsService ) {
    /*
    * Private Block
    */
    var user = null;
    var storage;
    var refreshAction;

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

    //refresh session featured: abandoned
    //    SignalsService.loginsucceded.listen(function() {
    //      setRefreshAction(7500);
    //    });
    //    SignalsService.logoutsucceded.listen(function() {
    //      $timeout.cancel(refreshAction);
    //    });

    return service;
    ///////////////
    //just put functions below this point
    /*
    * Private Block Interface
    */

    //refresh session featured: abandoned
    //    function refreshSession() {
    //      console.log('refreshSession');
    //      //throw new Error('teste');
    //      //return {time:5000};
    //
    //      //se está válido
    //        //recebe time
    //        //retorna time
    //
    //      //se não está válido
    //        //retorna erro
    //    }
    //    function setRefreshAction(time) {
    //      console.log('setRefreshAction', time);
    //      refreshAction = $timeout(refreshSession,time);
    //
    //      refreshAction.then(function(data){
    //        console.log('then', data);
    //        //setRefreshAction(data.time);
    //      });
    //      refreshAction.catch(function(data){
    //        console.log('catch', data);
    //        //$state.go('logout');
    //      });
    //    }

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
        .then(function( data ) {
          //set the user in memory
          user = data;
          return data;
          //refresh session featured: abandoned
          //if (user!=null) { setRefreshAction(7500);}
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
        }));
    }

    function isAuthenticated() {
      return user != null;
    }

    function logout() {
      if ( !storage ) {
        return Q(null);
      }
      return Q.allSettled([httpRequest.post({url: '/auth/logout'}), storage.clear()])
        .then(function( results ) {
          /*results.forEach(function (result) {
            console.log(result.state, result.value, result.reason);
          });*/
          user = null;
        })
        .catch(function( err ) {
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
