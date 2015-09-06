'use strict';
var _ = require('lodash');
//var Category = require('./category.model');

function Model (table) {
  return require('../' + table + '/' + table + '.model');
}

exports.getall = function( req, res ) {
  console.log('no read', req.params);

  Model(req.params.table).find(function( err, data ) {
    if ( err ) {
      return handleError(res, err);
    }
    return res.json(200, data);
  });

};

exports.search = function( req, res ) {

  console.log('no search', req.params);

  Model(req.params.table).find(require("../search.lib").filter(req.params.filter))
    .limit(req.params.limit || 100)
    .exec(function( err, data ) {
      if ( err ) {
        return handleError(res, err);
      }
      return res.json(200, data);
    });

};

function handleError( res, err ) {
  return res.send(500, err);
}
