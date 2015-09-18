/**
 * Main application routes
 */

'use strict';
var errors = require('./components/errors');
var config = require('./config/environment');
var path = require('path');


module.exports = function (app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));

  app.use('/api/counters', require('./api/counters'));

  app.use('/api/bookconfig', require('./api/bookconfig'));

  app.use('/api/books', require('./api/book'));

  app.use('/api/tables', require('./api/tables'));

  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth)/*').get(errors[404]);

  // Route to index.html
  var funcIndexHtml = function (req, res) {

    //console.log(path.join(config.root, config.appPath, 'index.html'));

    var options = {
      root: path.join(config.root, config.appPath)
    };
    console.log('em-routes.js',req.user);
    res.sendFile('index.html', options);
  };

  app.route('/').get(funcIndexHtml);

  app.route('/search/advanced/([0-9]+)/*').get(funcIndexHtml);

  app.route('/search/free/([0-9]+)/*').get(funcIndexHtml);

  app.route('/:area(book|livro)/:reference([\\d]+)/:slug([\\w-]+)?').get(funcIndexHtml);

  app.route('/admin/:area(book|livro)/:reference(new|[\\d]+)/:slug([\\w-]+)?').get(funcIndexHtml);

  //
  app.route('/about').get(function (req, res) {

    res.sendFile(app.get('appPath') + '/index.html');
  });


};
