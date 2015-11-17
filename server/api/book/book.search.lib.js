/**
 * Created by Joao Carvalho on 09-02-2015.
 */
'use strict'

var search = {};

function sanitizeStringDollar(value) {
  return value.replace(/^\$[\$]*/,'');
}

function sanitizeInputArray(aInput) {
  aInput.forEach(function(element, index, aValues){
    aValues[index] = sanitizeStringDollar(element.trim());
  });
  return aInput;
}

function getRegExpFromString(value) {
  var exp = '\\b' + value.trim().replace(/[\t\n ]+/g, ' ') + '\\b';
  console.log('exp------------------->>>', exp);
  return new RegExp(exp, 'i');
}


search.filter = function (filter){
  var aValues;

  if (filter && filter.trim()!=='-') {
    aValues = sanitizeInputArray(filter.split(','));
    return {$text: {$search: '\'' + aValues.join(' ') + '\''} };
  }
  return {};
};


function setadvFilter(objFilter, key, value) {
  if (value && value.trim()!=='-') {
    objFilter[key] = {'$in': [getRegExpFromString(sanitizeStringDollar(value))]};
  }
}
function setadvFilterNumber(objFilter, key, value) {
  if (value && value!=='-') {
    objFilter[key] = {'$eq': sanitizeStringDollar(value)};
  }
}
search.advfilter = function (filter){
  var objFilter={};
  setadvFilter(objFilter, 'title', filter.title);
  setadvFilter(objFilter, 'authors', filter.authors);
  setadvFilter(objFilter, 'subject', filter.subject);
  setadvFilter(objFilter, 'nameCollection', filter.collection);
  setadvFilter(objFilter, 'categories', filter.categories);
  setadvFilterNumber(objFilter, 'editionNumber', filter.edition);
  return objFilter;
};

module.exports = search;
