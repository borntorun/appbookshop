'use strict';
var MessageConfig = require('../appconfig.model')('message');//require('./message.model');
console.log('seeding message config...');
MessageConfig.find({}).remove(function () {
  MessageConfig.create(
    {
      language: 'pt',
      config: {
        authentication:{
          title: 'Livros & Livros',
          forbidden: {
            message: 'Poderá existir um problema com a sua autenticação.\nA sua sessão será terminada, sendo que deverá efectuar de novo a entrada com o seu email.' +
              '\n\n(Os dados que eventualmente estará a trabalhar NÃO serão perdidos\ne poderão ser retomados.)',
            title: '',
            type: 'message'
          }
        },
        authorization:{
          title: 'Livros & Livros',
          unauthorized: {
            message: 'Não possui autorização suficiente ou a sua sessão poderá ter expirado.\nA sua sessão será terminada, sendo que deverá efectuar de novo a entrada com o seu email.',
            title: '',
            type: 'message'
          }
        },
        bookdetail: {
          title: 'Livros & Livros',
          notfound: {
            message: 'Livro não encontrado\n\n%url\n\nVerifique o endereço e tente novamente',
            title: '',
            type: 'message'
          }
        },
        bookrecord: {
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
        }
      }

    }
  );
});
