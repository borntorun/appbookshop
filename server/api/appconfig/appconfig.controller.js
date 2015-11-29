'use strict';

exports.getall = function( req, res ) {
  var config = require('./appconfig.model');

  var Model = config(req.params.config)

  if(!Model) {
    return handleError(res, new Error());
  }

  var lang = req.params.language || 'pt';

  Model.findOne({language: lang}, function( err, data ) {
    if ( err ) {
      return handleError(res, err);
    }
    return res.status(200).json(data);

  });

};

function handleError( res, err ) {
  return res.send(500, err);
}

