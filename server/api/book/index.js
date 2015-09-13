'use strict';

var express = require('express');
var router = express.Router();
var bookCtrl = require('./book.controller');

router.get('/search/advanced/:limit([0-9]+)/:title/:authors/:subject/:collection/:categories/:edition', bookCtrl.advancedSearch);
router.get('/search/free/:limit([0-9]+)/:filter?', bookCtrl.search);
router.get('/store/:id', bookCtrl.store);
router.get('/admin/:id', bookCtrl.edit);
router.post('/admin/:id', bookCtrl.save);

module.exports = require('../apirouter')(router, bookCtrl, []);


//module.exports = function(app) {
//  return require('../apirouter')(router, bookCtrl, []);
//}
