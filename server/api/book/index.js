'use strict';

var express = require('express');
var router = express.Router();
var bookCtrl = require('./book.controller');

router.get('/search/advanced/:limit([0-9]+)/:title/:authors/:subject/:collection/:categories/:edition', bookCtrl.advancedSearch);
router.get('/search/free/:limit([0-9]+)/:filter?', bookCtrl.search);
router.get('/store/:reference/:slug?', bookCtrl.store);


//router.get('/admin/:reference', bookCtrl.edit);

//TODO: set auth.ensureIsAuthenticated in routes

router.get('/admin/:reference/:slug?', bookCtrl.edit);
router.post('/admin/:id', require('body-parser').json(),  require('express-validator')(), bookCtrl.save);


module.exports = require('../apirouter')(router, bookCtrl, []);


//module.exports = function(app) {
//  return require('../apirouter')(router, bookCtrl, []);
//}
