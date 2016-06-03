/**
 * Created by Joao Carvalho on 11-03-2015.
 */
(function () {
    'use strict';
    var auth = angular.module('appBookShop.auth');
    /*
    Config da library toastr
     */
    auth.run(runConfigureStorage);
    auth.run(run);
    /* @ngInject */
    function runConfigureStorage(localforageDriver, authentication, notifier, SignalsService) {

        localforageDriver.create(localforageDriver.STORAGE.LOCALSTORAGE, {
                key: 'user', name: 'authentication', storeName: 'appbookshop', description: 'user data'
            })
            .then(function (driver) {
                authentication.setStorage(driver);
                authentication.loadUser()
                    .then(function (data) {
                        //console.log(data);
                        if (data != null) {
                            SignalsService.loginsucceded.emit();
                        }
                    })
                    .catch(function (err) {
                        notifier.log(err);
                    });
            });
    }

    /* @ngInject */
    function run($rootScope, $state, $timeout, $window, authorization, authentication, SignalsService, message) {
        Q.fcall(function () {
            $rootScope.$on('$stateChangeStart', function (e, to, toParams, from/*, fromParams*/) {
                if (!to.authorization) return;
                var result = authorization.authorize(to.authorization, from);
                if (result) {
                    if (to.status !== 'inactive') {
                        e.preventDefault();
                    }
                    if (result.to && result.to.state) {
                        $timeout(function () {
                            $state.go(result.to.state, result.to.params, { notify: true });
                        }, 100);
                    }
                }
            });
        });
        //    Q.fcall(function() {
        //      $rootScope.$on('$stateChangeStart', function( e, to, toParams, from/*, fromParams*/ ) {
        //        if ( /(login)|(logout)/.test(to.name) === false && to.status === undefined ) {
        //          if ( authentication.isAuthenticated() ) {
        //            authentication.verifySession()
        //              .catch(function() {
        //                e.preventDefault();
        //              });
        //          }
        //        }
        //      });
        //    });
        //called when http status error code 403 is received
        //on save a book
        SignalsService.$http403.listen(function () {
            message('authentication', 'forbidden')
                .finally(function () {
                    //force logout
                    $state.go('logout', { signal: 'logoutforced' }, { location: 'replace' });
                });
        });
        SignalsService.$http401.listen(function () {
            message('authorization', 'unauthorized')
                .then(authentication.verifySession);
        });
        //action to do after forced logout
        SignalsService.logoutforced.listen(function () {
            $window.location.reload();
        });
        SignalsService.logoutisneeded.listen(function (value) {
            var v = value || {};
            $timeout(function () {
                $state.go('logout', v.params || {}, v.options || { location: 'replace' });
            }, 200);
        });
    }
}());

