'use strict';

var express = require('express');
var passport = require('passport');
var authCtrl = require('./authCtrl');
var router = express.Router();

router.get('/:social/callback', passport.authenticate('google', {
  successRedirect: '/',
  failure: '/error/'
}));

router.get('/:social', passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ]
}));

module.exports = router;
