/**
* Directive appBookShop.components forminput
* (João Carvalho, 27-08-2015)
* Criado com base em angular design style de John Papa
* (https://github.com/johnpapa/angular-styleguide)
*
* Descrição: Directive to config an form group element
*/
(function() {
  'use strict';
  angular
    .module('appBookShop.components')
    .directive('forminputOldOld', forminput)
    .controller('forminputCtrl', forminputCtrl);

  /*
  * Private block
  *
   */

  var CONTENT = {
    text:'<label for="$name" class="sr-only ng-scope">$placeholder</label>' +
      '<div class="input-group">' +
      '<span id="$name" class="input-group-addon"></span>' +
      '<input type="$type" name="$name" id="$name" placeholder="$placeholder" ng-model="ngModel" class="form-control" $more>' +
      '</div>',
    textarea:'<label for="$name" class="sr-only ng-scope">$placeholder</label>' +
      '<div class="input-group">' +
      '<span id="$name" class="input-group-addon"></span>' +
      '<textarea rows="3" name="$name" id="$name" placeholder="$placeholder" ng-model="ngModel" class="form-control" $more></textarea>' +
      '</div>',
    angulartypeaheadjs: '<label for="$name" class="sr-only ng-scope">$placeholder</label>' +
      '<div class="input-group">' +
      '<span id="$name" class="input-group-addon"></span>' +
      '<angular-typeaheadjs angty-options=\'$angtyoptions\' angty-ttoptions=\'$angtyttoptions\')>' +
      '<input class="typeahead" id="$name" name="$name" placeholder="$placeholder" ng-model="ngModel">' +
      '</angular-typeaheadjs>' +
      '</div>'
  };

  function replaceContent(type, name, placeholder, angtyoptions, angtyttoptions, more) {
    return CONTENT[type]
      .replace(/\$type/g, type)
      .replace(/\$name/g, name)
      .replace(/\$placeholder/g, placeholder)
      .replace(/\$angtyoptions/g, angtyoptions/*.replace(/"/g, '\"')*/)
      .replace(/\$angtyttoptions/g, angtyttoptions/*.replace(/"/g, '\"')*/)
      .replace(/\$more/g, more? more: '');

  }

  function setupDomContent( $compile, scope, element, attrs ) {
    //get the input

    element[0].classList.add('form-group');

    var html = replaceContent(attrs.type, attrs.name, attrs.placeholder, attrs.angtyOptions, attrs.angtyTtoptions, attrs.more);
    element.append($compile(html)(scope));

    /*var input = elHtml.querySelector('input, textarea, select, angular-typeaheadjs.input');
    var name = input.getAttribute('name');
    name = name || input.getAttribute('id');

    var type = input.getAttribute('type');
    if ( type !== 'checkbox' && type !== 'radio' ) {
      input.classList.add('form-control');
    }
    elHtml.classList.add('form-group');

    //divinputgroup
    var div = element.find('div.input-group');
    div.prepend('<span id="' + name + '" class="input-group-addon"></span>');

    return name;*/
  }

  /* @ngInject */
  function forminputCtrl( $scope ) {
  }

  var linkingFunction = function( $compile ) {
    return function( scope, element, attrs, form ) {
      setupDomContent($compile, scope, element, attrs);
      //var name = setupDom(element);

      //addLabel($compile, scope, form, element, name, attrs);
    };
  }

  /*function addLabel( $compile, scope, form, element, name, attrs ) {
    var html = '<label for="' + name + '" class="sr-only">' + attrs.placeholder + '</label>';

    element.prepend($compile(html)(scope));
  }

  function setupDom( element ) {
    //get the input
    var elHtml = element[0];
    var input = elHtml.querySelector('input, textarea, select, angular-typeaheadjs.input');
    var name = input.getAttribute('name');

    name = name || input.getAttribute('id');

    var type = input.getAttribute('type');
    if ( type !== 'checkbox' && type !== 'radio' ) {
      input.classList.add('form-control');
    }
    elHtml.classList.add('form-group');

    //divinputgroup
    var div = element.find('div.input-group');
    div.prepend('<span id="' + name + '" class="input-group-addon"></span>');

    return name;
  }*/

  /* @ngInject */
  function forminput( $compile ) {
    /*
    * Public Interface
    */
    var directive = {
      restrict: 'AC',
      require: '^form',
      scope: {
        ngModel: '=?'
      },
      controller: 'forminputCtrl',
      controllerAs: 'model',
      link: linkingFunction($compile)

    };
    return directive;
    ///////////////

  }
}());
