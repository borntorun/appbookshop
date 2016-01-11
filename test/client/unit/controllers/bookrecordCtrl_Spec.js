'use strict';

describe(myUtil.title.controller('BookrecordCtrl'), function() {
  var $controller, $scope, $httpBackend, $cacheFactory, $rootScope, $stateParams;
  var requestSearchHandler;


  beforeEach(module('blocks.signals'));
  beforeEach(module('appBookShop.bookrecord'));


  beforeEach(inject(function( _$rootScope_, _$controller_, _$httpBackend_, _$cacheFactory_ ) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $scope = _$rootScope_.$new();
    $httpBackend = _$httpBackend_;
    $cacheFactory = _$cacheFactory_;
    $stateParams = { reference: '1' };
  }));

  beforeEach(function() {
    requestSearchHandler = httpBackendDefinitions();
  });

  afterEach(httpBackendVerifyNoOutstanding);

  it('should ....', function( done ) {
    requestSearchHandler.respond([
      {title: 'um'}
    ]);

    var bookrecordCtrl = $controller('BookrecordCtrl', {
      $scope: $scope,
      $stateParams: $stateParams,
      appConfig: {
        book:myMocks.appconfig.book().config,
        message: myMocks.appconfig.message().config
      },
      Book: {

      }
    });

    $httpBackend.flush();
    //dump($scope);

    waitsForAndThenRun(null, function() {
      /*for (var k in bookrecordCtrl){
        dump('key=' +k, bookrecordCtrl[k]);
      }
      dump(bookrecordCtrl.book);*/

      dump('>>>>>>>>>>>>>>>>>>>>>>NEED TEST THINGS!<<<<<<<<<<<<<<<<<<<<<<<<<<');

      done();
    }, 100);

  });

  function httpBackendVerifyNoOutstanding() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  }

  function httpBackendDefinitions() {

    //this request is made when calling the app module
    //not nececessary for the tests
    $httpBackend.when('GET', '/api/appconfig/book/').respond(200, myMocks.appconfig.book());
    $httpBackend.when('GET', '/api/appconfig/message/').respond(200, myMocks.appconfig.message());

    //this is the definition for the tests
    return $httpBackend.when('GET', /^\/api\/books\/admin\/*./);
  }

  //mocks

  /*function getBookConfig() {
    return {
      language: 'pt',
      config: {
        search: {
          limitDefault: 25,
          limitFeatured: 25,
          viewportDefault: 75
        },
        placeholders: {
          reference: 'referência',
          title: 'título do livro',
          authors: 'autor ou autores do livro',
          subject: 'assunto',
          editionNumber: 'nº edição',
          editionYear: '1500-actual',
          editionLanguage: 'idioma',
          editionCountry: 'país',
          editionPublisher: 'editora',
          editionTranslatedLanguage: 'Traduzido do',
          editionCountryFirstPublisher: 'Editora da 1ª edição',
          editionYearCountryFirstEdition: 'Ano da 1ª edição',
          editionISBN: 'ISBN',
          originalLanguage: 'Idioma',
          originalTitle: 'Título',
          originalPublisher: 'Editora',
          originalYearFirstEdition: 'Ano',
          originalCountryEdition: 'País',
          nameCollection: 'Colecção',
          numCollection: 'Nº na colecção',
          translators: 'Tradução por',
          prefaceBy: 'Prefácio de',
          postfaceBy: 'Posfácio de',
          graphicalPrint: 'Impressão Gráfica',
          cover: 'Capa',
          images: 'Imagens',
          workmanship: 'Acabamento',
          pagesNum: 'NºPág',
          priceInitial: 'Preço Inicial',
          priceCost: 'Preço de Custo',
          price: 'Preço',
          buyAt: 'Local de Compra',
          editionLegalDeposit: 'Depósito Legal',
          circulation: 'Tiragem',
          keywords: 'Palavras-Chave',
          archive: 'Localização Arquivo',
          condition: 'Condição',
          lendingTo: 'Empréstimo',
          obs: 'Observações (internet)',
          obsInternal: 'Observações',
          correctors: 'Correctores',
          subtitle: 'Sub-Título',
          dimensions: 'Dimensões',
          weight: 'Peso',
          numVolume: 'NºVol',
          qt: 'Quantidade',
          categories: 'Categorias',
          template: 'Template',
          dateResgistration: 'Data de Registo',
          dateUpdate: 'Data de Modificação'
        },
        labels: {
          reference: 'Nº / Refª',
          title: 'Título',
          authors: 'Autor',
          subject: 'Assunto',
          editionNumber: 'Nº edição',
          editionYear: 'Ano',
          editionLanguage: 'Idioma',
          editionCountry: 'País',
          editionPublisher: 'Editora',
          editionTranslatedLanguage: 'Traduzido do',
          editionCountryFirstPublisher: 'Editora 1ª edição',
          editionYearCountryFirstEdition: 'Ano 1ª edição',
          editionISBN: 'ISBN',
          originalLanguage: 'Idioma',
          originalTitle: 'Título',
          originalPublisher: 'Editora',
          originalYearFirstEdition: 'Ano',
          originalCountryEdition: 'País',
          nameCollection: 'Colecção',
          numCollection: 'Nº',
          translators: 'Tradução por',
          prefaceBy: 'Prefácio de',
          postfaceBy: 'Posfácio de',
          graphicalPrint: 'Impressão Gráfica',
          cover: 'Capa',
          images: 'Imagens',
          workmanship: 'Acabamento',
          pagesNum: 'NºPág',
          priceInitial: 'Preço Inicial',
          priceCost: 'Preço de Custo',
          price: 'Preço',
          buyAt: 'Local de Compra',
          editionLegalDeposit: 'Depósito Legal',
          circulation: 'Tiragem',
          keywords: 'Palavras-Chave',
          archive: 'Localização Arquivo',
          condition: 'Condição',
          lendingTo: 'Empréstimo',
          obs: 'Observações (internet)',
          obsInternal: 'Observações',
          correctors: 'Correctores',
          subtitle: 'Sub-Título',
          dimensions: 'Dimensões',
          weight: 'Peso',
          numVolume: 'NºVol',
          qt: 'Qt.',
          categories: 'Categorias',
          isNewBook: 'É novo',
          isFeatured: 'Em destaque',
          isPromotion: 'Em promoção',
          isRare: 'É raro',
          isUnique: 'É único',
          isValuable: 'É valioso',
          sellOnline: 'Venda na internet',
          sellPresencial: 'Venda em mão',
          qtStore: 'Qt. em loja',
          qtSold: 'Qt. vendida',
          discounts: 'Desconto',
          taxes: 'Taxa',
          template: 'Template',
          dateResgistration: 'Data de Registo',
          dateUpdate: 'Data de Modificação'
        },
        valMessages: {
          'title': {'required': 'o título é obrigatório'},
          'editionYear': {'invalid': 'ano entre 1500-Ano actual'},
          'originalYearFirstEdition': {'invalid': 'ano entre 1500-Ano actual'},
          'editionNumber': {'invalid': 'valor inválido'},
          'circulation': {'invalid': 'valor inválido'},
          'editionISBN': {'invalid': 'ISBN inválido'},
          'price': {'invalid': 'valor inválido'},
          'priceInitial': {'invalid': 'valor inválido'},
          'priceCost': {'invalid': 'valor inválido'},
          'qt': {'invalid': 'valor inválido'},
          'qtSold': {'invalid': 'valor inválido'},
          'qtStore': {'invalid': 'valor inválido'}
        }
      }
    };
  }
  function getMessageConfig() {
    return {
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
          },
          new: {
            message: 'Registar novo livro?\n\nPerderá as alterações que efectuou no registo actual.',
            title: '',
            type: 'confirm'
          },
          reloadsaved: {
            message: 'Recuperar as alterações efectuadas anteriormente neste registo?',
            title: '',
            type: 'confirm'
          }
        }
      }

    };
  }*/
});
