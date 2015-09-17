/*
'use strict';
var _ = require('lodash');
var Publisher = require('./publisher.model.js');

exports.read = function( req, res ) {
  Publisher.find(function( err, Publishers ) {
    if ( err ) {
      return handleError(res, err);
    }
    return res.json(200, Publishers);
  });
};

exports.search = function( req, res ) {
  Publisher.find(require("../search.lib").filter(req.params.filter))
    .limit(req.params.limit || 100)
    .exec(function( err, Publishers ) {
      if ( err ) {
        return handleError(res, err);
      }
      return res.json(200, Publishers);
    });
};

function handleError( res, err ) {
  return res.send(500, err);
}
*/
