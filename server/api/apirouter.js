/**
 * Created by Joao Carvalho on 02-02-2015.
 */
'use strict'

var funcMethods = {
  'post': function(router, sRoute, fHandler ){router.post(sRoute, require('body-parser').json(), fHandler)},
  'get': function(router, sRoute, fHandler ){router.get(sRoute, fHandler)},
  'put': function(router, sRoute, fHandler ){router.put(sRoute, require('body-parser').json(), fHandler)},
  'patch': function(router, sRoute, fHandler ){router.patch(sRoute, require('body-parser').json(), fHandler)},
  'delete': function(router, sRoute, fHandler ){router.delete(sRoute, require('body-parser').json(), fHandler)}
};

function setRoute(method, router, sRoute, fHandler) {
  if (!fHandler) { return; }

  funcMethods[method](router, sRoute, fHandler);
}


module.exports = function (router, controller, routes) {
  if (!routes) {
    setRoute('post', router, '/', controller.create);
    setRoute('get', router,'/', controller.read || controller.index || controller.list);
    setRoute('get', router,'/:id', controller.get || controller.show);
    setRoute('put', router,'/:id', controller.update || controller.save);
    setRoute('patch', router,'/:id', controller.update || controller.save);
    setRoute('delete', router,'/:id', controller.delete || controller.remove || controller.destroy);
  }
  return router;
  /*
  funcHandler = controller.create;
  if (funcHandler) {
    router.post('/', funcHandler)
  }

  funcHandler = controller.read || controller.index || controller.list;
  if (funcHandler) {
    router.get('/', funcHandler);
  }

  funcHandler = controller.get || controller.show;
  if (funcHandler) {
    router.get('/:id', funcHandler);
  }

  funcHandler = controller.update || controller.save;
  router.put('/:id', funcHandler);

  funcHandler = controller.update || controller.save;
  router.patch('/:id', funcHandler);

  funcHandler = controller.delete || controller.remove || controller.destroy
  router.delete('/:id', funcHandler);

  return router;
  */
};
