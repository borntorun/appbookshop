/**
 * Directive appBookShop.components logicForm
 * Controller appBookShop.components logicForm
 * Service appBookShop.components logicForm
 * (João Carvalho, 02-09-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Description: Directive and Service to enable forms (formController) be treated as one logic group
 * Purpose: control status (and validation TODO:?) of several forms located in different views but that must act as one unique logic group for validation/submit/save etc.
 *
 * Example:
 *
 * view X, ctrl-A as model
 *    form name='name1' logic-form='logicname')
 *
 * view Y, ctrl-B as model
 *    form name='name2' logic-form='logicname')
 *
 * After applied we can reference (in the view or in the controller) each form as:
 *  model.name1 - which reference the formController in view1
 *  model.name2 - which reference the formController in view2
 *
 * And reference the logic form as
 *  model.logicname
 *
 *  The two separate views and controllers have access to the same logic form entity
 *
 *  Resources searched for this solution: (http://stackoverflow.com/questions/15935224/angularjs-access-formcontroller-of-a-form-placed-inside-transcluded-directive-f/15939239#15939239)
 *
 */
(function() {
  'use strict';
  /*jshint validthis: true */
  angular
    .module('appBookShop.components')
    .directive('logicForm', logicFormDirective)
    .controller('logicFormCtrl', logicFormCtrl)
    .service('logicform', logicForm);

  /**
   * Service to mantain logic form entities
   */
  /* @ngInject */
  function logicForm() {

    /**
     * Register a logic form (an entity that act as group of several forms)
     * @param name
     * @param formController
     * @returns {*}
     */
    this.register = function( name, formController ) {

      if ( !this[name] ) {
        this[name] = createLogicForm(name);//new LogicForm(name, formController);
      }
      this[name].addForm(formController);

      return this[name];
    };

    /*
    Private block
     */

    function createLogicForm( name ) {

      var logicForm = {
        name: name,
        addForm: addForm,
        setPristine: setPristine,
        exists: exists,
        isInvalid: isInvalid,
        isPristine: isPristine,
        processing: processing
      };

      var forms = [];
      var isProcessing = false;

      return logicForm;
      /////////////////////////////

      function processing(value) {
        isProcessing = (value === undefined? isProcessing : !!value);
        return isProcessing;
      }

      function exists(fieldName) {
        for ( var i = 0; i < forms.length; i++ ) {
          if ( !!forms[fieldName] ) {
            return true;
          }
        }
        return false;
      }
      function isPristine() {
        for ( var i = 0; i < forms.length; i++ ) {
          if ( forms[i].$pristine === false) {
            return false;
          }
        }
        return true;
      }
      function isInvalid() {
        for ( var i = 0; i < forms.length; i++ ) {
          if ( forms[i].$invalid === true) {
            return true;
          }
        }
        return false;
      }
      function setPristine() {
        forms.forEach(function(item){
          item.$setPristine();
        });
      }
      /*function setDirty() {
        forms.forEach(function(item){
          item.$setDirty();
        });
      }*/
      function addForm( form ) {
        if ( !this[form.$name] ) {
          /*form.isFieldChangedInvalid = function(fieldName) {
          var field = form[fieldName];
          return field.$dirty && field.$invalid;
        }*/
          this[form.$name] = form;

          forms.push(form);

        } else {
          this[form.$name] = form;
          for ( var i = 0; i < forms.length; i++ ) {
            if ( forms[i].$name === form.$name) {
              forms[i] = form;
            }
          }
        }
      }

    }
  }

  /**
   * Controller for the directive
   * @param logicForm
   */
  function logicFormCtrl( /*$scope,*/ logicform ) {
    this.initialize = function( logicName, formController, elementController ) {
      elementController[formController.$name] = formController;
      elementController[logicName + 'LogicForm'] = logicform.register(logicName, formController);
    };

  }

  /**
   * Directive
   * @returns {{restrict: string, link: link, controller: string}}
   */
  /* @ngInject */
  function logicFormDirective() {
    /*
    * Private Block
    */

    /*
    * Public Interface
    */
    var directive = {
      restrict: 'A',
      link: link,
      controller: 'logicFormCtrl'
    };
    return directive;
    ///////////////
    //just put functions below this point!

    /*
    * Private Block
    */
    function link( scope, element, attrs, ctrl ) {
      //console.log(ctrl);
      //element must be a form

      if ( element[0].tagName !== 'FORM' ) {
        console.log('logicForm directive: Parent element must be a form tag and is: [' + element[0].parentElement.outerHTML + ']');
        return;
      }
      var logicName = attrs.logicForm;

      var aInput = element.find('input[name]').eq(0);

      if ( aInput ) {

        var formController = aInput.controller('form');
        var elementController = element.controller();

        ctrl.initialize(logicName, formController, elementController);
      }
    }
  }
}());
