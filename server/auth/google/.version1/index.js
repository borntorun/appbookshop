'use strict';

var express = require('express');
var router = express.Router();
var googleCtrl = require('./google.controller');

router.get('/logininfo', googleCtrl.loginInfo);
router.get('/callback', googleCtrl.callback);

module.exports = router;
