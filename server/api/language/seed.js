/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
var theTable = {
  obj: require('./language.model.js'),
  name: 'languages'
};

var theObjects = [
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
  {'name': 'Latim'}
];

require('../tables/tables.seed')(theTable, theObjects);
