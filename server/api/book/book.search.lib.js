/**
 * Created by Joao Carvalho on 09-02-2015.
 */
'use strict'

var search = {};

function sanitizeStringDollar(value) {
  return value.replace(/^\$[\$]*/,"");
}

function sanitizeInputArray(aInput) {
  aInput.forEach(function(element, index, aValues){
    aValues[index] = sanitizeStringDollar(element);//element.replace(/^\$[\$]*/,"");
  });
  return aInput;
}

function getRegExpFromString(value) {
  return new RegExp(value.trim().replace(/ +/g, ' '), 'i');
}

function transformRegExpInputArray(aInput) {
  aInput.forEach(function(element, index, aValues){
    aValues[index] = getRegExpFromString(element)//new RegExp(element.trim().replace(/ +/g, ' '), 'i');
  });
  return aInput;
}

search.filter = function (filter){
  var aValues;

  if (filter) {
    aValues = transformRegExpInputArray(sanitizeInputArray(filter.split(",")));
    console.log(aValues);
    return {"$or": [
      {"title": {"$in" : aValues}},
      {"originalTitle": {"$in" : aValues}},
      {"authors": {"$in" : aValues}},
      {"keywords": {"$in" : aValues}},
      {"subject": {"$in" : aValues}},
      {"editionLanguage": {"$in" : aValues}}
    ]};
  }
  return {};
};


function setadvFilter(objFilter, key, value) {
  if (value && value!=="-") {
    objFilter[key] = {"$in": [getRegExpFromString(sanitizeStringDollar(value))]};
  }
}

search.advfilter = function (filter){
  var objFilter={};

  setadvFilter(objFilter, "title", filter.title);
  setadvFilter(objFilter, "authors", filter.authors);
  setadvFilter(objFilter, "subject", filter.subject);
  setadvFilter(objFilter, "nameCollection", filter.collection);
  setadvFilter(objFilter, "categories", filter.categories);
  setadvFilter(objFilter, "editionNumber", filter.edition);



  return objFilter;
};

module.exports = search;
