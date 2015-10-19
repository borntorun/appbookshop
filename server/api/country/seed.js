/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
var theTable = {
  obj: require('./country.model.js'),
  name: 'countries'
};

var theObjects = [
  {'name': 'Portugal'},
  {'name': 'França'},
  {'name': 'Espanha'},
  {'name': 'Brasil'},
  {'name': 'Angola'},
  {'name': 'E.U.A.'},
  {'name': 'Russia'},
  {'name': 'U.R.S.S.'},
  {'name': 'Suiça'},
  {'name': 'África do Sul'},
  {'name': 'Colômbia'},
  {'name': 'Moçambique'},
  {'name': 'Chile'},
  {'name': 'Reino Unido'},
  {'name': 'Alemanha'},
  {'name': 'Canadá'},
  {'name': 'Itália'},
  {'name': 'Suécia'},
  {'name': 'Índia'},
  {'name': 'Checoslováquia'},
  {'name': 'Hungria'},
  {'name': 'Austrália'}
];

require('../tables/tables.seed')(theTable, theObjects);
