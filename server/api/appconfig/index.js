'use strict'

var express = require('express');
var router = express.Router();
var configCtrl = require('./appconfig.controller');

router.get('/:config/:language?', configCtrl.getall);

module.exports = require('../apirouter')(router, configCtrl);
