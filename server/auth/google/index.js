'use strict';

var express = require('express');
var router = express.Router();
var googleCtrl = require('./google.controller');
var googleOptions = require('./google.options');
var passport = require('passport');


router.get('/authenticate', function(req, res, next){console.log('authenticate');next();},passport.authenticate('google', { scope: googleOptions.scope }));

router.get('/callback', passport.authenticate('google', {
  failureRedirect: '/auth/google/fail',
  successRedirect: '/auth/google/success'
}), googleCtrl.callback);

router.get('/fail', googleCtrl.fail);

router.get('/success', googleCtrl.success);

module.exports = router;
