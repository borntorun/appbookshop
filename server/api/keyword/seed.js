/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
var Keyword = require('./keyword.model.js');

count( function(err, num) {
  if ( err ) {return;}
  if (num === 0) {
    console.log('seeding keywords...');

    seed(function(err) {
      if ( err ) {return;}
      count(function(err, num) {
        if ( err ) {return;}
        console.log('keywords seeded: ', num);
      });
    });
  }
  console.log('keywords: ', num);
});

function count(callback) {
  Keyword.count({}, function( err, count ) {
    callback(err, count);
  });
}

function seed(callback) {
  Keyword.create(
    {"name": "25 de Abril"},
    {"name": "Angola"},
    {"name": "Conto e novelas"},
    {"name": "Contos"},
    {"name": "Crónicas"},
    {"name": "Documentos"},
    {"name": "Encíclica"},
    {"name": "Ensaio"},
    {"name": "Ensino"},
    {"name": "Espanha"},
    {"name": "Guerra"},
    {"name": "Literatura"},
    {"name": "Magazine"},
    {"name": "Moçambique"},
    {"name": "Nobel"},
    {"name": "Papa"},
    {"name": "Pulitzer"},
    {"name": "Revista"},
    {"name": "Romance"},
    {"name": "Rússia"},
    callback
  );
}
