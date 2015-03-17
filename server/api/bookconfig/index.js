'use strict';

var express = require('express');
var router = express.Router();
var bookCtrl = require('./bookconfig.controller');

module.exports = require('../apirouter')(router, bookCtrl);
