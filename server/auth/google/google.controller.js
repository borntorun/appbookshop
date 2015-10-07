'use strict';
var googleService = require('../google/google.service');
var googleProfile = require('./google.profile');

exports.refresh = function(req, res) {
  if (!req.user) {
    return res.status(401).json({});
  }

  googleProfile.getUser(req.user)
    .catch(null)
    .then(googleService.isValidToken)
    .catch(googleService.refresh)
    .then(function(data){
      return res.status(200).json(data);
    })
    .catch(function(err){
      return res.status(401).json({});
    });
}

exports.authenticateWait = function( req, res ) {

  return res.render('googleWait');
};

/**
 * Handler after success authentication and redirect
 * req.user will exists
 * @param req
 * @param res
 * @returns {*}
 */
exports.success = function( req, res ) {

  return res.render('googleClose', {
    'data': {
      user: req.user
    }
  });
};

/**
 * Handler after fail authentication and redirect
 * req.user will not exists
 * @param req
 * @param res
 * @returns {*}
 */
exports.fail = function( req, res ) {

  return res.render('googleClose', {
    'data': {
      error: new Error('Invalid credentials')
    }
  });
};

/**
 * This handler is not used/called because success/fail redirection
 * is in used in route definition in auth/google/index.js
 * @param req
 * @param res
 * @returns {*}
 */
exports.callback = function( req, res ) {

  return res.status(200).json({data: 'callback'})
};
