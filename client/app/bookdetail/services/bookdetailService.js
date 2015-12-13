/**
 * Service appBookShop.bookdetail bookdetail
 * (João Carvalho, 16-03-2015)
 *
 * Description: Serviço para book detail
 */
(function() {
  'use strict';
  angular
    .module('appBookShop.bookdetail')
    .factory('bookdetail', bookdetail);

  /* @ngInject */
  function bookdetail( httpRequest, Q ) {
    /*
    * Public Interface
    */
    var service = {
      get: get
    };
    return service;
    ///////////////
    /*
    * Private Block
    */
    function get( id ) {
      var defer = Q.defer();

      httpRequest.get({url: '/api/books/store/' + (id || '')})
        .then(function( response ) {
          defer.resolve(response.data);
        }).
        catch(function(err){
          defer.reject(err);
        });
      return defer.promise;

    }

  }
}());
