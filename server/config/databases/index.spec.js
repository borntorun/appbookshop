///**
// * Created by Joao Carvalho on 04-02-2015.
// */
//'use strict'
//var should = require('should');
//var config = require('../environment');
//var path = require('path');
//var _ = require('lodash');
//
//describe('Connect to Database (server/config/database)', function () {
//  it('should respond with correct database name', function (done) {
//    var connection = require('./index')(config.mongo.library);
//    connection.on('connected', function() {
//      (this.name).should.be.equal(path.basename(config.mongo.library.uri));
//      done();
//    });
//    connection.on('error', function (err) {
//      console.log('Mongoose Not connected to');
//      console.log(err);
//      true.should.be.false;
//      done();
//    });
//  });
//  it('should respond with error', function (done) {
//    config.mongo.library.options = _.merge(config.mongo.library.options, {'user': 'userxpto', 'pass': 'passxpto'});
//    var connection = require('./index')(config.mongo.library);
//    connection.on('connected', function() {
//      true.should.be.false;
//      done();
//    });
//    connection.on('error', function (err) {
//      console.log('Mongoose Not connected to');
//      console.log(err);
//      false.should.be.false;
//      done();
//    });
//  });
//});
