/**
 * Directive appBookShop.components warp-autocomplete-typeaheadjs
 * (João Carvalho, 13-03-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Descrição: Directive/component to support typeahead.js autocomplete library (https://twitter.github.io/typeahead.js/)
 * with Bloodhound Integration (https://github.com/twitter/typeahead.js/blob/master/doc/bloodhound.md)
 *
 * Attri
 * id="panel-filtercat-dropdown-menu",onselected="vm.onSelected", datasource="categories", key="name", limit="25", remote="/api/categories/search/"
 */
(function () {
  'use strict';

  angular
    .module('appBookShop.components', ['ngSanitize'])
    .directive('warpAutocompleteTypeaheadjs', warpautocompletetypeaheadjs);

  /* @ngInject */
  function warpautocompletetypeaheadjs($log) {
    var directive = {
      // use as element: <warp-autocomplete-typeaheadjs .../>
      restrict: 'E',
      scope: {
        remote: '@',
        datasource: '@?',
        onselected: '&',
        donotclearvalue: '@?',
        minlensugestion: '@?',
        limit: '@?',
        placeholder: '@?',
        classinput: '@?'
      },
      template: '<input type="text" placeholder="{{placeholder}}" class="typeahead {{classinput}}"/>',
      link: linkfunction
    };
    return directive;
    ////////////////
    function linkfunction(scope, element, attrs) {
      var inputElem = $('#' + attrs.id + ' .typeahead');
      var onselectedIsFunction = true;
      scope.minlensugestion = scope.minlensugestion || 3;
      scope.key = scope.key || 'name';
      scope.limit = scope.limit || 25;
      if (!(!scope.onselected? false : (!testIsFunction(scope.onselected)? false: testIsFunction(scope.onselected())))) {
        onselectedIsFunction = false;
        $log.error('\'onselected\' is not defined or is not a function. (autocompleteTypeaheadjs:id:' + attrs.id + ')');
      }

      configTypeaheadBloodhound();

      element.on('typeahead:selected', OnSelected);

      scope.$on('$destroy', function () {
        element.typeahead('destroy');
      });

      function OnSelected(objquery, item, array) {
        if (onselectedIsFunction) {
          scope.onselected()(item);//{item: item});
        }
        else {
            $log.warn('\'onselected\' not called: Is not defined or is not a function. (autocompleteTypeaheadjs:id:' + attrs.id + ')');
        }
        if (scope.donotclearvalue===undefined || scope.donotclearvalue==='false') {
          inputElem.typeahead('val', '');
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
              source: objectSource.ttAdapter()/*,
          templates: {
            empty: '<small>Categorias não encontradas</small>',
            footer: '<hr>',
            header: '<small><strong>Categorias:</strong></small>'
          }*/
            });
          });
        }

      }
      function testIsFunction(f) {
        return {}.toString.call(f) === '[object Function]';
      }
      function logwarn(message) {
        $log.warn(message + '([appBookShop.components][warpAutocompleteTypeaheadjs]:id:' + attrs.id + ')');
      }
      function logerror(message) {
        $log.error(message + '([appBookShop.components][warpAutocompleteTypeaheadjs]:id:' + attrs.id + ')');
      }
    };


  }
}());
