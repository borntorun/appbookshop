'use strict';

var express = require('express');
var cors = require('cors')
var router = express.Router();
var googleCtrl = require('./google.controller');


router.get('/callback', googleCtrl.callback);

module.exports = router;
