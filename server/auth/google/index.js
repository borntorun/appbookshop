'use strict';

var express = require('express');
var router = express.Router();
var googleCtrl = require('./google.controller');
var googleOptions = require('./google.options');
var passport = require('passport');

/**
 * Route to authenticate
 */

router.get('/authenticatewait', googleCtrl.authenticateWait);

router.get('/authenticate', /*function( req, res, next ) {
    console.log('authenticate----', req);
    next();
  },*/
  passport.authenticate('google', {
    scope: googleOptions.scope,
    accessType: googleOptions.accessType
  })
);

/**
 * Route(s) called by google after authentication attempt
 * routes to failure/success are passed in to passport
 * an alternative is to handle failure/success in the callback handler (not passing in the fail/success object)
 */
router.get('/callback', passport.authenticate('google', {
  failureRedirect: '/auth/google/fail',
  successRedirect: '/auth/google/success'
}), googleCtrl.callback);

/**
 * Route to failure authentication handler
 */
router.get('/fail', googleCtrl.fail);

/**
 * Route to success authentication handler
 */
router.get('/success', googleCtrl.success);

/**
 * Route to verify the need to refres session (re-authentication)
 */
router.get('/refresh', googleCtrl.refresh);



module.exports = router;
