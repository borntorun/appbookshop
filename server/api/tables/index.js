'use strict';

var express = require('express');
var router = express.Router();
var tablesCtrl = require('./tables.controller');

console.log('teste');
router.get('/:table', tablesCtrl.getall);
router.get('/:table/search/:filter?/:limit?', tablesCtrl.search);

module.exports = require('../apirouter')(router, tablesCtrl);
