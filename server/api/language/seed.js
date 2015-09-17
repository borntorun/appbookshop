/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
var Language = require('./language.model.js');

count( function(err, num) {
  if ( err ) {return;}
  if (num === 0) {
    console.log('seeding languages...');

    seed(function(err) {
      if ( err ) {return;}
      count(function(err, num) {
        if ( err ) {return;}
        console.log('languages seeded: ', num);
      });
    });
  }
  console.log('languages: ', num);
});

function count(callback) {
  Language.count({}, function( err, count ) {
    callback(err, count);
  });
}

function seed(callback) {
  Language.create(
    {'name': 'Português'},
    {'name': 'Espanhol'},
    {'name': 'Francês'},
    {'name': 'Inglês'},
    {'name': 'Alemão'},
    {'name': 'Dinamarquês'},
    {'name': 'Finlandês'},
    {'name': 'Hebreu'},
    {'name': 'Italiano'},
    {'name': 'Japonês'},
    {'name': 'Coreano'},
    {'name': 'Holandês'},
    {'name': 'Polaco'},
    {'name': 'Russo'},
    {'name': 'Sueco'},
    {'name': 'Árabe'},
    {'name': 'Búlgaro'},
    {'name': 'Checo'},
    {'name': 'Grego'},
    {'name': 'Esperanto'},
    {'name': 'Estónio'},
    {'name': 'Persa'},
    {'name': 'Galego'},
    {'name': 'Húngaro'},
    {'name': 'Islandês'},
    {'name': 'Romeno'},
    {'name': 'Servo-Croata'},
    {'name': 'Turco'},
    {'name': 'Chinês'},
    {'name': 'Castelhano'},
    {'name': 'Latim'},
    callback
  );
}
