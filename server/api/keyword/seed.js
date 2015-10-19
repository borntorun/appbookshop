/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
var theTable = {
  obj: require('./keyword.model.js'),
  name: 'keywords'
};

var theObjects = [
  {'name': '25 de Abril'},
  {'name': 'Angola'},
  {'name': 'Conto e novelas'},
  {'name': 'Contos'},
  {'name': 'Crónicas'},
  {'name': 'Documentos'},
  {'name': 'Encíclica'},
  {'name': 'Ensaio'},
  {'name': 'Ensino'},
  {'name': 'Espanha'},
  {'name': 'Guerra'},
  {'name': 'Literatura'},
  {'name': 'Magazine'},
  {'name': 'Moçambique'},
  {'name': 'Nobel'},
  {'name': 'Papa'},
  {'name': 'Pulitzer'},
  {'name': 'Revista'},
  {'name': 'Romance'},
  {'name': 'Rússia'}
];

require('../tables/tables.seed')(theTable, theObjects);
