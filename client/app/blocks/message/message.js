/**
 * Service blocks.message message
 * (João Carvalho, 02-10-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Description: Shows message popup to show in app
 */
(function() {
  'use strict';
  angular
    .module('blocks.message')
    .factory('message', message);

  /* @ngInject */
  function message(appConfig, /*messageConfig,*/ modalpopup) {
    /*
    * Private Block
    */

    /*
    * Public Interface
    */
    //is a function


    function service ( keyGroup, keyMessage, opt) {
      if(typeof keyGroup === 'string' && typeof keyMessage === 'string') {
        var group = appConfig.message/*messageConfig*/[keyGroup];

        if(group && group[keyMessage] && group[keyMessage].type === 'confirm' || group[keyMessage].type === 'message') {
          var obj = group[keyMessage];
          var msg = obj.message || '';

          var vars = {};
          if (opt && opt.error) {
            //TODO: this is ugly ... change
//            vars.error = (opt.error.cause && opt.error.cause.data && opt.error.cause.data.error?
//              opt.error.cause.data.error :
//              (opt.error.cause && opt.error.cause.statusText? opt.error.cause.statusText : ''));

            vars.error = opt.error.cause.data.error || opt.error.cause.statusText || '';
          }
          vars.url = appConfig.urlAbsolute();

          msg = replaceArgs(msg, vars);

          return modalpopup[obj.type](msg, obj.title || group.title || '', opt);
        }
      }
      return Q.reject(null);
    }


    return service;
    ///////////////
    //just put functions below this point
    /*
    * Private Block Interface
    */
    function replaceArgs( message, vars ) {
      for ( var k in vars ) {
        message = message.replace(new RegExp('%' + k, 'ig'), vars[k] || '');
      }
      return message;
    }
  }
}());
