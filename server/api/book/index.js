'use strict';

var express = require('express');
var router = express.Router();
var bookCtrl = require('./book.controller');

router.get('/advanced/search/:title/:authors/:subject', bookCtrl.advancedSearch);
router.get('/search/:filter?/:limit?', bookCtrl.search);
router.get('/store/:id', bookCtrl.store);


module.exports = require('../apirouter')(router, bookCtrl, []);
