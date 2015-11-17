/**
 * Service appBookShop.booksearch booksearchLastQuery
 * (João Carvalho, 12-11-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Descrição: Stores values from last booksearch query in booksearch[Advanced|Free]Form views
 */
(function() {
  'use strict';
  angular
    .module('appBookShop.booksearch')
    .factory('booksearchLastQuery', booksearchLastQuery);

  /* @ngInject */
  function booksearchLastQuery(_lodash) {
    /*
    * Private Block
    */
    var value = null;

    /*
    * Public Interface
    */
    var service = {
      set query (obj) {
        save(obj);
      },
      get query () {
        return value;
      },
      emptyIfdash: _emptyIfDash
    };

    return service;
    ///////////////
    //just put functions below this point
    /*
    * Private Block Interface
    */

    function _emptyIfDash(value) {
      function _goodvalue(val) {
        if(typeof val !== 'string') {
          return val;
        }
        val = val.trim();
        return val === '-'? '': val;
      }
      if (isArray(value) === true) {
        var aValues = [];
        value.forEach(function(item){
          aValues.push(_goodvalue(item));
        });
        return aValues;
      }
      return _goodvalue(value);
    }


    function save(obj) {
      if(!obj.type) { return;}

      value = {};
      value[obj.type] = {};
      for(var k in obj) {
        if (obj.hasOwnProperty(k) && isFunction(obj[k]) === false){
          value[obj.type][k] = _lodash.clone(obj[k], true);
        }
      }
    }
    function isArray( obj ) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    }

    function isFunction( obj ) {
      return {}.toString.call(obj) === '[object Function]';
    }
  }
}());
