/**
 * Service appBookShop.bookdetail BookDetail
 * (João Carvalho, 16-03-2015)
 *
 * Descrição: Serviço para book detail
 */
(function () {
  'use strict';
  angular.module('appBookShop.bookdetail').factory('BookDetail', BookDetail);
  /* @ngInject */
  function BookDetail($q, $http, exception, notifier) {
    var model = {
      book: {
        _id: '1'
      }
    };


    /*
    * Public Interface
    */
    var service = {
      get: get,
      save: save
    };
    return service;
    ///////////////
    /*
    * Private Block
    */
    function get(id) {
      var deferload = $q.defer();
      $http({
        method: 'GET',
        url: '/api/books/store/' + (id || ''),
        cache: true
      }).success(function (data/*, status, headers, config*/) {
        model.book = data;
        deferload.resolve(model.book);
      }).error(function (data, status, headers, config) {
        notifier.error(data, status, headers, config);
        model.book = {};
        deferload.reject(data);
      });
      return deferload.promise;
    }
    function save() {
    }
  }
}());
