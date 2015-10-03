/**
 * Created by Joao Carvalho on 05-02-2015.
 */
'use strict'

var config = require('../environment');

module.exports = function(seedFuncArray) {

  if (config.seedDB) {
    seedFuncArray.forEach(function(item){
      //walk to server - item is the path from there

      require('../../' + item);
    });
  }
};

