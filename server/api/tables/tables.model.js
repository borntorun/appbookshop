'use strict';

function getModel (table) {
  return require('../' + table + '/' + table + '.model');
}


module.exports = function(table) {
  return getModel(table);
}
