'use strict';

var express = require('express');
var router = express.Router();
var bookCtrl = require('./book.controller');

router.get('/advanced/search/:title/:authors/:subject', bookCtrl.advancedSearch);
router.get('/search/:limit([0-9]+)/:filter?', bookCtrl.search);
router.get('/store/:id', bookCtrl.store);

module.exports = require('../apirouter')(router, bookCtrl, []);


//module.exports = function(app) {
//  return require('../apirouter')(router, bookCtrl, []);
//}
