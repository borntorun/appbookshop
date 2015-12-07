'use strict';

describe.only(myUtil.title.controller('BookrecordCtrl'), function() {
  var $controller, $scope, $httpBackend, $cacheFactory, $rootScope, $stateParams;
  var requestSearchHandler;

  beforeEach(module('appBookShop.bookrecord'));


  beforeEach(inject(function( _$rootScope_, _$controller_, _$httpBackend_, _$cacheFactory_ ) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $scope = _$rootScope_.$new();
    $httpBackend = _$httpBackend_;
    $cacheFactory = _$cacheFactory_;
    $stateParams = { reference: '1' };
  }));

  beforeEach(function() {
    requestSearchHandler = httpBackendDefinitions();
  });

  afterEach(httpBackendVerifyNoOutstanding);

  it('should ....', function( done ) {
    requestSearchHandler.respond([
      {title: 'um'}
    ]);

    var bookrecordCtrl = $controller('BookrecordCtrl', {
      $scope: $scope,
      $stateParams: $stateParams,
      appConfig: {
        book:getBookConfig()
      },
      message: {}
    });

    $httpBackend.flush();
    //dump($scope);

    waitsForAndThenRun(null, function() {
      /*for (var k in bookrecordCtrl){
        dump('key=' +k, bookrecordCtrl[k]);
      }
      dump(bookrecordCtrl.book);*/

      dump('>>>>>>>>>>>>>>>>>>>>>>NEED TEST THINGS!<<<<<<<<<<<<<<<<<<<<<<<<<<');

      done();
    }, 100);

  });

  function httpBackendVerifyNoOutstanding() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  }

  function httpBackendDefinitions() {

    //this request is made when calling the app module
    //not nececessary for the tests
    $httpBackend.when('GET', '/api/appconfig/book/').respond(200, null);
    $httpBackend.when('GET', '/api/appconfig/message/').respond(200, null);

    //this is the definition for the tests
    return $httpBackend.when('GET', /^\/api\/books\/admin\/*./);
  }

  //mocks
  function getBookConfig() {
    return {
      config: {
        search: {
          limitDefault: 25,
          limitFeatured: 25,
          viewportDefault: 75
        }
      }
    };
  }
});
