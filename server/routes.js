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
//    var theCookies = new Cookies(req, res);
//
//    if ( req.url == '/livro/484' ) {
//
//      theCookies
//        // set a regular cookie
//        .set('nomedele', 'valor', { httpOnly: false });
//    }
//    else {
//      var nomedele = theCookies.get('nomedele');
//      console.log('nomedele:', nomedele);
//    }
//

//
    console.log('req.isAuthenticated=====', req.isAuthenticated());
    console.log('funcIndexHtml req.user======:', req.user);
//    console.log('funcIndexHtml req.url:', req.url);
//    //console.log('funcIndexHtml req:', req);

    var options = {
      root: config.root//path.join(config.root, config.appPath)
      //csrfToken: req.csrfToken()
    };

    console.log('funcIndexHtml req.params:', req.params);
    console.log('funcIndexHtml res options:', options);

    var ocookie = new Cookies(req, res);
    console.log('funcIndexHtml req.cookies:', req.cookies);
    console.log('funcIndexHtml req.session:', req.session);

    ocookie.set('XSRF-TOKEN', req.csrfToken(), { httpOnly: false });
    res.sendFile('index.html', options);
  };

  var auth = require('./auth');


  app.use('/logout', auth.ensureIsAuthenticated, auth.logout);

  app.route('/').get(funcIndexHtml);

  app.route('/index.html').get(funcIndexHtml);

  //app.route('/login/google').get(funcIndexHtml);

  // Insert routes below

  app.use('/api/counters', require('./api/counters'));

  app.use('/api/bookconfig', require('./api/bookconfig'));

  app.use('/api/books', require('./api/book'));

  app.use('/api/tables', require('./api/tables'));

  app.use('/auth/google', require('./auth/google'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth)/*').get(errors[404]);

  app.route('/search/free/([0-9]+)/:term?').get(funcIndexHtml);

  app.route('/search/advanced/([0-9]+)/:tit/:aut/:ssub/:col/:cat/:edi').get(funcIndexHtml);

  app.route('/:area(book|livro)/:reference([\\d]+)/:slug([\\w-]+)?').get(funcIndexHtml);

  app.route('/admin/:area(book|livro)/:reference(new|[\\d]+)/:slug([\\w-]+)?')
    .all(auth.ensureIsAuthenticated)
    .get(funcIndexHtml);

};
