'use strict';



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
