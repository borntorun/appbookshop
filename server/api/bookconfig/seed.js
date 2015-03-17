/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
var Book = require('./bookconfig.model');
console.log('seeding book config...');
Book.find({}).remove(function () {
  Book.create(
    {
      labels: {
        title: "Título",
        authors: "Autor",
        subject: "Assunto",
        editionNumber: "Nº de edição",
        editionYear: "Ano",
        editionLanguage: "Idioma",
        editionCountry: "País",
        editionPublisher: "Editora",
        editionTranslatedLanguage: "Traduzido do",
        editionCountryFirstPublisher: "Editora da 1ª edição",
        editionYearCountryFirstEdition: "Ano da 1ª edição",
        nameCollection: "Colecção",
        numCollection: "Nº na Colecção",
        originalLanguage: "Idioma original",
        originalTitle: "Título riginal",
        originalPublisher: "Editora original",
        originalYearFirstEdition: "Ano da 1ª edição original",
        translators: "Tradução por",
        prefaceBy: "Prefácio de",
        postfaceBy: "Posfácio de",
        graphicalPrint: "Impressão Gráfica",
        cover: "Capa",
        images: "Imagens",
        workmanship: "Acabamento",
        pagesNum: "Nº de Páginas",
        priceInitial: "Preço Inicial",
        priceCost: "Preço de Custo",
        price: "Preço",
        buyAt: "Local de Compra",
        isbn: "ISBN",
        legalDeposit: "Depósito Legal",
        circulation: "Tiragem",
        keywords: "Palavras-Chave",
        archive: "Localização Arquivo",
        condition: "Condição",
        lendingTo: "Empréstimo",
        obs: "Observações",
        corrector: "Corrector",
        subtitle: "Sub-Título",
        dimensions: "Dimensões",
        weight: "Peso",
        numVolume: "Nº de Volumes",
        qt: "Quantidade",
        categories: "Categorias",
        template: "Template"
      }
    }
  );
});
