'use strict';

var express = require('express');
var router = express.Router();
var countersCtrl = require('./counters.controller.js');

module.exports = require('../apirouter')(router, countersCtrl);
