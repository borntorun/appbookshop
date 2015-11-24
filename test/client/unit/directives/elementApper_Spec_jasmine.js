'use strict'

describe("Unit: 'elementAppear' Directive", function() {
  var $compile, $scope, $window, $timeout;
  var attributeTag = '<div id="elteste" element-appear prefix-event-name="testevent"/></div>';


  beforeEach(module('appBookShop.components'));
  /**
   * Inject dependencies before each test
   */
  beforeEach(inject(function( _$rootScope_, _$compile_, _$window_, _$timeout_ ) {
    $scope = _$rootScope_.$new();
    $compile = _$compile_;
    $window = _$window_;
    $timeout = _$timeout_;

  }));

  beforeEach(function() {
  });

  afterEach(function() {
  });

  //expect(function() {$timeout.flush();}).toThrow();

  function process( tag ) {
    var element = angular.element(tag);
    expect(element.appear).toBeDefined();
    $compile(element)($scope);
    $scope.$digest();
    return element;
  }

  it('should \'render\' and set jquery events', function() {

    var element = process(attributeTag), args;

    chai.expect(function() {
      $timeout.flush();
    }).to.not.throw();

    expect(element).toHandle('appear');

  });

});
