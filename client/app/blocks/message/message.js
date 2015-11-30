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
  function message(appConfig, messageConfig, modalpopup) {
    /*
    * Private Block
    */


//    var groups = {};
//
//    groups.bookdetail = {
//      title: 'Livros & Livros',
//      notfound: {
//        message: 'Livro não encontrado\n\n%url\n\nVerifique o endereço e tente novamente',
//        title: '',
//        type: 'message'//will invoke modalpopup['message']
//      }
//    };
//
//    groups.bookrecord = {
//      title: 'Registo/Edição de Livro',
//      notsaved: {
//        message: 'Livro não registado.\n\nVerifique os seguintes problemas no registo:\n\n%error',
//        title: '',
//        type: 'message'
//      },
//      notfound: {
//        message: 'Livro não encontrado\n\n%url\n\nVerifique o endereço e tente novamente',
//        title: '',
//        type: 'message'
//      },
//      save: {
//        message: 'Pretende gravar as alterações efectuadas?',
//        title: '',
//        type: 'confirm'
//      },
//      clear: {
//        message: 'Pretende limpar o formulário?\n\nPerderá os dados constantes no formulário.\n(o registo na base de dados não será afectado enquanto não efectuar "Gravar")',
//        title: '',
//        type: 'confirm'
//      },
//      reset: {
//        message: 'Desfazer alterações efectuadas?\n\nO registo da base de dados será carregado.\n(perderá as alterações efectuadas no formulário)',
//        title: '',
//        type: 'confirm'
//      }
//    };


    /*
    * Public Interface
    */
    //is a function
//    function service(group, message, err){
//
//      var theTitle = groups[group][message].title || groups[group].title;
//      var theMessage = groups[group][message].message;
//      var theType = groups[group][message].type;
//      var theVars = {};
//
//      if (err) {
//        theVars.error = err.cause && err.cause.data && err.cause.data.error?  err.cause.data.error : err.cause.statusText;
//      }
//      theVars.url = appConfig.urlAbsolute();
//
//      theMessage = replaceArgs(theMessage, theVars);
//
//      return modalpopup[theType](theMessage,theTitle);
//    }

    function service ( keyGroup, keyMessage, error) {
      if(typeof keyGroup === 'string' && typeof keyMessage === 'string') {
        var group = messageConfig[keyGroup];

        if(group && group[keyMessage] && group[keyMessage].type === 'confirm' || group[keyMessage].type === 'message') {
          var obj = group[keyMessage];
          var msg = obj.message || '';

          var vars = {};
          if (error != null) {
            vars.error = (error.cause && error.cause.data && error.cause.data.error?  error.cause.data.error :
              (error.cause && error.cause.statusText? error.cause.statusText : ''));
          }
          vars.url = appConfig.urlAbsolute();

          msg = replaceArgs(msg, vars);

          return modalpopup[obj.type](msg, obj.title || group.title || '');
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
