'use strict'

exports.ensureIsAuthenticated = function( req, res, next ) {
  console.time('isAuthenticated');
  if ( req.isAuthenticated() ) {
    console.timeEnd('isAuthenticated');
    return next();
  }
  return res.status(401).json({data: 'not authorized'});
};

exports.ensureRedirectIfNotAuthenticated = function( req, res, next ) {
  if ( req.isAuthenticated() ) {
    return next();
  } else {
    return res.redirect('/message/' + encodeURIComponent('Não possui sessão iniciada!'));
  }
};

exports.logout = function( req, res ) {
  req.logout();
  return res.status(200).json({status: true});
};
