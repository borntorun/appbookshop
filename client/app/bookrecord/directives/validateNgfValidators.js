/**
 * Directive appBookShop.bookrecord validateNgfValidators
 * (João Carvalho, 16-12-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Description: Removes (sets valid=true) the value of upload validatores
 */
(function() {
  'use strict';
  /*jshint validthis: true */
  angular
    .module('appBookShop.bookrecord')
    .directive('validateNgfValidators', validateNgfValidators);

  /* @ngInject */
  function validateNgfValidators( $timeout ) {
    /*
    * Private Block for private vars
    */

    /*
    * Public Interface
    */
    //<Any convert-image-data="field key on model"/>

    var directive = {
      restrict: 'A',
      require: 'ngModel',
      link: link
    };
    return directive;
    ///////////////
    //just put private functions below this point
    function link( scope, element, attrs, controllers ) {
      if ( !attrs.ngfSelect ) {
        return;
      }

      var validators = scope.$eval(attrs.validateNgfValidators);
      if (typeof validators === 'string') {
        validators = validators.split(',');
      }

      controllers.$parsers.unshift(function( value ) {
        if ( angular.isArray(value) && value.length == 0 ) {
          $timeout(function() {
            validators.forEach(function(item){
              controllers.$setValidity(item.trim(), true);
            });

          }, 5000);
        }
        return value;
      });
    }
  }

}());
