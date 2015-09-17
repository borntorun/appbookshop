/*
'use strict';
var _ = require('lodash');
var Category = require('./category.model');

exports.read = function( req, res ) {
  console.log('no read', req.params);
  Category.find(function( err, Categories ) {
    if ( err ) {
      return handleError(res, err);
    }
    return res.json(200, Categories);
  });
};

exports.search = function( req, res ) {

  console.log('no search', req.params);
  Category.find(require("../search.lib").filter(req.params.filter))
    .limit(req.params.limit || 100)
    .exec(function( err, Categories ) {
      if ( err ) {
        return handleError(res, err);
      }
      return res.json(200, Categories);
    });
};

function handleError( res, err ) {
  return res.send(500, err);
}
*/
