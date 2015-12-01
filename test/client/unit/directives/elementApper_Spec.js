'use strict';

describe('Unit: \'elementAppear\' Directive', function() {
  var $compile, $scope, $window, $timeout;
  var attributeTag = '<div id="elteste" element-appear prefix-event-name="test-event"/></div>';
  var attributeTagNoEventName = '<div element-appear/></div>';
  var attributeTagInvalid1EventName = '<div element-appear prefix-event-name="111"/></div>';
  var attributeTagInvalid2EventName = '<div element-appear prefix-event-name="test%test"/></div>';
  var attributeTagInvalid3EventName = '<div element-appear prefix-event-name="test_test"/></div>';
  var attributeTagInvalid4EventName = '<div element-appear prefix-event-name="test.test"/></div>';
  var classTag = '<div class="element-appear" prefix-event-name="test-event"/></div>';

  var spyScopeOn, spyJqueryPluginAppear;
  var objFocus = {};

  beforeEach(module('warp.components'));
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
    spyScopeOn = sinon.spy($scope, '$on');
    spyJqueryPluginAppear = sinon.spy($.fn, 'appear');
  });

  afterEach(function() {
    spyScopeOn.restore();
    spyJqueryPluginAppear.restore();
    objFocus.on && objFocus.on();
    objFocus.off && objFocus.off();
    objFocus = {};
  });

  //expect(function() {$timeout.flush();}).toThrow();

  function process( tag ) {
    var element = angular.element(tag);
    expect(element.appear).to.not.be.undefined;
    $compile(element)($scope);
    $scope.$digest();
    return element;
  }

  function setObjFocus(element) {
    objFocus.scope = $scope;
    objFocus.element = element;
    objFocus.verifyOnOff = null;
    objFocus.on = objFocus.scope.$on('test-event-on', function(){objFocus.verifyOnOff=true;});
    objFocus.off =objFocus.scope.$on('test-event-off', function(){objFocus.verifyOnOff=false;});
  }

  function expectTimeoutThrowBehaviour(what) {
    var f = function() {$timeout.flush();};
    what && (expect(f).to.throw());
    !what && (expect(f).to.not.throw());
  }

  function expectTriggerEvent(name, result, done) {
    //trigger appear|disappear will trigger event on scope test-event-[on|off]
    //that will set objFocus.verifyOnOff to true|false on not changed (null)
    objFocus.element.trigger(name);

    var f = function(){
      return objFocus.verifyOnOff;
    };

    $timeout(f,100)
      .then(function(value){
        expect(value).to.be.equal(result);
        done && done();
      })
      .catch(function(error){
        done && done(error);
      });

    expectTimeoutThrowBehaviour(false);
  }

  it('should \'render\' and call plugin appear', function() {

    var element = process(attributeTag);

    expectTimeoutThrowBehaviour(false);

    setObjFocus(element);

    expect(objFocus.scope.model.eventName).to.be.equal('test-event');
    expect(objFocus.scope.model.processRunning).to.be.equal(false);

    //spy on jQuery plugin appear
    spyJqueryPluginAppear.should.have.been.called;

  });
  it('should \'render\' and have events -on running', function(done) {

    var element = process(attributeTag);

    expectTimeoutThrowBehaviour(false);

    setObjFocus(element);

    expect(objFocus.scope.model.eventName).to.be.equal('test-event');
    expect(objFocus.scope.model.processRunning).to.be.equal(false);

    //trigger appear will trigger event on scope test-event-on and set objFocus.verifyOnOff to true
    expectTriggerEvent('appear', true, done);

  });
  it('should \'render\' and have events -off running', function(done) {

    var element = process(attributeTag);

    expectTimeoutThrowBehaviour(false);

    setObjFocus(element);

    expect(objFocus.scope.model.eventName).to.be.equal('test-event');
    expect(objFocus.scope.model.processRunning).to.be.equal(false);

    //trigger disappear will trigger event on scope test-event-off and set objFocus.verifyOnOff to false
    expectTriggerEvent('disappear', false, done);
  });

  it('should \'render\' and set listener on event $destroy on $scope', function(done) {

    var element = process(attributeTag);

    expectTimeoutThrowBehaviour(false);

    setObjFocus(element);

    //spy on $scope.$on
    spyScopeOn.should.have.been.called;
    var args = spyScopeOn.args[0];
    expect(args[0]).to.be.equal('$destroy');
    assert.isFunction(args[1]);

    objFocus.scope.$destroy();

    //after destroy trigger appear|disappear will not trigger events
    expectTriggerEvent('appear', null);
    expectTriggerEvent('disappear', null, done);

  });
  it('should not \'render\' and not set listener on event $destroy on $scope when not passing in an event name', function() {

    process(attributeTagNoEventName);

    expectTimeoutThrowBehaviour(true);

    spyScopeOn.should.not.have.been.called;

  });
  it('should not \'render\' and not set event $destroy on $scope when not passing in a correct type for event name', function() {

    //1
    process(attributeTagInvalid1EventName);

    expectTimeoutThrowBehaviour(true);

    spyScopeOn.should.not.have.been.called;

    //2
    process(attributeTagInvalid2EventName);

    expectTimeoutThrowBehaviour(true);

    spyScopeOn.should.not.have.been.called;

    //3
    process(attributeTagInvalid3EventName);

    expectTimeoutThrowBehaviour(true);

    spyScopeOn.should.not.have.been.called;

    //4
    process(attributeTagInvalid4EventName);

    expectTimeoutThrowBehaviour(true);

    spyScopeOn.should.not.have.been.called;

  });
  it('should \'render\' as class and call plugin appear', function() {

    process(classTag);

    expectTimeoutThrowBehaviour(false);

    //spy on jQuery plugin appear
    spyJqueryPluginAppear.should.have.been.called;

  });

});
