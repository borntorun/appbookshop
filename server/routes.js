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

//    console.log('req.isAuthenticated=====', req.isAuthenticated());
//    console.log('funcIndexHtml req.user======:', req.user);
//    console.log('funcIndexHtml req.url:', req.url);
//    console.log('funcIndexHtml req:', req);

    //console.log('funcIndexHtml config.root-------->:', config.root);///home/joao/devel/web/appbookshop

    var options = {
      root: config.root
    };

//    console.log('funcIndexHtml req.params:', req.params);
//    console.log('funcIndexHtml res options:', options);

    var ocookie = new Cookies(req, res);
    console.log('funcIndexHtml req.cookies:', req.cookies);
//    console.log('funcIndexHtml req.session:', req.session);

    var valueToken = req.csrfToken();
    console.log('funcIndexHtml valueToken------>:', valueToken);
    ocookie.set('XSRF-TOKEN', valueToken, { httpOnly: false });
    res.sendFile('index.html', options);
  };

  var auth = require('./auth');

  app.route('/').get(funcIndexHtml);

  app.route('/index.html').get(funcIndexHtml);

  app.use('/api/counters', auth.ensureIsAuthenticated, require('./api/counters'));

  app.use('/api/bookconfig', require('./api/bookconfig'));

  app.use('/api/books', require('./api/book'));

  app.use('/api/tables', require('./api/tables'));

  app.use('/auth/google', require('./auth/google'));

  app.route('/auth/logout').all(auth.ensureIsAuthenticated, auth.logout);


  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth)/*').get(errors[404]);

  app.route('/search/free/([0-9]+)/:term?').get(funcIndexHtml);

  app.route('/search/advanced/([0-9]+)/:tit/:aut/:sub/:col/:cat/:edi').get(funcIndexHtml);

  app.route('/:area(book|livro)/:reference([\\d]+)/:slug([\\w-]+)?').get(funcIndexHtml);

  app.route('/admin/:area(book|livro)/:reference(new|[\\d]+)/:slug([\\w-]+)?')
    .post(auth.ensureIsAuthenticated);

  app.route('/admin/:area(book|livro)/:reference(new|[\\d]+)/:slug([\\w-]+)?')
    .get(auth.ensureRedirectIfNotAuthenticated, funcIndexHtml)

  app.route('/message/:term?').get(funcIndexHtml);
};
