/**
 * Service appBookShop.bookdetail BookSearch
 * (João Carvalho, 12-03-2015)
 *
 * Descrição: Serviço para book search
 */
(function () {
  'use strict';
  angular.module('appBookShop.booksearch').factory('BookSearch', BookSearch);
  /* @ngInject */
  function BookSearch($rootScope, $http, $q, exception, notifier) {
    var serviceData = {
      inputsearchDefault: 'freud,musil,outsider,proust,buc',
      inputsearch: '',
      inputsearchObjDefault: {title: '-', authors: '-', subject: '-', collection: '-', categories: '-', edition: '-'},
      inputsearchObj: {title: '', authors: '', subject: '', collection: '', categories: '', edition: ''},
      isinit: true,
      inputSearchAdvanced: {},
      limitDefault: 25,
      limit: 25,
      results: [],
      categoriesFilter: []
    };

    /**
     * Public interface
     */
    var service = {
      getSearchInputDefault: getInputDefault,
      getSearchTerm: getSearchTerm,
      getSearchAdvancedTerm: getSearchAdvancedTerm,
      getSearchLimit: getSearchLimit,
      search: searchFree,
      searchAdvanced: searchAdvanced,
      setFilterCategories: setFilterCategories,
      getFilterCategories: getFilterCategories
    };
    return service;
    /////////
    function httpGet(url, strParameters, qDeferred) {
      $http.get(url + strParameters, {cache: true}).then(function (resp, status, headers, conf) {
        serviceData.isinit = false;
        serviceData.results = resp.data;
        qDeferred.resolve(serviceData.results);
      }).catch(function (message) {
        exception.catcher()(message);
        qDeferred.reject(message);
      });
    }

    function searchAdvanced(inputObj, limit) {
      function getPar(par) {
        return par || "-";
      }
      function getParameteresAsString() {
        var obj = serviceData.inputsearchObj;
        var aStr = []

        aStr.push(getPar(obj.title));
        aStr.push(getPar(obj.authors));
        aStr.push(getPar(obj.subject));
        aStr.push(getPar(obj.collection));
        aStr.push(getPar(obj.categories));
        aStr.push(getPar(obj.edition));
        return aStr.join('/');
      }

      var obj = inputObj || serviceData.inputsearchObjDefault;
      obj.title = obj.title || serviceData.inputsearchObjDefault.title;
      obj.authors = obj.authors || serviceData.inputsearchObjDefault.authors;
      obj.subject = obj.subject || serviceData.inputsearchObjDefault.subject;
      obj.collection = obj.collection || serviceData.inputsearchObjDefault.collection;
      obj.categories = obj.categories || serviceData.inputsearchObjDefault.categories;
      obj.edition = obj.edition || serviceData.inputsearchObjDefault.edition;
      serviceData.inputsearchObj = obj;
      serviceData.limit = limit ? limit : serviceData.limitDefault;

      var deferred = $q.defer();
      httpGet('/api/books/search/advanced/', serviceData.limit + '/' + getParameteresAsString(), deferred);
      return deferred.promise;
    }

    function searchFree(input, limit) {
      var deferred = $q.defer();
      serviceData.inputsearch = input !== undefined ? input : serviceData.inputsearchDefault;
      serviceData.limit = limit ? limit : serviceData.limitDefault;
      httpGet('/api/books/search/free/', serviceData.limit + '/' + (serviceData.inputsearch || ''), deferred);
      return deferred.promise;
    }
    function getInputDefault() {
      return serviceData.inputsearchDefault;
    }
    function getSearchTerm() {
      return serviceData.inputsearch;
    }
    function getSearchLimit() {
      return serviceData.limit;
    }
    function getSearchAdvancedTerm() {
      return serviceData.inputsearchObj;
    }
    function setFilterCategories(filter) {
      serviceData.categoriesFilter = filter;
    }
    function getFilterCategories() {
      return serviceData.categoriesFilter;
    }
  }
}());
