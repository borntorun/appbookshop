'use strict';

var Q = require('q');

var googleService = require('./google.service');

var passport = require('passport');



/**
 * Handler after success authentication and redirect
 * req.user will exists
 * @param req
 * @param res
 * @returns {*}
 */
exports.success = function( req, res ) {
  console.log('success------'/*, req.user*/);
  return res.render('googleClose', {
    'data': {
      user: req.user
    }
  });
}

/**
 * Handler after fail authentication and redirect
 * req.user will not exists
 * @param req
 * @param res
 * @returns {*}
 */
exports.fail = function( req, res ) {
  console.log('fail------'/*, req.user*/);
  return res.render('googleClose', {
    'data': {
      error: new Error('Invalid credentials')
    }
  });

}

/**
 * This handler is not used/called because success/fail redirection
 * is in used in route definition in auth/google/index.js
 * @param req
 * @param res
 * @returns {*}
 */
exports.callback = function( req, res ) {
  console.log('callback----------------');
  return res.status(200).json({data: 'callback'})
}
