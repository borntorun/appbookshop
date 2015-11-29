'use strict';

exports.isArray = function( obj ) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

exports.capitalizeFirst = function ( value ) {
  if (typeof value !== 'string') {
    return value;
  }
  value = value.trimLeft().toLowerCase();
  return value.charAt(0).toUpperCase() + value.slice(1);
}
