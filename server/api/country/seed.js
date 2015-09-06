/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
var Country = require('./country.model.js');

count( function(err, num) {
  if ( err ) {return;}
  if (num === 0) {
    console.log('seeding countries...');

    seed(function(err) {
      if ( err ) {return;}
      count(function(err, num) {
        if ( err ) {return;}
        console.log('countries seeded: ', num);
      });
    });
  }
  console.log('countries: ', num);
});

function count(callback) {
  Country.count({}, function( err, count ) {
    callback(err, count);
  });
}

function seed(callback) {
  Country.create(
    {"name": "Portugal"},
    {"name": "França"},
    {"name": "Espanha"},
    {"name": "Brasil"},
    {"name": "Angola"},
    {"name": "E.U.A."},
    {"name": "Russia"},
    {"name": "U.R.S.S."},
    {"name": "Suiça"},
    {"name": "África do Sul"},
    {"name": "Colômbia"},
    {"name": "Moçambique"},
    {"name": "Chile"},
    {"name": "Reino Unido"},
    {"name": "Alemanha"},
    {"name": "Canadá"},
    {"name": "Itália"},
    {"name": "Suécia"},
    {"name": "Índia"},
    {"name": "Checoslováquia"},
    {"name": "Hungria"},
    {"name": "Austrália"},
    callback
  );
}
