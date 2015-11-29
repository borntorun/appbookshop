'use strict';

describe.only('Unit: \'booksearchResultsCtrl\' Controller', function() {
  var $controller, $scope, $httpBackend, $cacheFactory;
  var bookConfig;
  var requestSearchHandler;

  beforeEach(module('appBookShop'));
  beforeEach(module('jadetemplates'));
  //  beforeEach(module(function($provide) {
  //    $provide.service('bookinfo', {
  //      search: {
  //        limitDefault: 25,
  //        limitFeatured: 25,
  //        viewportDefault: 75
  //      },
  //      placeholders: {
  //        reference: 'referência',
  //        title: 'título do livro',
  //        authors: 'autor ou autores do livro',
  //        subject: 'assunto',
  //        editionNumber: 'nº edição',
  //        editionYear: '1500-actual',
  //        editionLanguage: 'idioma',
  //        editionCountry: 'país',
  //        editionPublisher: 'editora',
  //        editionTranslatedLanguage: 'Traduzido do',
  //        editionCountryFirstPublisher: 'Editora da 1ª edição',
  //        editionYearCountryFirstEdition: 'Ano da 1ª edição',
  //        editionISBN: 'ISBN',
  //        originalLanguage: 'Idioma',
  //        originalTitle: 'Título',
  //        originalPublisher: 'Editora',
  //        originalYearFirstEdition: 'Ano',
  //        originalCountryEdition: 'País',
  //        nameCollection: 'Colecção',
  //        numCollection: 'Nº na colecção',
  //        translators: 'Tradução por',
  //        prefaceBy: 'Prefácio de',
  //        postfaceBy: 'Posfácio de',
  //        graphicalPrint: 'Impressão Gráfica',
  //        cover: 'Capa',
  //        images: 'Imagens',
  //        workmanship: 'Acabamento',
  //        pagesNum: 'NºPág',
  //        priceInitial: 'Preço Inicial',
  //        priceCost: 'Preço de Custo',
  //        price: 'Preço',
  //        buyAt: 'Local de Compra',
  //        editionLegalDeposit: 'Depósito Legal',
  //        circulation: 'Tiragem',
  //        keywords: 'Palavras-Chave',
  //        archive: 'Localização Arquivo',
  //        condition: 'Condição',
  //        lendingTo: 'Empréstimo',
  //        obs: 'Observações (internet)',
  //        obsInternal: 'Observações',
  //        correctors: 'Correctores',
  //        subtitle: 'Sub-Título',
  //        dimensions: 'Dimensões',
  //        weight: 'Peso',
  //        numVolume: 'NºVol',
  //        qt: 'Quantidade',
  //        categories: 'Categorias',
  //        template: 'Template',
  //        dateResgistration: 'Data de Registo',
  //        dateUpdate: 'Data de Modificação'
  //      },
  //      labels: {
  //        reference: 'Nº / Refª',
  //        title: 'Título',
  //        authors: 'Autor',
  //        subject: 'Assunto',
  //        editionNumber: 'Nº edição',
  //        editionYear: 'Ano',
  //        editionLanguage: 'Idioma',
  //        editionCountry: 'País',
  //        editionPublisher: 'Editora',
  //        editionTranslatedLanguage: 'Traduzido do',
  //        editionCountryFirstPublisher: 'Editora 1ª edição',
  //        editionYearCountryFirstEdition: 'Ano 1ª edição',
  //        editionISBN: 'ISBN',
  //        originalLanguage: 'Idioma',
  //        originalTitle: 'Título',
  //        originalPublisher: 'Editora',
  //        originalYearFirstEdition: 'Ano',
  //        originalCountryEdition: 'País',
  //        nameCollection: 'Colecção',
  //        numCollection: 'Nº',
  //        translators: 'Tradução por',
  //        prefaceBy: 'Prefácio de',
  //        postfaceBy: 'Posfácio de',
  //        graphicalPrint: 'Impressão Gráfica',
  //        cover: 'Capa',
  //        images: 'Imagens',
  //        workmanship: 'Acabamento',
  //        pagesNum: 'NºPág',
  //        priceInitial: 'Preço Inicial',
  //        priceCost: 'Preço de Custo',
  //        price: 'Preço',
  //        buyAt: 'Local de Compra',
  //        editionLegalDeposit: 'Depósito Legal',
  //        circulation: 'Tiragem',
  //        keywords: 'Palavras-Chave',
  //        archive: 'Localização Arquivo',
  //        condition: 'Condição',
  //        lendingTo: 'Empréstimo',
  //        obs: 'Observações (internet)',
  //        obsInternal: 'Observações',
  //        correctors: 'Correctores',
  //        subtitle: 'Sub-Título',
  //        dimensions: 'Dimensões',
  //        weight: 'Peso',
  //        numVolume: 'NºVol',
  //        qt: 'Qt.',
  //        categories: 'Categorias',
  //        isNewBook: 'É novo',
  //        isFeatured: 'Em destaque',
  //        isPromotion: 'Em promoção',
  //        isRare: 'É raro',
  //        isUnique: 'É único',
  //        isValuable: 'É valioso',
  //        sellOnline: 'Venda na internet',
  //        sellPresencial: 'Venda em mão',
  //        qtStore: 'Qt. em loja',
  //        qtSold: 'Qt. vendida',
  //        discounts: 'Desconto',
  //        taxes: 'Taxa',
  //        template: 'Template',
  //        dateResgistration: 'Data de Registo',
  //        dateUpdate: 'Data de Modificação'
  //      },
  //      valMessages: {
  //        'title': {'required': 'o título é obrigatório'},
  //        'editionYear': {'invalid': 'ano entre 1500-Ano actual'},
  //        'originalYearFirstEdition': {'invalid': 'ano entre 1500-Ano actual'},
  //        'editionNumber': {'invalid': 'valor inválido'},
  //        'circulation': {'invalid': 'valor inválido'},
  //        'editionISBN': {'invalid': 'ISBN inválido'},
  //        'price': {'invalid': 'valor inválido'},
  //        'priceInitial': {'invalid': 'valor inválido'},
  //        'priceCost': {'invalid': 'valor inválido'},
  //        'qt': {'invalid': 'valor inválido'},
  //        'qtSold': {'invalid': 'valor inválido'},
  //        'qtStore': {'invalid': 'valor inválido'}
  //      }
  //
  //    });
  //  }));

  beforeEach(inject(function( _$rootScope_, _$controller_, _$httpBackend_, _$cacheFactory_ ) {
    $controller = _$controller_;
    $scope = _$rootScope_.$new();
    $httpBackend = _$httpBackend_;
    $cacheFactory = _$cacheFactory_;
  }));

  beforeEach(function() {
    requestSearchHandler = httpBackendDefinitions();
  });

  afterEach(httpBackendVerifyNoOutstanding);

  it('should ....', function( done ) {
    requestSearchHandler.respond([
      {title: 'um'}
    ]);

    var booksearchResultsCtrl = $controller('BookSearchResultsCtrl', {
      $scope: $scope,
      bookConfig: getBookConfig()});

    $httpBackend.flush();
    //dump($scope);

    waitsForAndThenRun(null, function() {
      dump(booksearchResultsCtrl);
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
    $httpBackend.when('GET', '/api/appconfig/book/').respond(200, null);
    $httpBackend.when('GET', '/api/appconfig/message/').respond(200, null);

    //this is the definition for the tests
    return $httpBackend.when('GET', /^\/api\/books\/search\/(free|advanced)\/*./);
  }

  //mocks
  function getBookConfig() {
    return {
      search: {
        limitDefault: 25,
        limitFeatured: 25,
        viewportDefault: 75
      }
    };
  }
});
