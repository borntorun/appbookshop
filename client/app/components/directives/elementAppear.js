/**
* Directive appBookShop.components elementAppear
* (João Carvalho, 30-10-2015)
* Criado com base em angular design style de John Papa
* (https://github.com/johnpapa/angular-styleguide)
*
* Description: Allows trigger an event on rootscope based on scroll position on a container of items;
 * Event is triggered when the element is visible on viewport
 * The event name is passes in attribute 'event-name'
 *
 * Dependencies: uses 'jquery_appear' plugin
*/
(function () {
  'use strict';
  /*jshint validthis: true */
  angular
    .module('appBookShop.components')
    .directive('elementAppear', elementAppear)
    .controller('elementAppearCtrl', elementAppearCtrl);

  function elementAppearCtrl($scope) {
    var model = this;

    model.processRunning = false;

    model.elementAppearOnOff = function(event) {
      if (model.processRunning === false) {
        doAction(event.data.status);
      }
    };


    function doAction(status) {
      //set process running as true
      model.processRunning = true;
      //call action; passes in a reference to a done callback
      $scope.$emit(model.eventName + status, doneAction);
    }

    function doneAction() {
      //set process running as false
      model.processRunning = false;
      console.log('done');
    }

  }

  /* @ngInject */
  function elementAppear(/*_lodash, $window,*/ $timeout) {
    /*
    * Private Block for private vars
    */

    /*
    * Public Interface
    */
    var directive = {
      restrict: 'CA',
      controller: 'elementAppearCtrl',
      controllerAs: 'model',
      link: link
//      ,scope:{
//
//      }
    };
    return directive;
    ///////////////
    //just put functions below this point

    /*
    * Private Block interface
    */

    function link(scope, element, attrs, ctrl) {

      if (!element.appear || !attrs.prefixEventName) {
        return;
      }

      //element.css('left', ($window.screen.availWidth/2) - element.innerWidth());

      var on = {status:'-on'};
      var off = {status:'-off'};

      $timeout(function(){
        element.appear();
        element.on('appear', on, ctrl.elementAppearOnOff);
        element.on('disappear', off, ctrl.elementAppearOnOff);
        ctrl.eventName = attrs.prefixEventName;
      }, 100);



      scope.$on('$destroy', function(){
        element.off('appear', on, ctrl.elementAppearOnOff);
        element.off('appear', off,ctrl.elementAppearOnOff);
      });

      /*$window.addEventListener('scroll', function(){
        console.log($window.pageYOffset);
      }, false);*/
      /*element.bind('scroll', _lodash.throttle(function(){
        if (el.scrollTop + el.offsetHeight >= el.scrollHeight) {
          console.log('next');
          //scope.$apply(attrs.infiniteScroll);
        }
      },100));*/

    }

  }
}());
