/**
 * Service blocks.message message
 * (João Carvalho, 02-10-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Description: Manage text items to show in app
 */
(function() {
  'use strict';
  angular
    .module('blocks.message')
    .factory('message', message);

  /* @ngInject */
  function message(appconfig, modalpopup) {
    /*
    * Private Block
    */
    var groups = {};

    groups.bookdetail = {
      title: 'Livros & Livros',
      notfound: {
        message: 'Livro não encontrado\n\n%url\n\nVerifique o endereço e tente novamente',
        title: '',
        type: 'message'
      }
    };

    groups.bookrecord = {
      title: 'Registo/Edição de Livro',
      notsaved: {
        message: 'Livro não registado.\n\nVerifique os seguintes problemas no registo:\n\n%error',
        title: '',
        type: 'message'
      },
      notfound: {
        message: 'Livro não encontrado\n\n%url\n\nVerifique o endereço e tente novamente',
        title: '',
        type: 'message'
      },
      save: {
        message: 'Pretende gravar as alterações efectuadas?',
        title: '',
        type: 'confirm'
      },
      clear: {
        message: 'Pretende limpar o formulário?\n\nPerderá os dados constantes no formulário.\n(o registo na base de dados não será afectado enquanto não efectuar "Gravar")',
        title: '',
        type: 'confirm'
      },
      reset: {
        message: 'Desfazer alterações efectuadas?\n\nO registo da base de dados será carregado.\n(perderá as alterações efectuadas no formulário)',
        title: '',
        type: 'confirm'
      }
    };


    /*
    * Public Interface
    */
    //is a function
    function service(group, message, err){

      var theTitle = groups[group][message].title || groups[group].title;
      var theMessage = groups[group][message].message;
      var theType = groups[group][message].type;
      var theVars = {};

      if (err) {
        theVars.error = err.cause && err.cause.data && err.cause.data.error?  err.cause.data.error : err.cause.statusText;
      }
      theVars.url = appconfig.urlAbsolute();

      theMessage = replaceArgs(theMessage, theVars);

      return modalpopup[theType](theMessage,theTitle);
        /*{
          message: theMessage,
          title: theTitle*//*,
          vars: {error: err.cause && err.cause.data && err.cause.data.error?  err.cause.data.error : err.cause.statusText}*//*
        }*/

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
