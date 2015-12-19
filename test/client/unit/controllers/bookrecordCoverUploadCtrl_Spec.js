'use strict';

describe(myUtil.title.controller('BookrecordCoverUploadCtrl'), function() {
  var $controller, $scope, $httpBackend, $cacheFactory, $timeout;
  var requestSearchHandler;

  beforeEach(module.apply(null,['appBookShop.bookrecord'].concat(myUtil.config.module)));

  beforeEach(inject(function( _$rootScope_, _$controller_, _$httpBackend_, _$cacheFactory_, _$timeout_ ) {
    $controller = _$controller_;
    //    $rootScope = _$rootScope_;
    $scope = _$rootScope_.$new();
    $httpBackend = _$httpBackend_;
    $cacheFactory = _$cacheFactory_;
    //    $stateParams = { reference: '1' };
    $timeout = _$timeout_;
  }));

  beforeEach(function() {
    //    requestSearchHandler = httpBackendDefinitions();
    httpBackendDefinitions();
  });

  afterEach(httpBackendVerifyNoOutstanding);

  var ctrl;

  beforeEach(function() {
    ctrl = $controller('BookrecordCoverUploadCtrl', {
      $scope: $scope,
      appConfig: {
        book: myMocks.appconfig.book().config,
        message: myMocks.appconfig.message().config
      },
      Book: {
        images: []
      }
    });
//    for ( var k in ctrl ) {
//      dump('key=' + k, ctrl[k]);
//    }
//    dump(ctrl.book);
  });

  it('should have fotos[] and empty, and book.images[] and empty', function( /*done*/ ) {
    $timeout(function() {
    })
      .then(function() {

        expect(ctrl.fotos).to.be.instanceof(Array);
        expect(ctrl.fotos.length).to.equal(0);
        expect(ctrl.book.images).to.be.instanceof(Array);
        expect(ctrl.book.images.length).to.equal(0);

      });

    $timeout.flush();

  });
  it('should add 1 foto', function( /*done*/ ) {
    $timeout(function() {
    })
      .then(function() {

        ctrl.update('111', '1');
        expect(ctrl.fotos).to.be.instanceof(Array);
        expect(ctrl.fotos.length).to.equal(1);
        expect(ctrl.book.images).to.be.instanceof(Array);
        expect(ctrl.book.images.length).to.equal(1);

      });

    $timeout.flush();

  });
  it('should add 1 foto and have arrays with correct data', function( /*done*/ ) {
    $timeout(function() {
    })
      .then(function() {

        ctrl.update('1234567890123456789012345678901234567890', '123456789012345678901234567890');
        expect(ctrl.fotos).to.be.instanceof(Array);
        expect(ctrl.fotos.length).to.equal(1);
        expect(ctrl.fotos[0].src).to.equal('123456789012345678901234567890');
        expect(ctrl.fotos[0].name).to.equal('12345678901234567890');
        expect(ctrl.fotos[0].active).to.equal(true);


        expect(ctrl.book.images).to.be.instanceof(Array);
        expect(ctrl.book.images.length).to.equal(1);
        expect(ctrl.book.images[0].original).to.equal('1234567890123456789012345678901234567890');
        expect(ctrl.book.images[0].resized).to.equal('123456789012345678901234567890');

      });

    $timeout.flush();

  });
  it('should add 2 foto and set cover the second one', function( /*done*/ ) {
    $timeout(function() {
    })
      .then(function() {

        ctrl.update('1234567890123456789012345678901234567890', '123456789012345678901234567890');
        ctrl.update('12345678901234567890123456789012345678901234567890', '1234567890123456789011111111112222222222');
        expect(ctrl.fotos).to.be.instanceof(Array);
        expect(ctrl.fotos.length).to.equal(2);
        ctrl.setCover(1);
        expect(ctrl.fotos[0].src).to.equal('1234567890123456789011111111112222222222');
        expect(ctrl.fotos[0].name).to.equal('11111111112222222222');
        expect(ctrl.fotos[0].active).to.equal(true);
        expect(ctrl.fotos[1].active).to.equal(false);

      });

    $timeout.flush();

  });
  it('should add 2 foto and remove the first one', function( /*done*/ ) {
    $timeout(function() {
    })
      .then(function() {

        ctrl.update('1234567890123456789012345678901234567890', '123456789012345678901234567890');
        ctrl.update('12345678901234567890123456789012345678901234567890', '1234567890123456789011111111112222222222');
        expect(ctrl.fotos).to.be.instanceof(Array);
        expect(ctrl.fotos.length).to.equal(2);
        ctrl.remove(0);
        expect(ctrl.fotos.length).to.equal(1);
        expect(ctrl.fotos[0].src).to.equal('1234567890123456789011111111112222222222');
        expect(ctrl.fotos[0].name).to.equal('11111111112222222222');
        expect(ctrl.fotos[0].active).to.equal(true);


        expect(ctrl.book.images).to.be.instanceof(Array);
        expect(ctrl.book.images.length).to.equal(1);
        expect(ctrl.book.images[0].original).to.equal('12345678901234567890123456789012345678901234567890');
        expect(ctrl.book.images[0].resized).to.equal('1234567890123456789011111111112222222222');

      });

    $timeout.flush();

  });
  it('should add 3 foto and remove the middle one', function( /*done*/ ) {
    $timeout(function() {
    })
      .then(function() {

        ctrl.update('111', '1');
        ctrl.update('222', '2');
        ctrl.update('333', '3');
        expect(ctrl.fotos).to.be.instanceof(Array);
        expect(ctrl.fotos.length).to.equal(3);
        ctrl.remove(1);
        expect(ctrl.fotos.length).to.equal(2);
        expect(ctrl.fotos[1].src).to.equal('3');
        expect(ctrl.fotos[1].name).to.equal('3');

        expect(ctrl.book.images).to.be.instanceof(Array);
        expect(ctrl.book.images.length).to.equal(2);
        expect(ctrl.book.images[1].original).to.equal('333');
        expect(ctrl.book.images[1].resized).to.equal('3');

      });

    $timeout.flush();

  });
  it('should add 3 foto and remove the last one', function( /*done*/ ) {
    $timeout(function() {
    })
      .then(function() {

        ctrl.update('111', '1');
        ctrl.update('222', '2');
        ctrl.update('333', '3');
        expect(ctrl.fotos).to.be.instanceof(Array);
        expect(ctrl.fotos.length).to.equal(3);
        ctrl.remove(2);
        expect(ctrl.fotos.length).to.equal(2);
        expect(ctrl.fotos[0].src).to.equal('1');
        expect(ctrl.fotos[0].name).to.equal('1');
        expect(ctrl.fotos[1].src).to.equal('2');
        expect(ctrl.fotos[1].name).to.equal('2');

        expect(ctrl.book.images).to.be.instanceof(Array);
        expect(ctrl.book.images.length).to.equal(2);
        expect(ctrl.book.images[0].original).to.equal('111');
        expect(ctrl.book.images[0].resized).to.equal('1');
        expect(ctrl.book.images[1].original).to.equal('222');
        expect(ctrl.book.images[1].resized).to.equal('2');

      });

    $timeout.flush();

  });

  it('should add 3 foto and remove all', function( /*done*/ ) {
    $timeout(function() {
    })
      .then(function() {

        ctrl.update('111', '1');
        ctrl.update('222', '2');
        ctrl.update('333', '3');
        expect(ctrl.fotos).to.be.instanceof(Array);
        expect(ctrl.fotos.length).to.equal(3);
        expect(ctrl.book.images).to.be.instanceof(Array);
        expect(ctrl.book.images.length).to.equal(3);

        ctrl.remove(0);
        ctrl.remove(0);
        ctrl.remove(0);

        expect(ctrl.fotos).to.be.instanceof(Array);
        expect(ctrl.fotos.length).to.equal(0);
        expect(ctrl.book.images).to.be.instanceof(Array);
        expect(ctrl.book.images.length).to.equal(0);

      });

    $timeout.flush();

  });

  function httpBackendVerifyNoOutstanding() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  }

  function httpBackendDefinitions() {

    //this request is made when calling the app module
    //not nececessary for the tests
    $httpBackend.when('GET', '/api/appconfig/book/').respond(200, myMocks.appconfig.book());
    $httpBackend.when('GET', '/api/appconfig/message/').respond(200, myMocks.appconfig.message());

    //this is the definition for the tests
    //return $httpBackend.when('GET', /^\/api\/books\/admin\/*./);
  }

});
