'use strict';

describe('Unit: \'windowScroll\' Directive', function() {
  var $compile, $scope, $window, $timeout;
  var elementTag = '<div><window-scroll window-scroll-timeout="150" window-scroll-event="testscroll"/></div>';
  var elementTagNoEvent = '<div><window-scroll window-scroll-timeout="150"/></div>';
  var elementTagNoTimeout = '<div><window-scroll  window-scroll-event="testscroll"/></div>';
  var elementTagTimeoutError = '<div><window-scroll window-scroll-timeout="not a number" window-scroll-event="testscroll"/></div>';
  var attributeTag = '<div window-scroll window-scroll-timeout="150" window-scroll-event="testscroll"/></div>';
  var classTag = '<div class="window-scroll" window-scroll-timeout="150" window-scroll-event="testscroll"/></div>';
  var defaultValue = {value:{windowScrollX: 100, windowScrollY: 100}};


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

  var spyWindowScrollBy;

  beforeEach(function() {
    spyWindowScrollBy = sinon.spy($window, 'scrollBy');
  });

  afterEach(function() {
    spyWindowScrollBy.restore();
  });

  function emit(value) {
    var val = value? value.value: defaultValue.value;
    $scope.$emit('testscroll', val);

    //need a try catch because $timeout.flush if there is not timeout to flush
    //and we need to test things if timeout occurred or not so we need to bypass this throw
    try { $timeout.flush(); } catch(e) {}
  }

  function process( tag, value ) {
    var element = angular.element(tag);
    $compile(element)($scope);
    $scope.$digest();

    emit(value);
  }
  it('should render as element and call window.scrollBy', function() {

    process(elementTag);

    expect(spyWindowScrollBy).to.have.been.calledWith(100,100);

  });
  it('should render with an attribute and call window.scrollBy', function() {

    process(attributeTag);

    expect(spyWindowScrollBy).to.have.been.calledWith(100,100);

  });
  it('should render with a class attribute and call window.scrollBy', function() {

    process(classTag);

    expect(spyWindowScrollBy).to.have.been.calledWith(100,100);

  });
  it('should not render and not call window.scrollBy when not passing in an event name', function() {

    process(elementTagNoEvent);

    expect(spyWindowScrollBy).to.not.have.been.called;

  });
  it('should render and call window.scrollBy when not passing a timeout value', function() {

    process(elementTagNoTimeout);

    expect(spyWindowScrollBy).to.have.been.calledWith(100,100);

  });
  it('should not render and not call window.scrollBy when passing an invalid timeout value', function() {

    process(elementTagTimeoutError);

    expect(spyWindowScrollBy).to.not.have.been.called;

  });
  it('should call window.scrollBy when not passing in a value for x scroll', function() {

    process(elementTag, {value:{windowScrollY:50}});

    spyWindowScrollBy.should.have.been.called;
    spyWindowScrollBy.should.have.been.calledWith(0,50);

  });
  it('should call window.scrollBy when not passing in a value for y scroll', function() {

    process(elementTag, {value:{windowScrollX:50}});

    spyWindowScrollBy.should.have.been.called;
    spyWindowScrollBy.should.have.been.calledWith(50,0);

  });
  it('should not call window.scrollBy when passing in null for scroll', function() {

    process(elementTag, {value:null});

    spyWindowScrollBy.should.not.have.been.called;

  });
  it('should not call window.scrollBy when passing in undefined for scroll', function() {

    process(elementTag, {});

    spyWindowScrollBy.should.not.have.been.called;


  });
  it('should not call window.scrollBy when passing a number for scroll', function() {

    process(elementTag, {value:1111});

    spyWindowScrollBy.should.not.have.been.called;


  });
  it('should not call window.scrollBy when passing a string for scroll', function() {

    process(elementTag, {value:'21212'});

    spyWindowScrollBy.should.not.have.been.called;


  });
  it('should not call window.scrollBy when passing a boolean for scroll', function() {

    process(elementTag, {value:true});

    spyWindowScrollBy.should.not.have.been.called;


  });
  it('should not call window.scrollBy when passing a regex for scroll', function() {

    process(elementTag, {value:/aaa/g});

    spyWindowScrollBy.should.have.been.called;
    spyWindowScrollBy.should.have.been.calledWith(0,0);


  });
  it('should not call window.scrollBy after scope destroy', function() {

    process(elementTag);//called first time

    spyWindowScrollBy.should.have.been.called;
    spyWindowScrollBy.should.have.been.calledOnce;//1
    spyWindowScrollBy.should.have.been.calledWith(100,100);

    emit();//called second time

    spyWindowScrollBy.should.have.been.calledTwice;//2

    $scope.$destroy();

    //after detroy the number of calls should not increase
    emit();
    spyWindowScrollBy.should.have.been.calledTwice;//2

  });

});
