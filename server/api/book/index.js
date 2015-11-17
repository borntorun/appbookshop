'use strict';

var express = require('express');
var router = express.Router();
var bookCtrl = require('./book.controller');

router.get('/search/advanced/:limit([0-9]+)/:title/:authors/:subject/:collection/:categories/:edition/:loadfrom?', bookCtrl.advancedSearch);
router.get('/search/free/:limit([0-9]+)/:filter?/:loadfrom?', bookCtrl.search);
router.get('/store/:reference/:slug?', bookCtrl.store);


var auth = require('../../auth');

router.get('/admin/:reference/:slug?', auth.ensureIsAuthenticated, bookCtrl.edit);
router.post('/admin/:id', auth.ensureIsAuthenticated, require('body-parser').json(),  require('express-validator')(), bookCtrl.save);

module.exports = require('../apirouter')(router, bookCtrl, []);

