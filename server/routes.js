/**
 * Main application routes
 */

'use strict';
var Cookies = require('cookies');
var errors = require('./components/errors');
var config = require('./config/environment');
var path = require('path');

module.exports = function( app ) {

  // Route to index.html
  var funcIndexHtml = function( req, res ) {

    var options = {
      root: config.root
    };
    var ocookie = new Cookies(req, res);
    var valueToken = req.csrfToken();
    ocookie.set('XSRF-TOKEN', valueToken, { httpOnly: false });
    res.sendFile('index.html', options);
  };


  //Force redirect to https in production
  //http://stackoverflow.com/questions/7185074/heroku-nodejs-http-to-https-ssl-forced-redirect
  var forceSsl = function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    return next();
  };
  if (config.env === 'production') {
    app.use(forceSsl);
  }

  app.route('/').get(funcIndexHtml);

  app.route('/index.html').get(funcIndexHtml);

  var auth = require('./auth');

  app.use('/api/counters', auth.ensureIsAuthenticated, require('./api/counters'));

  app.use('/api/appconfig', require('./api/appconfig'));

  app.use('/api/books', require('./api/book'));

  app.use('/api/tables', require('./api/tables'));

  app.use('/auth/google', require('./auth/google'));

  app.route('/auth/logout').post(/*auth.ensureIsAuthenticated, */auth.logout);

  app.route('/auth/user').get(auth.ensureIsAuthenticated, auth.user);

  app.route('/search/free/([0-9]+)/:term?').get(funcIndexHtml);

  app.route('/search/advanced/([0-9]+)/:tit/:aut/:sub/:col/:cat/:edi').get(funcIndexHtml);

  app.route('/:area(book|livro)/:reference([\\d]+)/:slug([\\w-]+)?').get(funcIndexHtml);

  app.route('/admin/:area(book|livro)/:reference(new|[\\d]+)/:slug([\\w-]+)?')
    .post(auth.ensureIsAuthenticated);

  app.route('/admin/:area(book|livro)/:reference(new|[\\d]+)/:slug([\\w-]+)?')
    .get(auth.ensureRedirectIfNotAuthenticated, funcIndexHtml)

  app.route('/message/:term?').get(
    require('body-parser').json(),
    require('express-validator')(),
    function(req, res, next) {
      req.sanitize('term').escape();
      next();
    },
    funcIndexHtml
  );

  // All undefined asset or api routes should return a 404
  //app.route('/:url(api|auth)/*').get(errors[404]);
  // All undefined asset or api routes should return a 404
  app.route('*').get(errors[404]);
};
