'use strict';
var should = require('should');
var app = require('../../app');
var request = require('supertest');


describe('GET /api/books', function () {
  it('should respond with JSON array', function (done) {
    request(app).get('/api/books').expect(200).expect('Content-Type', /json/).end(function (err, res) {
      if (err) {
        return done(err);
      }
      res.body.should.be.instanceof(Array);
      done();
    });
  });
});

describe('Seed appBookShop.books', function () {
  it('count should be 100', function (done) {
    require('./seed');
    //because of the async process of the seed need to timeout the test
    setTimeout(function() {
      var Book = require('./book.model');
      Book.count({}, function(err, count){
        count.should.be.equal(100);
        done();
      });
    }, 1000);

  });
});

describe('GET /api/books/search', function () {
  it('should respond with JSON array and 100 books', function (done) {

    request(app).get('/api/books/search').expect(200).expect('Content-Type', /json/).end(function (err, res) {
      if (err) {
        return done(err);
      }
      res.body.should.be.instanceof(Array).and.length(100);
      done();
    });
  });
});
describe('GET /api/books/search/1', function () {
  it('should respond with JSON array and length 1', function (done) {

    request(app).get('/api/books/search/1').expect(200).expect('Content-Type', /json/).end(function (err, res) {
      if (err) {
        return done(err);
      }
      res.body.should.be.instanceof(Array).and.length(1);
      done();
    });
  });
});
describe('GET /api/books/search/1', function () {
  it('should respond with JSON array and length 1 and contains an object', function (done) {

    request(app).get('/api/books/search/1').expect(200).expect('Content-Type', /json/).end(function (err, res) {
      if (err) {
        return done(err);
      }
      res.body[0].should.be.instanceof(Object)
      done();
    });
  });
});

describe('GET /api/books/search/german', function () {
  it('should respond with JSON array and 9 books all with german language', function (done) {
    require('./seed');
    request(app).get('/api/books/search/german').expect(200).expect('Content-Type', /json/).end(function (err, res) {
      if (err) {
        return done(err);
      }
      res.body.should.be.instanceof(Array).and.length(9);
      res.body.forEach(function (element) {
        element.editionLanguage.toLowerCase().should.be.equal("german");
      });
      done();
    });
  });
});
describe('GET /api/books/search/german/1', function () {
  it('should respond with JSON array and 1 books with german language', function (done) {
    require('./seed');
    request(app).get('/api/books/search/german/1').expect(200).expect('Content-Type', /json/).end(function (err, res) {
      if (err) {
        return done(err);
      }
      res.body.should.be.instanceof(Array).and.length(1);
      res.body[0].editionLanguage.toLowerCase().should.be.equal("german");
      done();

    });
  });
});
/*
describe('GET /api/books/search/The Man Without Qualities', function () {
  it('should respond with JSON array and 1 book equal to The Man Without Qualities ', function (done) {
    require('./seed');
    request(app).get('/api/books/search/The Man Without Qualities').expect(200).expect('Content-Type', /json/).end(function (err, res) {
      if (err) {
        return done(err);
      }
      res.body.should.be.instanceof(Array).and.length(1);
      //var book = JSON.parse('{"_id":"0","title":"The Man Without Qualities","yearEdition":1930,"language":"German","__v":0,"categories":[],"corrector":[],"obs":[],"keywords":[],"images":[],"postfaceBy":[],"prefaceBy":[],"translators":[],"authors":["Robert Musil"]}');
      var book = JSON.parse('{"_id":"0","title":"The Man Without Qualities","language":"German","images":[],"authors":["Robert Musil"]}');
      res.body[0]._id = "0";
      res.body[0].should.be.eql(book);
      done();

    });
  });
});
describe('GET /api/books/search/steinbeck,musil', function () {
  it('should respond with JSON array and 2 book "The Man Without Qualities" and "The Grapes of Wrath"', function (done) {
    require('./seed');
    request(app).get('/api/books/search/steinbeck,musil').expect(200).expect('Content-Type', /json/).end(function (err, res) {
      if (err) {
        return done(err);
      }
      res.body.should.be.instanceof(Array).and.length(2);
      //var books = JSON.parse('[{"_id":"0","title":"The Man Without Qualities","yearEdition":1930,"language":"German","__v":0,"categories":[],"corrector":[],"obs":[],"keywords":[],"images":[],"postfaceBy":[],"prefaceBy":[],"translators":[],"authors":["Robert Musil"]},{"_id":"0","title":"The Grapes of Wrath","yearEdition":1939,"language":"English","__v":0,"categories":[],"corrector":[],"obs":[],"keywords":[],"images":[],"postfaceBy":[],"prefaceBy":[],"translators":[],"authors":["John Steinbeck"]}]');
      var books = JSON.parse('[{"_id":"0","title":"The Man Without Qualities","language":"German","images":[],"authors":["Robert Musil"]},{"_id":"0","title":"The Grapes of Wrath","language":"English","images":[],"authors":["John Steinbeck"]}]');

      res.body.forEach(function (element) {
        element._id = "0";
      });
      res.body.should.be.eql(books);
      done();

    });
  });
});
*/

