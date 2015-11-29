'use strict';

var table = require('./tables.model');

exports.getall = function( req, res ) {
  var Model = table(req.params.table)

  if (!Model) {
    return handleError(res, new Error());
  }

  Model.find(function( err, data ) {
    if ( err ) {
      return handleError(res, err);
    }
    return res.status(200).json(data);

  });
};

exports.search = function( req, res ) {
  var Model = table(req.params.table)

  if (!Model) {
    return handleError(res, new Error());
  }

  /*getModel(req.params.table)*/
  Model.find(require('../search.lib').filter(req.params.filter))
    .limit(req.params.limit || 100)
    .exec(function( err, data ) {
      if ( err ) {
        return handleError(res, err);
      }

      return res.status(200).json(data);
    });
};

function handleError( res, err ) {
  return res.send(500, err);
}
