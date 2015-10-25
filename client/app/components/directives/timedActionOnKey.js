/**
 * Directive appBookShop.components timedAction
 * (João Carvalho, 02-09-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Description: Directive to set a timed action on input text elements based on event keypress or keydown
 */
(function() {
  'use strict';
  angular
    .module('appBookShop.components')
    .directive('timedAction', timedAction)
    .controller('timedActionCtrl', timedActionCtrl);


  /**
   * Controller
   * @param $timeout
   */
  /* @ngInject */
  function timedActionCtrl( $timeout ) {
    /*jshint validthis: true */
    var model = this;

    /**
     * Init model variables
     * @param action {Function} Function to call representing the process to run on the event
     * @param msTimeout {Number} Miliseconds to wait before call the action
     */
    model.init = function init( action, msTimeout ) {
      model.processRunning = false;
      model.action = action;
      model.msTimeout = msTimeout;
    };

    /**
     * The event handler
     * @returns {boolean}
     */
    model.eventKeyListener = function( /*e*/ ) {
      //if action is running delay next call and quit
      if ( model.processRunning ) {
        model.delay = true;
        return true;
      }

      //if exists a timed action defined before cancel it
      if ( model.timedOutFunction ) {
        $timeout.cancel(model.timedOutFunction);
      }

      //call action after timeout
      model.timedOutFunction = $timeout(function timedOutFunction() {
        doAction();
      }, model.msTimeout);

      return true;
    };

    /**
     * Call action
     */
    function doAction() {
      //set process running as true
      model.processRunning = true;
      //call action; passes in a reference to a done callback
      model.action.call(null, doneAction);
    }

    /**
     * Callback to be called by the external action
     * MUST BE CALLED (if not the action will never be called if the event occurs again)
     */
    function doneAction() {
      //set process running as false
      model.processRunning = false;
      //if action was delayed call it again
      if (model.delay === true) {
        model.delay = false;
        doAction();
      }
    }
  }

  /* @ngInject */
  function timedAction( $timeout ) {
    /*
    * Private Block
    */

    /*
    * Public Interface
    */
    var directive = {
      restrict: 'E',
      controller: 'timedActionCtrl',
      controllerAs: 'model',
      link: link,
      scope: {
        disabled: '@',
        event: '@',
        field: '@',
        action: '&',
        msTimeout: '@?'
      }
    };
    return directive;
    ///////////////
    function link( scope, element, attrs, ctrl ) {

      if ( scope.disabled === 'true' ) {
        return;
      }

      //valid events
      if ( !scope.event || (scope.event!=='keypress' && scope.event!=='keydown')) {
        return;
      }

      //get the field attribute name
      //if not passed get next sibling element
      if ( !scope.field ) {
        scope.field = element[0].nextElementSibling.name;
      }

      //element must be an input form
      var theElement = $('input[name=\'' + scope.field + '\']');
      if ( theElement.length != 1 ) {
        return;
      }
      var theAction = scope.$parent.$eval(scope.action);
      if ( !isFunction(theAction) ) {
        return;
      }

      ctrl.init(theAction, scope.msTimeout || 100);

      theElement.on(scope.event, ctrl.eventKeyListener);

      scope.$on('$destroy', function() {
        theElement.off(scope.event, ctrl.eventKeyListener);
      });

      function isFunction( obj ) {
        return {}.toString.call(obj) === '[object Function]';
      }

    }


  }
}());
