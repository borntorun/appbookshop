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
  function bookdetail( httpRequest, notifier ) {
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
      return httpRequest.get({url: '/api/books/store/' + (id || '')})
        .then(function( data ) {
          return data;
        }).
        catch(function(){
          notifier.error('Livro não encontrado.', 'Error', id);
          return {};
        });
    }

    /*function getold( id ) {

      var deferload = $q.defer();
      $http({
        method: 'GET',
        url: '/api/books/store/' + (id || ''),
        cache: true
      }).success(function( data*//*, status, headers, config*//* ) {
        model.book = data;
        deferload.resolve(model.book);
      }).error(function( data, status, headers, config ) {
        notifier.error(data, status, headers, config);
        model.book = {};
        deferload.reject(data);
      });
      return deferload.promise;
    }*/

  }
}());
