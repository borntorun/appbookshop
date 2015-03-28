/**
 * Directive appBookShop.components warp-autocomplete-typeaheadjs
 * (João Carvalho, 13-03-2015)
 *
 * Descrição: Directive/component to support typeahead.js autocomplete library (https://twitter.github.io/typeahead.js/)
 * with Bloodhound Integration (https://github.com/twitter/typeahead.js/blob/master/doc/bloodhound.md)
 *
 * Attributtes:
 * Required:
 * id="id of directive html element",
 * key="key-for-datasource-model",
 * onselected="function to call on item selected",
 * remote="remote url for datasource"
 *
 * Optional:
 * ?model           "model to bind the input"
 * ?onclosed        "function to call on input lost focus"
 * ?datasource      "name-for-css (deafult=datasource)"
 * ?limit           "max-items-to-show-on-dropdown (default=25)"
 * ?donotclearvalue "specifies if value on input must not be clered on selection (default=false)"
 * ?minlensugestion "minimum lenght for trigger dropdown (default=3)"
 * ?placeholder     "placeholder text"
 * ?classinput      "css class for input"
 *
 */
(function () {
  'use strict';

  angular
    .module('appBookShop.components', ['ngSanitize'])
    .directive('warpAutocompleteTypeaheadjs', warpautocompletetypeaheadjs);

  /* @ngInject */
  function warpautocompletetypeaheadjs($log) {
    var tpl = "<input type=\"text\" ng-model=\"model\" placeholder=\"{{placeholder}}\" class=\"typeahead {{classinput}}\"/>";
    var directive = {
      // use as element: <warp-autocomplete-typeaheadjs .../>
      restrict: 'E',
      scope: {
        remote: '@',
        datasource: '@?',
        onselected: '&',
        onclosed: '&?',
        donotclearvalue: '@?',
        minlensugestion: '@?',
        limit: '@?',
        placeholder: '@?',
        classinput: '@?',
        model: '=?'
        //,tpl: '=?'
      },
      template: '<input type="text" ng-model="model" placeholder="{{placeholder}}" class="typeahead {{classinput}}"/>',
      /*template:
        function(elem, attrs) {
          return attrs.tpl || tpl;
        },*/
      link: linkfunction
    };
    return directive;
    ////////////////
    function linkfunction(scope, element, attrs, ctrl) {
      var inputElem = $('#' + attrs.id + ' .typeahead');
      var onselectedIsFunction = true;
      var onclosedIsFunction = true;
      scope.minlensugestion = scope.minlensugestion || 3;
      scope.key = scope.key || 'name';
      scope.limit = scope.limit || 25;

      if (!(!scope.onselected? false : (!testIsFunction(scope.onselected)? false: testIsFunction(scope.onselected())))) {
        onselectedIsFunction = false;
        logerror('\'onselected\' is not defined or is not a function.');
      }
      if (!(!scope.onclosed? false : (!testIsFunction(scope.onclosed)? false: testIsFunction(scope.onclosed())))) {
        onclosedIsFunction = false;
        logwarn('\'onclosed\' is not defined or is not a function.');
      }

      configTypeaheadBloodhound();

      element.on('typeahead:selected', OnSelected);
      element.on('typeahead:closed', OnClosed);

      /*element.on('typeahead:opened', function() {
        console.log('opened');
      });
      element.on('typeahead:selected', function() {
        console.log('selected');
      });
      element.on('typeahead:cursorchanged', function() {
        console.log('cursorchanged');
      });*/

      scope.$on('$destroy', function () {
        element.typeahead('destroy');
      });

      function OnSelected(objquery, item, array) {
        if (onselectedIsFunction) {
          scope.onselected()(item);
        }
        else {
            logwarn('\'onselected\' not called: Is not defined or is not a function.');
        }
        if (scope.donotclearvalue===undefined || scope.donotclearvalue==='false') {
          inputElem.typeahead('val', '');
        }
      }
      function OnClosed(objquery, item, array) {
        if (onclosedIsFunction) {
          scope.onclosed()({name: inputElem.typeahead('val')});
        }
        else {
          logwarn('\'onclosed\' not called: Is not defined or is not a function.');
        }
      }
      function configTypeaheadBloodhound() {
        if (!scope.remote) {
          logerror('Attribute [remote] was not defined.');
        }
        if (!scope.datasource) {
          scope.datasource = 'datasource';
          logwarn('Attribute [datasource] was not defined. Using default name:\'datasource\'');
        }

        var objectSource = new Bloodhound({
          datumTokenizer: Bloodhound.tokenizers.obj.whitespace(scope.key),
          queryTokenizer: Bloodhound.tokenizers.whitespace,
          limit: scope.limit,
          remote: scope.remote + '%QUERY'
        });
        if (scope.remote) {
          objectSource.initialize().then(function () {
            inputElem.typeahead({
              minLength: scope.minlensugestion,
              highlight: true
            }, {
              name: scope.datasource,
              displayKey: scope.key,
              source: objectSource.ttAdapter()
              /*,templates: {
                empty: '',
                footer: '',
                header: ''
              }*/
            });
          });
        }

      }
      function testIsFunction(f) {
        return {}.toString.call(f) === '[object Function]';
      }
      function logwarn(message) {
        $log.warn(message + '([warpAutocompleteTypeaheadjs]:id:' + attrs.id + ')');
      }
      function logerror(message) {
        $log.error(message + '([warpAutocompleteTypeaheadjs]:id:' + attrs.id + ')');
      }
    };


  }
}());
