'use strict';

//function getModel (table) {
//  return require('../' + table + '/' + table + '.model');
//}

module.exports = function(table) {
  var model;
  try {
    model = require('../' + table + '/' + table + '.model');
  }
  catch( e ) {
  }
  return model;//getModel(table);
}
