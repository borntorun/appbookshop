/**
 * Main application routes
 */

'use strict';
var errors = require('./components/errors');
module.exports = function (app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));

  app.use('/api/counters', require('./api/counters'));

  app.use('/api/bookconfig', require('./api/bookconfig'));

  app.use('/api/books', require('./api/book'));

  /*app.use('/api/categories', require('./api/category'));

  app.use('/api/publishers', require('./api/publisher'));*/

  app.use('/api/tables', require('./api/tables'));


  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*').get(errors[404]);
  // Route to index.html
  var funcIndexHtml = function (req, res) {
    res.sendfile(app.get('appPath') + '/index.html');
  };
  app.route('/').get(funcIndexHtml);

  app.route('/search/advanced/([0-9]+)/*').get(funcIndexHtml);

  app.route('/search/free/([0-9]+)/*').get(funcIndexHtml);

  app.route('/livro/:id').get(funcIndexHtml);

  app.route('/admin/livro/:id').get(funcIndexHtml);

  //
  app.route('/about').get(function (req, res) {
    res.sendfile(app.get('appPath') + '/index.html');
  });

  // All other routes should redirect to 404
  app.route('/*').get(errors[404]);
};
