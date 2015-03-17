/**
 * Created by Joao Carvalho on 09-02-2015.
 */
'use strict'

var search = {};

function sanitizeInput(input) {
  if (input instanceof Object) {
    var testDollar = /^\$/;
    for (k in input) {
      if (testDollar.test(k)) {
        delete input[k];
      }
    }
  }
  return input;
}
function sanitizeInputArray(aInput) {
  aInput.forEach(function(element, index, aValues){
    aValues[index] = sanitizeInput(element);
  });
  return aInput;
}
function transformRegExpInputArray(aInput) {
  aInput.forEach(function(element, index, aValues){
    aValues[index] = new RegExp(element.trim().replace(/ +/g, ' '), 'i');
  });
  return aInput;
}

search.filter = function (filter){
  var aValues;

  if (filter) {
    aValues = transformRegExpInputArray(sanitizeInputArray(filter.split(",")));
    console.log(aValues);
    return {"$or": [
      {"name": {"$in" : aValues}}
    ]};
  }
  return {};
};
module.exports = search;
