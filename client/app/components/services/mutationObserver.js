/**
* Service appBookShop.components mutationObserver
* (João Carvalho, 03-09-2015)
* Criado com base em angular design style de John Papa
* (https://github.com/johnpapa/angular-styleguide)
*
* Descrição: Allows definition/managment of MutationObserver's for DOM elements (see: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
*/
(function() {
  'use strict';
  angular
    .module('appBookShop.components')
    .factory('mutationObserver', mutationObserver);


  if (!Array.prototype.find) {
    Array.prototype.find = function(predicate) {
      if (this == null) {
        throw new TypeError('Array.prototype.find called on null or undefined');
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value;

      for (var i = 0; i < length; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
          return value;
        }
      }
      return undefined;
    };
  }

  /* @ngInject */
  function mutationObserver() {
    var observers = [],
      id = 0;

    /*
    * Public Interface
    */
    var service = {
      apply: apply,
      disconnect: disconnect
    };
    return service;
    ///////////////

    /*
    * Private Block
    */


    function apply( element, config, callback ) {
      var observer = new MutationObserver(function( mutations ) {
        mutations.forEach(function(mutation){
          callback(mutation);
        });
      });
      //TODO: test for valid keys in config
      observer.observe(element, config);

      id++;

      observers.push({
        observer: observer,
        id: id
      });
      return id;
    }

    function disconnect(id) {

      var observer = observers.find(function(el, index, oarray){
        if (el.id === id) {
          oarray.splice(index,1);
          return true;
        }
        return false
      });
      if (observer && observer.observer && observer.observer.disconnect) {
        observer.observer.disconnect();
      }
    }
  }
}());
