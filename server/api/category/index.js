'use strict';

var express = require('express');
var router = express.Router();
var categoryCtrl = require('./category.controller');

router.get('/search/:filter?/:limit?', categoryCtrl.search);

module.exports = require('../apirouter')(router, categoryCtrl);
