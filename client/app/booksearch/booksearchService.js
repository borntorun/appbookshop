/**
 * Service appBookShop.bookdetail BookSearch
 * (João Carvalho, 12-03-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Descrição: Serviço para book search
 */
(function () {
  'use strict';
  angular.module('appBookShop.booksearch').factory('BookSearch', BookSearch);
  /* @ngInject */
  function BookSearch($rootScope, $http, $q, exception, notifier) {
    var serviceData = {
      inputsearchDefault: 'german',
      limitDefault: 25,
      limit: 25,
      inputsearch: '',
      results: [],
      categoriesFilter: [],
      //categoriesFilter: '*',
      isinit: true
    };
    var service = {
      data: serviceData,
      getSearchterm: getSearchterm,
      getSearchlimit: getSearchlimit,
      search: search,
      setFilterCategories: setFilterCategories,
      getFilterCategories: getFilterCategories
//      setCategoriesFilter: setCategoriesFilter
    };
    return service;
    /////////
    function search(input, limit) {
      var deferred = $q.defer();

      serviceData.inputsearch = input;
      serviceData.limit = limit;

      $http.get('/api/books/search/' + limit  + '/' + (input || ''), {cache: true})
        .then(function(resp, status, headers, conf){
          serviceData.isinit = false;
          serviceData.results = resp.data;
          deferred.resolve(serviceData.results);
        })
        .catch(function (message) {
          exception.catcher()(message);
          deferred.reject(message);
        });
      return deferred.promise;
      /*
      return $http.get('/api/books/search/' + (input || ''), {cache: true})
        .then(receiveData)
        .catch(function (message) {
          exception.catcher(message)(message);
        });
        */
    }

    /*function setCategoriesFilter(filter) {
      serviceData.categoriesFilter = filter || '*';
      $rootScope.$broadcast('bookSearchService_FilterChanged', serviceData.categoriesFilter);
    }*/

    function getSearchterm() {
      return serviceData.isinit? serviceData.inputsearchDefault: serviceData.inputsearch;
    }
    function getSearchlimit() {
      return serviceData.isinit? serviceData.limitDefault: serviceData.limit;
    }
    function setFilterCategories(filter) {
      serviceData.categoriesFilter = filter;
    }
    function getFilterCategories() {
      return serviceData.categoriesFilter;
    }


//    function receiveData(resp, status, headers, conf) {
//      serviceData.results = resp.data;
//      return serviceData.results;
//    }
  }
}());
