'use strict';

describe.only('Unit: \'enterAsTab\' Directive', function() {
  var $compile, $scope, $window, $timeout, $, mutationObserver;
  var spymutationObserverApply, spyScopeOn;

  var attributeTag = '<form id="oform" enter-as-tab>#childs</form>';
  var classTag = '<form id="oform" class="enter-as-tab"></form>';
  var invalidTag = '<xform enter-as-tab></xform>';
  var childs = [
    '<textarea id="c2" tabindex="2"/>',
    '<input id="c1" tabindex="1"/>',
    '<input id="c-1" tabindex="-1"/>',
    '<input id="c7" disabled tabindex="7"/>',
    '<input id="c8" style="visibility: hidden;display: none" tabindex="8"/>',
    '<a id="c4" tabindex="4" href="">link</a>',
    '<select id="c3" tabindex="3"><option></option></select>',
    '<i id="c6" tabindex="6"></i>',
    '<button id="c5" tabindex="5"/>'
  ];

  beforeEach(module('appBookShop.components'));
  /**
   * Inject dependencies before each test
   */

  beforeEach(inject(function( _$rootScope_, _$compile_, _$window_, _$timeout_, _$_, _mutationObserver_ ) {
    $scope = _$rootScope_.$new();
    $compile = _$compile_;
    $window = _$window_;
    $timeout = _$timeout_;
    $ = _$_;
    mutationObserver = _mutationObserver_;
  }));

  beforeEach(function() {
    spymutationObserverApply = sinon.spy(mutationObserver, 'apply');
    spyScopeOn = sinon.spy($scope, '$on');
  });

  afterEach(function() {
    spymutationObserverApply.restore();
    spyScopeOn.restore();
    if ($window.document.body.lastChild.tagName === 'FORM') {
      $('#oform').remove();
    }
  });

  //expect(function() {$timeout.flush();}).toThrow();

  function process( tag ) {
    var element = angular.element(tag);
    $compile(element)($scope);
    $scope.$digest();
    return element;
  }

  function expectTimeoutThrowBehaviour( what ) {
    var f = function() {
      $timeout.flush();
    };
    what && (expect(f).to.throw());
    !what && (expect(f).to.not.throw());
  }

  it('should \'render\' as attribute', function() {

    process(attributeTag);

    expect($scope._enterAsTab.observableElement).to.not.be.undefined;
    expect($scope._enterAsTab.allTabindex).to.not.be.undefined;
    expect($scope._enterAsTab.allTabindex).to.be.instanceof(Array);
    expect($scope._enterAsTab.allTabindex.length).to.be.equal(0);

  });
  it('should \'render\' as class', function() {

    process(classTag);

    expect($scope._enterAsTab.observableElement).to.not.be.undefined;
    expect($scope._enterAsTab.allTabindex).to.not.be.undefined;
    expect($scope._enterAsTab.allTabindex).to.be.instanceof(Array);
    expect($scope._enterAsTab.allTabindex.length).to.be.equal(0);

  });
  it('should not \'render\' if element is not form', function() {

    process(invalidTag);

    expect($scope._enterAsTab.observableElement).to.be.undefined;

  });
  it('should \'render\' and set listener on event $destroy on $scope', function() {
    var element = process(attributeTag);

    //spy on $scope.$on
    spyScopeOn.should.have.been.called;
    var args = spyScopeOn.args[0];
    expect(args[0]).to.be.equal('$destroy');
    assert.isFunction(args[1]);

  });
  it('should \'render\' and on Enter Key set collection of observable elements', function( done ) {
    var element = process(attributeTag.replace('#childs', childs.join('')));
    $window.document.body.appendChild(element[0]);

    var input = element.find('[id="c1"]');
    var e = $.Event('keydown', { keyCode: 13 });
    input.trigger(e);

    $timeout(function() {
      return $scope._enterAsTab.allTabindex;
    })
      .then(function( value ) {
        //test call to mutationObserser
        spymutationObserverApply.should.have.been.called;
        var args = spymutationObserverApply.args;
        expect(args[0][0]).to.be.equal(element[0]);

        expect(value).to.be.instanceof(jQuery);
        expect(value.length).to.be.equal(6);

        //test for correct order of tabindex
        value.each(function( index, item ) {
          expect(item.tabIndex).to.be.equal(index + 1);
          expect(item.id).to.be.equal('c' + (index + 1));
        });

        //test for the correct element to have focus
        expect(document.activeElement.tagName).to.be.equal('TEXTAREA');

        done();

      })
      .catch(function( error ) {
        done(error);
      });
    expectTimeoutThrowBehaviour(false);

  });
  it('should \'render\' and set correct active element on Enter Key', function( done ) {
    var element = process(attributeTag.replace('#childs', childs.join('')));
    $window.document.body.appendChild(element[0]);
    var select = element.find('[id="c3"]');
    var e = $.Event('keydown', { keyCode: 13 });
    select.trigger(e);

    $timeout(function() {
      return $scope._enterAsTab.allTabindex;
    })
      .then(function( value ) {
        //test for the correct element to have focus
        expect(document.activeElement.tagName).to.be.equal('A');

        done();

      })
      .catch(function( error ) {
        done(error);
      });
    expectTimeoutThrowBehaviour(false);

  });
  it('should \'render\' and set new elemet on the observable collections', function( done ) {
    var element = process(attributeTag.replace('#childs', childs.join('')));
    $window.document.body.appendChild(element[0]);
    var select = element.find('[id="c3"]');
    var e = $.Event('keydown', { keyCode: 13 });
    select.trigger(e);
    //
    $timeout(function() {
      //add a new element to the form
      element.append($('<input/>').attr({ id: 'cNew', tabindex: '7' }));

      waitsForAndRuns(function() {
          return false;
        },
        function() {
          expect($scope._enterAsTab.allTabindex).to.be.instanceof(jQuery);
          expect($scope._enterAsTab.allTabindex.length).to.be.equal(7);
          expect($scope._enterAsTab.allTabindex[6].id).to.be.equal('cNew');
          expect($scope._enterAsTab.allTabindex[6].tabIndex).to.be.equal(7);

          done();
        }, 100);

    });

    expectTimeoutThrowBehaviour(false);

  });

  // Credits: https://gist.github.com/abreckner/110e28897d42126a3bb9
  var waitsForAndRuns = function( escapeFunction, runFunction, escapeTime ) {
    if ( escapeFunction() ) {
      runFunction();
      return;
    }
    // check the escapeFunction every millisecond so as soon as it is met we can escape the function
    var interval = setInterval(function() {
      if ( escapeFunction() ) {
        clearMe();
        runFunction();
      }
    }, 1);
    // in case we never reach the escapeFunction, we will time out
    // at the escapeTime
    var timeOut = setTimeout(function() {
      clearMe();
      runFunction();
    }, escapeTime);
    // clear the interval and the timeout
    function clearMe() {
      clearInterval(interval);
      clearTimeout(timeOut);
    }
  };

});
