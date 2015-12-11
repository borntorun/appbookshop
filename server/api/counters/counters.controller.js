'use strict';
var Counters = require('./counters.model.js');

exports.get = function( req, res ) {
  Counters.findByIdAndUpdate(req.params.id || '',   { $inc: { seq: 1 } }, {new: true}, function( err, Counter ) {
    if ( err ) {
      return handleError(res, err);
    }
    if ( !Counter ) {
      return res.send(404);
    }
    return res.status(200).json(Counter);
  });
};

function handleError( res, err ) {
  return res.send(500, err);
}
