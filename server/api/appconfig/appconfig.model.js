'use strict';



module.exports = function(configtable){
  var config;
  try {
    config = require('./' + configtable + '/' + configtable + '.model');
  }
  catch( e ) {
  }
  return config;
};
