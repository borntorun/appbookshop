'use strict';
var _ = require('lodash');
var BookConfig = require('./bookconfig.model');
// Get config
exports.read = function (req, res) {
  BookConfig.find(function (err, BookConfig) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, BookConfig[0]);
  });
};
function handleError(res, err) {
  return res.send(500, err);
}
