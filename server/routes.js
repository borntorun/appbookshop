/**
 * Main application routes
 */

'use strict';
var errors = require('./components/errors');
module.exports = function (app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));

  app.use('/api/bookconfig', require('./api/bookconfig'));

  app.use('/api/books', require('./api/book'));

  app.use('/api/categories', require('./api/category'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*').get(errors[404]);
  // Route to index.html
  var funcIndexHtml = function (req, res) {
    res.sendfile(app.get('appPath') + '/index.html');
  };
  app.route('/').get(funcIndexHtml);

  app.route('/search/*').get(funcIndexHtml);

  app.route('/livro/:id').get(funcIndexHtml);
  //
  app.route('/about').get(function (req, res) {
    res.sendfile(app.get('appPath') + '/index.html');
  });

  // All other routes should redirect to 404
  app.route('/*').get(errors[404]);
};
