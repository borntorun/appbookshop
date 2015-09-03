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

  /* @ngInject */
  function mutationObserver(_lodash) {
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

      var observer = _lodash.result(_lodash.find(users, { 'id': id}), 'observer');

      if (observer && observer.disconnect) {
        observer.disconnect();
      }
    }
  }
}());
