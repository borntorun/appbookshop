'use strict';

describe(myUtil.title.controller('BookSearchResultsCtrl'), function() {
  var $controller, $scope, $httpBackend, $cacheFactory, $rootScope, $stateParams;
  var requestSearchHandler;

  beforeEach(module('blocks.signals'));
  beforeEach(module('appBookShop.booksearch'));
  //beforeEach(module('appBookShop'));
  //beforeEach(module('jadetemplates'));

  beforeEach(inject(function( _$rootScope_, _$controller_, _$httpBackend_, _$cacheFactory_ ) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $scope = _$rootScope_.$new();
    $httpBackend = _$httpBackend_;
    $cacheFactory = _$cacheFactory_;
    $stateParams = {type: 'free', limit: 5, term: '' };
  }));

  beforeEach(function() {
    requestSearchHandler = httpBackendDefinitions();
  });

  afterEach(httpBackendVerifyNoOutstanding);

  it('should ....', function( done ) {
    requestSearchHandler.respond([
      {title: 'um'}
    ]);

    var booksearchResultsCtrl = $controller('BookSearchResultsCtrl', {
        $scope: $scope,
        $stateParams: $stateParams,
        appConfig: {
          book: myMocks.appconfig.book().config,
          message: myMocks.appconfig.message().config
        },
        Criteria: {
          limit: 5,
          term: ''
        }
      }
    );

    $httpBackend.flush();
    //dump($scope);

    waitsForAndThenRun(null, function() {
      /*for (var k in booksearchResultsCtrl.results[0]){
        dump('key=' +k, booksearchResultsCtrl.results[0][k]);

      }*/
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
    $httpBackend.when('GET', '/api/appconfig/book/').respond(200, myMocks.appconfig.book());
    $httpBackend.when('GET', '/api/appconfig/message/').respond(200, myMocks.appconfig.message());

    //this is the definition for the tests
    return $httpBackend.when('GET', /^\/api\/books\/search\/(free|advanced)\/*./);
  }

});
