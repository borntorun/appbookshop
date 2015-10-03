'use strict'

exports.ensureIsAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  return res.status(401).send({data: 'not authorized'});
};

exports.logout = function (req, res) {
  req.logout();
  return res.redirect('/');
};
