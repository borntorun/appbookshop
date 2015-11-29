'use strict';

describe('Unit: \'booksearch\' Service', function() {
  var booksearch, $httpBackend, $rootScope, $cacheFactory;
  var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];

  beforeEach(module('appBookShop'));
  beforeEach(module('jadetemplates'));

  beforeEach(inject(/*['booksearch', */function( _booksearch_, _$httpBackend_, _$rootScope_, _$cacheFactory_ ) {
    expect(_booksearch_).not.to.equal(null);
    booksearch = _booksearch_;
    $httpBackend = _$httpBackend_;
    $cacheFactory = _$cacheFactory_;
    $rootScope = _$rootScope_;

  }/*]*/));

  describe('.queryFree()', function() {
    var type = 'free';
    var defaultValues = [25, '-'];

    it('> should have search object with default values', function() {
      itTestDefault(type, undefined, defaultValues);
    });
    it('> should have search object with right methods', function() {
      var query = booksearch['query' + _.capitalize(type)].call(null);
      expect(query.execute).to.not.be.undefined;
      expect(query.paginate).to.not.be.undefined;
      expect(query.unpaginate).to.not.be.undefined;
      expect(query.setViewport).to.not.be.undefined;
      expect(query.cancelViewport).to.not.be.undefined;
      expect(query.queryPath).to.not.be.undefined;
      expect(query.modifyParameter).to.not.be.undefined;

    });
    it('> should not allow unknown parameters in criteria/ result search object with default values', function() {
      itTestDefault(type, {foo: 'bar'}, defaultValues);
    });
    it('> should have search object with default limit value passing in a limit not a number', function() {
      itTestDefault(type, {limit: undefined}, defaultValues);
    });
    it('> should have search object with default value passing in an invalid term', function( done ) {
      var method = 'query' + _.capitalize(type);

      Q.allSettled([
        Q.fcall(function() {
          return booksearch[method].call(null, {term: null});
        }),
        Q.fcall(function() {
          return booksearch[method].call(null, {term: undefined});
        }),
        Q.fcall(function() {
          return booksearch[method].call(null, {term: 111});
        }),
        Q.fcall(function() {
          return booksearch[method].call(null, {term: false});
        })
      ])
        .then(function( results ) {
          results.forEach(function( item, index ) {
            dump('Index State: ' + index);
            expect(item.state).to.equal('fulfilled');
            expectation(item.value, '/api/books/search/' + type, defaultValues);
          });
          done();
        })
        .catch(function( error ) {
          done(error);
        });
    });
    it('> should have search object passing in a limit number', function() {
      itTestDefault(type, {limit: 25}, defaultValues);
    });
    it('> should have search object passing in a limit number', function() {
      itTestDefault(type, {limit: 25}, defaultValues);
    });
    it('> should have search object passing in a limit greater then max(50)', function() {
      itTestDefault(type, {limit: 75}, [50, '-']);
    });
    it('> should have search object passing in correct parameters', function() {
      itTestDefault(type, {limit: 15, term: 'teste'}, [15, 'teste']);
    });
    it('> should return correct query string', function() {
      var query = itTestDefault(type, {limit: 15, term: 'teste'}, [15, 'teste']);
      expect(query.queryPath).to.equal('/api/books/search/free/15/teste');
    });
    it('> should return correct criteria object', function() {
      var query = itTestDefault(type, {limit: 15, term: 'teste'}, [15, 'teste']);
      expect(query.criteria).to.eql({limit: 15, term: 'teste'});
    });
  });

  describe('.queryAdvanced()', function() {
    var type = 'advanced';
    var defaultValues = [25, '-', '-', '-', '-', '-', '-'];

    it('> should not allow unknown parameters in criteria/ result search object with default values', function() {
      itTestDefault(type, {foo: 'bar'}, defaultValues);
    });
    it('> should have search object with default values', function() {
      itTestDefault(type, undefined, defaultValues);
    });
    it('> should have search object with default limit value passing in a limit not a number', function() {
      itTestDefault(type, {limit: undefined}, defaultValues);
    });
    it('> should have search object passing in a limit number', function() {
      itTestDefault(type, {limit: 25}, [25, '-', '-', '-', '-', '-', '-']);
    });
    it('> should have search object passing in a limit greater then max(50)', function() {
      itTestDefault(type, {limit: 75}, [50, '-', '-', '-', '-', '-', '-']);
    });
    it('> should set correct edition passing in valid true value ', function( done ) {
      var method = 'query' + _.capitalize(type);
      Q.allSettled([
        Q.fcall(function() {
          return booksearch[method].call(null, {edition: '1'});
        }),
        Q.fcall(function() {
          return booksearch[method].call(null, {edition: 1});
        }),
        Q.fcall(function() {
          return booksearch[method].call(null, {edition: true});
        })
      ])
        .then(function( results ) {
          results.forEach(function( item, index ) {
            dump('Index State: ' + index);
            expect(item.state).to.equal('fulfilled');
            expectation(item.value, '/api/books/search/' + type, [25, '-', '-', '-', '-', '-', '1']);
          });
          done();
        })
        .catch(function( error ) {
          dump(error);
          done(error);
        });

    });
    it('> should set correct edition passing in valid false value ', function( done ) {
      var method = 'query' + _.capitalize(type);
      Q.allSettled([
        Q.fcall(function() {
          return booksearch[method].call(null, {edition: '0'});
        }),
        Q.fcall(function() {
          return booksearch[method].call(null, {edition: 0});
        }),
        Q.fcall(function() {
          return booksearch[method].call(null, {edition: false});
        })
      ])
        .then(function( results ) {
          results.forEach(function( item, index ) {
            dump('Index State: ' + index);
            expect(item.state).to.equal('fulfilled');
            expectation(item.value, '/api/books/search/' + type, [25, '-', '-', '-', '-', '-', '0']);
          });
          done();
        })
        .catch(function( error ) {
          dump(error);
          done(error);
        });

    });
    it('> should set edition=\'-\' passing in invalid value', function( done ) {
      var method = 'query' + _.capitalize(type);
      Q.allSettled([
        Q.fcall(function() {
          return booksearch[method].call(null, {edition: 'x'});
        }),
        Q.fcall(function() {
          var x = {edition: '11'};
          return booksearch[method].call(null, x);
        }), ,
        Q.fcall(function() {
          return booksearch[method].call(null, {edition: {}});
        }),
        Q.fcall(function() {
          return booksearch[method].call(null, {edition: 11});
        })
      ])
        .then(function( results ) {
          results.forEach(function( item, index ) {
            dump('Index State: ' + index);
            expect(item.state).to.equal('fulfilled');
            expectation(item.value, '/api/books/search/' + type, defaultValues);
          });
          done();
        })
        .catch(function( error ) {
          dump(error);
          done(error);
        });

    });
    it('> should have search object passing in correct parameters', function() {
      itTestDefault(type,
        {limit: 15,
          edition: '1',
          categories: 'y',
          collection: 'n',
          subject: 'h',
          authors: 'o',
          title: 'j'}, [15, 'j', 'o', 'h', 'n', 'y', '1']);

    });
    it('> should return correct query string', function() {
      var query = itTestDefault(type, {limit: 15,
        edition: '1',
        categories: 'y',
        collection: 'n',
        subject: 'h',
        authors: 'o',
        title: 'j'}, [15, 'j', 'o', 'h', 'n', 'y', '1']);
      expect(query.queryPath).to.equal('/api/books/search/advanced/15/j/o/h/n/y/1');
    });
    it('> should return correct criteria object', function() {
      var query = itTestDefault(type, {limit: 15,
        edition: '1',
        categories: 'y',
        collection: 'n',
        subject: 'h',
        authors: 'o',
        title: '-'}, [15, '-', 'o', 'h', 'n', 'y', '1']);
      //dump(query.criteria);
      expect(query.criteria).to.eql({
        limit: 15,
        edition: '1',
        categories: 'y',
        collection: 'n',
        subject: 'h',
        authors: 'o',
        title: ''});
    });
  });

  describe('<query>.modifyParameter()', function() {
    it('> should modify parameter in free search object', function() {
      var type = 'free';
      var query = itTestDefault(type, undefined, [25, '-']);
      query.modifyParameter({'term': 'new value'});
      expect(query.parameters).to.eql([25, 'new value']);
      query.modifyParameter({'term': 'another new value', 'limit': 20});
      expect(query.parameters).to.eql([20, 'another new value']);
    });
    it('> should modify parameter value in advanced search object', function() {
      var type = 'advanced';
      var query = itTestDefault(type, {title: 'the title'}, [25, 'the title', '-', '-', '-', '-', '-']);
      query.modifyParameter({'title': 'new value'});
      expect(query.parameters).to.eql([25, 'new value', '-', '-', '-', '-', '-']);
      query.modifyParameter({'edition': '0', 'authors': 'john' });
      expect(query.parameters).to.eql([25, 'new value', 'john', '-', '-', '-', '0']);
    });
  });

  describe('<query>.(un)paginate()', function() {
    it('> should return query after invoking \'paginate\'', function() {
      var type = 'free';
      var query = itTestDefault(type, undefined, [25, '-']);
      var newquery = query.paginate();
      expect(query).to.equal(newquery);
    });
    it('> should have a new last parameter after invoking \'paginate\'', function() {
      var type = 'free';
      var query = itTestDefault(type, undefined, [25, '-']);
      query.paginate();
      expect(query.parameters).to.eql([25, '-', '-']);
    });
    it('> should do nothing calling \'paginate\' more the one time', function() {
      var type = 'free';
      var query = itTestDefault(type, undefined, [25, '-']);
      query.paginate();
      expect(query.parameters).to.eql([25, '-', '-']);
      query.paginate();
      expect(query.parameters).to.eql([25, '-', '-']);
    });
    it('> should allow modify paginate parameter value', function() {
      var type = 'free';
      var query = itTestDefault(type, undefined, [25, '-']);
      query.paginate();
      expect(query.parameters).to.eql([25, '-', '-']);
      query.modifyParameter({'from': 'xpto'});
      expect(query.parameters).to.eql([25, '-', 'xpto']);
    });
    it('> should return query with initial parameters after invoking \'unpaginate\'', function() {
      var type = 'free';
      var query = itTestDefault(type, undefined, [25, '-']);
      var newquery = query.paginate();
      expect(query).to.equal(newquery);

      expect(query.parameters).to.eql([25, '-', '-']);
      query.modifyParameter({'from': 'xpto'});
      expect(query.parameters).to.eql([25, '-', 'xpto']);

      newquery = query.unpaginate();
      expect(query).to.equal(newquery);
      expect(query.parameters).to.eql([25, '-']);
    });
  });

  describe('<query>.execute() paginate search', function() {
    var requestSearchHandler;

    beforeEach(function() {
      requestSearchHandler = httpBackendDefinitions();
    });

    afterEach(httpBackendVerifyNoOutstanding);

    it('> should execute search with default values', function( done ) {

      //set the response
      //true: a paginated query
      //false: not a paginated query
      requestSearchHandler.respond(fakeResponse(false));

      //establish a query
      var query = booksearch.queryFree.call(null, {limit: 5});

      //set the expectated request
      $httpBackend.expectGET(query.queryPath/*'/api/books/search/free/5/-'*/);

      //execute the query and get a promise for the results
      var result = query.execute();

      //eval the results (will run after flush)
      result
        .then(function( data ) {
          expect(data).to.eql([1, 2, 3, 4, 5]);
          done();
        })
        .catch(function( error ) {
          done(error);
        });

      //flush the requests
      $httpBackend.flush();
    });

    it('> should execute paginate search', function( done ) {

      requestSearchHandler.respond(fakeResponse(true));

      //establish a query
      var query = booksearch.queryFree.call(null, {limit: 5});

      query.paginate();

      //set the expectated request
      $httpBackend.expectGET(query.queryPath);

      //execute the query and get a promise for the results
      runQuery(query, 'execute')
        //eval the results (will run after flush)
        .then(function( data ) {
          expect(data).to.eql([1, 2, 3, 4, 5]);
          done();
        })
        .catch(function( error ) {
          done(error);
        });

    });

    it('> should execute paginate search with objects', function( done ) {

      requestSearchHandler.respond(fakeResponse(true, {}));

      //establish a query
      var query = booksearch.queryFree.call(null, {limit: 2});

      query.paginate();

      //set the expectated request
      $httpBackend.expectGET(query.queryPath);

      //execute the query and get a promise for the results
      runQuery(query, 'execute')
        //eval the results (will run after flush)
        .then(function( data ) {
          expect(data).to.eql([
            {title: 1},
            {title: 2}
          ]);
          done();
        })
        .catch(function( error ) {
          done(error);
        });

    });

    it('> should execute paginate search from:20', function( done ) {

      requestSearchHandler.respond(fakeResponse(true));

      //establish a query
      var query = booksearch.queryFree.call(null, {limit: 5});

      query.paginate();
      query.modifyParameter({'from': 20});

      //set the expectated request
      $httpBackend.expectGET(query.queryPath);

      //execute the query and get a promise for the results
      runQuery(query, 'execute')
        //eval the results (will run after flush)
        .then(function( data ) {
          expect(data).to.eql([21, 22, 23, 24, 25]);
          expect(query.next).to.not.be.undefined;
          expect(query.previous).to.be.undefined;
          return runQuery(query, 'next');
        })
        .then(function( data ) {
          expect(data).to.eql([26]);
          expect(query.next).to.be.undefined;
          expect(query.previous).to.not.be.undefined;
          return runQuery(query, 'previous');
        })
        .then(function( data ) {
          expect(data).to.eql([21, 22, 23, 24, 25]);
          expect(query.next).to.not.be.undefined;
          expect(query.previous).to.be.undefined;
          done();
        })
        .catch(function( error ) {
          done(error);
        });

    });

    it('> should not have page methods after unpaginate', function( done ) {

      requestSearchHandler.respond(fakeResponse(true));

      //establish a query
      var query = booksearch.queryFree.call(null, {limit: 5});

      query.paginate();
      query.modifyParameter({'from': 5});

      //set the expectated request
      $httpBackend.expectGET(query.queryPath);

      //execute the query and get a promise for the results
      runQuery(query, 'execute')
        //eval the results (will run after flush)
        .then(function( data ) {
          expect(data).to.eql([6, 7, 8, 9, 10]);
          expect(query.next).to.not.be.undefined;
          expect(query.previous).to.be.undefined;

          return runQuery(query, 'next');
        })
        .then(function( data ) {
          expect(data).to.eql([11, 12, 13, 14, 15]);
          expect(query.next).to.not.be.undefined;
          expect(query.previous).to.not.be.undefined;

          query.unpaginate();

          expect(query.next).to.be.undefined;
          expect(query.previous).to.be.undefined;
          done();
        })
        .catch(function( error ) {

          done(error);
        });

    });

    it('> should retrieve first results after unpaginate', function( done ) {

      requestSearchHandler.respond(fakeResponse(true));

      //establish a query
      var query = booksearch.queryFree.call(null, {limit: 5});

      query.paginate();
      query.modifyParameter({'from': 5});

      //set the expectated request
      $httpBackend.expectGET(query.queryPath);

      //execute the query and get a promise for the results
      runQuery(query, 'execute')
        //eval the results (will run after flush)
        .then(function( data ) {
          expect(data).to.eql([6, 7, 8, 9, 10]);

          query.unpaginate();

          return runQuery(query, 'execute');
        })
        .then(function( data ) {
          expect(data).to.eql([1, 2, 3, 4, 5]);

          done();
        })
        .catch(function( error ) {
          done(error);
        });

    });

    it('> should execute paginate search and do not have next()/previous() method when just one page', function( done ) {

      requestSearchHandler.respond(fakeResponse(true));

      //establish a query
      var query = booksearch.queryFree.call(null, {limit: 30});

      query.paginate();

      //set the expectated request
      $httpBackend.expectGET(query.queryPath);

      //execute the query and get a promise for the results
      runQuery(query, 'execute')
        //eval the results (will run after flush)
        .then(function( data ) {
          expect(data).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]);
          expect(query.next).to.be.undefined;
          expect(query.previous).to.be.undefined;

          done();
        })
        .catch(function( error ) {
          dump(error);
          done(error);
        });

      //flush the requests

    });

    it('> should execute paginate search and move next/previous pages', function( done ) {

      requestSearchHandler.respond(fakeResponse(true));

      //establish a query
      var query = booksearch.queryFree.call(null, {limit: 5});

      query.paginate();

      //set the expectated request
      $httpBackend.expectGET(query.queryPath);

      //execute the query and get a promise for the results
      runQuery(query, 'execute')
        .then(function( data ) {
          //eval the results (will run after flush)
          expect(data).to.eql([1, 2, 3, 4, 5]);
          expect(query.next).to.not.be.undefined;
          expect(query.previous).to.be.undefined;

          return runQuery(query, 'next');
        })

        .then(function( data ) {
          expect(data).to.eql([6, 7, 8, 9, 10]);
          expect(query.next).to.not.be.undefined;
          expect(query.previous).to.not.be.undefined;

          return runQuery(query, 'next');
        })
        .then(function( data ) {
          expect(data).to.eql([11, 12, 13, 14, 15]);
          expect(query.next).to.not.be.undefined;
          expect(query.previous).to.not.be.undefined;

          return runQuery(query, 'previous');
        })
        .then(function( data ) {
          expect(data).to.eql([6, 7, 8, 9, 10]);
          expect(query.next).to.not.be.undefined;
          expect(query.previous).to.not.be.undefined;

          return runQuery(query, 'previous');
        })
        .then(function( data ) {
          expect(data).to.eql([1, 2, 3, 4, 5]);
          expect(query.next).to.not.be.undefined;
          expect(query.previous).to.be.undefined;

          return runQuery(query, 'next');
        })
        .then(function( data ) {
          return runQuery(query, 'next');
        })
        .then(function( data ) {
          return runQuery(query, 'next');
        })
        .then(function( data ) {
          return runQuery(query, 'next');
        })
        .then(function( data ) {
          return runQuery(query, 'next');
        })
        .then(function( data ) {
          expect(data).to.eql([26]);
          expect(query.next).to.be.undefined;
          expect(query.previous).to.not.be.undefined;
          return runQuery(query, 'previous');
        })
        .then(function( data ) {
          return runQuery(query, 'previous');
        })
        .then(function( data ) {
          return runQuery(query, 'previous');
        })
        .then(function( data ) {
          return runQuery(query, 'previous');
        })
        .then(function( data ) {
          return runQuery(query, 'previous');
        })
        .then(function( data ) {
          expect(data).to.eql([1, 2, 3, 4, 5]);
          expect(query.next).to.not.be.undefined;
          expect(query.previous).to.be.undefined;
          done();
        })

        .catch(function( error ) {
          //dump(error);
          done(error);
        });

    });

    xit('> should execute paginate search and override next value', function( done ) {

      requestSearchHandler.respond(fakeResponse(true));

      //establish a query
      var query = booksearch.queryFree.call(null, {limit: 5});

      query.paginate();
      query.modifyParameter({'from': 5});

      //set the expectated request
      $httpBackend.expectGET(query.queryPath);

      //execute the query and get a promise for the results
      runQuery(query, 'execute')
        //eval the results (will run after flush)
        .then(function( data ) {
          expect(data).to.eql([6, 7, 8, 9, 10]);

          return runQuery(query, 'next', 15);
        })
        .then(function( data ) {
          expect(data).to.eql([16, 17, 18, 19, 20]);

          return runQuery(query, 'previous', 10);
        })
        .then(function( data ) {
          expect(data).to.eql([11, 12, 13, 14, 15]);

          //return runQuery(query, 'previous');

          done();
        })
        .catch(function( error ) {
          done(error);
        });

    });

  });

  describe('<query>.viewport()', function() {
    var type = 'free';

    it('> should allow set viewport with correct value (multiple of limit)', function( done ) {
      var query = booksearch['query' + _.capitalize(type)].call(null);

      Q.fcall(function() {
        return query.setViewport(75);
      })
        .then(function() {
          done();
        })
        .catch(function( error ) {
          done(error);
        });
    });
    it('> should allow set viewport and return query', function( done ) {
      var query = booksearch['query' + _.capitalize(type)].call(null);

      Q.fcall(function() {
        return query.setViewport(75);
      })
        .then(function( result ) {
          expect(result).to.be.equal(query);
          done();
        })
        .catch(function( error ) {
          done(error);
        });
    });
    it('> should not allow set viewport with incorrect value (not a number)', function( done ) {
      var query = booksearch['query' + _.capitalize(type)].call(null);

      Q.fcall(function() {
        return query.setViewport('75');
      })
        .then(function() {
          done(new Error('This message shoul not be reached. An error should had occur.'));
        })
        .catch(function( error ) {
          expect(error.message).to.be.equal('Invalid type for viewport value. Type should be a \'Number\'.');
          done();
        });

    });
    it('> should not allow set viewport with incorrect value (not multiple of limit)', function( done ) {
      var query = booksearch['query' + _.capitalize(type)].call(null);

      Q.fcall(function() {
        return query.setViewport(69);
      })
        .then(function() {
          done(new Error('An invalid value was set. Must be multiple of limit.'));
        })
        .catch(function( /*error*/ ) {
          done();
        });

    });
    it('> should not allow set viewport with incorrect value (less than limit)', function( done ) {
      var query = booksearch['query' + _.capitalize(type)].call(null);

      Q.fcall(function() {
        return query.setViewport(11);
      })
        .then(function() {
          done(new Error('An invalid value was set for viewport. Must be greater than limit.'));
        })
        .catch(function( /*error*/ ) {
          done();
        });

    });
    it('> should not allow set viewport with incorrect value (equal to limit)', function( done ) {
      var query = booksearch['query' + _.capitalize(type)].call(null);

      Q.fcall(function() {
        return query.setViewport(25);
      })
        .then(function() {
          done(new Error('An invalid value was set for viewport. Must be greater than limit.'));
        })
        .catch(function( /*error*/ ) {
          done();
        });

    });
  });

  describe('<query>.execute() paginate search with viewport', function() {
    var requestSearchHandler;

    beforeEach(function() {
      requestSearchHandler = httpBackendDefinitions();
    });

    afterEach(httpBackendVerifyNoOutstanding);

    it('> should execute paginate search and move next/previous pages with viewport 10 and limit 5', function( done ) {

      requestSearchHandler.respond(fakeResponse(true));

      //establish a query
      var query = booksearch.queryFree.call(null, {limit: 5});

      query.paginate().setViewport(10);

      //set the expectated request
      $httpBackend.expectGET(query.queryPath);

      //execute the query and get a promise for the results
      runQuery(query, 'execute')
        .then(function( data ) {
          expect(data).to.eql([1, 2, 3, 4, 5]);
          expect(query.next).to.not.be.undefined;
          expect(query.previous).to.be.undefined;

          return runQuery(query, 'next');

        })
        .then(function( data ) {
          expect(data).to.eql([6, 7, 8, 9, 10]);
          expect(query.next).to.not.be.undefined;
          expect(query.previous).to.be.undefined;

          return runQuery(query, 'next');

        })
        .then(function( data ) {
          expect(data).to.eql([11, 12, 13, 14, 15]);
          expect(query.next).to.not.be.undefined;
          expect(query.previous).to.not.be.undefined;
          return runQuery(query, 'previous');

        })
        .then(function( data ) {
          expect(data).to.eql([1, 2, 3, 4, 5]);
          expect(query.next).to.not.be.undefined;
          expect(query.previous).to.be.undefined;
          return runQuery(query, 'next');
        })
        .then(function( data ) {
          expect(data).to.eql([11, 12, 13, 14, 15]);
          expect(query.next).to.not.be.undefined;
          expect(query.previous).to.not.be.undefined;
          return runQuery(query, 'next');
        })
        .then(function( data ) {
          expect(data).to.eql([16, 17, 18, 19, 20]);
          return runQuery(query, 'next');
        })
        .then(function( data ) {
          expect(data).to.eql([21, 22, 23, 24, 25]);
          return runQuery(query, 'next');
        })
        .then(function( data ) {
          expect(data).to.eql([26]);
          expect(query.next).to.be.undefined;
          expect(query.previous).to.not.be.undefined;
          return runQuery(query, 'previous');
        })
        .then(function( data ) {
          expect(data).to.eql([16, 17, 18, 19, 20]);
          expect(query.next).to.not.be.undefined;
          expect(query.previous).to.not.be.undefined;
          return runQuery(query, 'previous');
        })
        .then(function() {
          return runQuery(query, 'previous');
        })
        .then(function() {
          return runQuery(query, 'previous');
        })
        .then(function( data ) {
          expect(data).to.eql([1, 2, 3, 4, 5]);
          expect(query.next).to.not.be.undefined;
          expect(query.previous).to.be.undefined;
          done();
        })
        .catch(function( error ) {
          //dump(error);
          done(error);
        });
    });

    it('> should execute paginate search and move next/previous pages with viewport 6 and limit 3', function( done ) {

      requestSearchHandler.respond(fakeResponse(true, null, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]));

      //establish a query
      var query = booksearch.queryFree.call(null, {limit: 3});

      query.paginate().setViewport(6);

      //set the expectated request
      $httpBackend.expectGET(query.queryPath);

      //execute the query and get a promise for the results
      runQuery(query, 'execute')
        .then(function( data ) {
          expect(data).to.eql([1, 2, 3]);
          expect(query.next).to.not.be.undefined;
          expect(query.previous).to.be.undefined;
          return runQuery(query, 'next');
        })
        .then(function( data ) {
          expect(data).to.eql([4, 5, 6]);
          expect(query.next).to.not.be.undefined;
          expect(query.previous).to.be.undefined;
          return runQuery(query, 'next');
        })
        .then(function( data ) {
          expect(data).to.eql([7, 8, 9]);
          expect(query.next).to.not.be.undefined;
          expect(query.previous).to.not.be.undefined;
          return runQuery(query, 'next');
        })
        .then(function( data ) {
          expect(data).to.eql([10, 11, 12]);
          expect(query.next).to.not.be.undefined;
          expect(query.previous).to.not.be.undefined;

          return runQuery(query, 'next');
        })
        .then(function( data ) {
          expect(data).to.eql([]);
          expect(query.next).to.be.undefined;
          expect(query.previous).to.not.be.undefined;
          return runQuery(query, 'previous');
        })
        .then(function( data ) {
          expect(data).to.eql([4, 5, 6]);
          expect(query.next).to.not.be.undefined;
          expect(query.previous).to.not.be.undefined;

          return runQuery(query, 'previous');
        })
        .then(function( data ) {
          expect(data).to.eql([1, 2, 3]);
          expect(query.next).to.not.be.undefined;
          expect(query.previous).to.be.undefined;

          done();
        })
        .catch(function( error ) {
          //dump(error);
          done(error);
        });
    });
  });
  //return runQuery(query, 'execute');
  //return runQuery(query, 'next');
  //return runQuery(query, 'previous');

  function runQuery( query, method, value ) {
    //clear cache for previous responses
    //if not the request is not called
    //and a "No pending request to flush !" error happens on $httpBackend.flush()
    $cacheFactory.get('$http').removeAll();

    var q = query[method].call(null, value);

    $httpBackend.flush();
    return q;
  }

  function itTestDefault( type, criteria, results ) {
    var query = booksearch['query' + _.capitalize(type)].call(null, criteria);
    expectation(query, '/api/books/search/' + type, results);
    return query;
  }

  function expectation( search, urlEndPoint, parameters ) {

    expect(search.urlEndPoint).to.equal(urlEndPoint);
    expect(search.parameters).to.be.instanceof(Array);
    expect(search.parameters.length).to.equal(parameters.length);
    expect(search.parameters).to.eql(parameters);
    /*search.parameters.forEach(function(item, index){
      expect(item).to.equal(parameters[index]);
    });*/
  }

  function fakeResponse( paginated, o, values ) {
    var f = o == null ? fakeResponseNumbers : fakeResponseObjects;
    return f.call(null, paginated, values);
  }

  function fakeResponseNumbers( paginated, values ) {
    return fakeResponseBase(paginated, values || numbers);
  }

  function fakeResponseObjects( paginated, values ) {
    var obj = [];
    (values || numbers).forEach(function( item ) {
      obj.push({title: item});
    });
    return fakeResponseBase(paginated, obj);
  }

  function fakeResponseBase( paginated, pValues ) {

    return function internalfakeResponse( method, url, data, headers, params ) {
      //dump(url);
      function biggerEqual( from ) {
        return function( value ) {
          var v = typeof value === 'number' ? value : value.title;
          return v > from;
        };
      }

      var values = pValues;//[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
      var parameters = url.split('/').splice(5);//parameters start at index=5
      var from = paginated ? parseInt(parameters.slice(-1)) : 0;
      from = isNaN(from) ? 0 : from;
      var result = values.filter(biggerEqual(from));
      result = result.slice(0, parameters[0]);//index=0 is parameter 'limit'
      return [200, result];
    };
  }

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
    return $httpBackend.when('GET', /^\/api\/books\/search\/(free|advanced)\/*./);
  }

});
