'use strict';
var config = require('../../config/environment');
var Schema = require('mongoose').Schema;
var BookSchema = new Schema({
  reference: { type: Number },
  title: { type: String },
  authors: { type: [String] },
  subject: { type: String },
  editionNumber: { type: String },
  editionYear: { type: String },
  editionLanguage: { type: String },
  editionCountry: { type: String },
  editionPublisher: { type: String },
  editionTranslatedLanguage: { type: String },
  editionCountryFirstPublisher: { type: String },
  editionYearCountryFirstEdition: { type: String },
  editionISBN: { type: String },
  originalLanguage: { type: String },
  originalTitle: { type: String },
  originalPublisher: { type: String },
  originalYearFirstEdition: { type: String },
  originalCountryEdition: { type: String },
  nameCollection: { type: String },
  numCollection: { type: Number },
  translators: { type: [String] },
  prefaceBy: { type: [String] },
  postfaceBy: { type: [String] },
  graphicalPrint: { type: String },
  cover: { type: String },
  images: { type: [String] },
  workmanship: { type: String },
  pagesNum: { type: Number },
  priceInitial: { type: Number },
  priceCost: { type: Number },
  price: { type: Number },
  buyAt: { type: String },
  editionLegalDeposit: { type: String },
  circulation: { type: Number },
  keywords: { type: [String] },
  archive: { type: String },
  condition: { type: String },
  lendingTo: { type: String },
  obs: { type: [String] },
  obsInternal: { type: String },
  corrector: { type: [String] },
  subtitle: { type: String },
  dimensions: { type: String },
  weight: { type: String },
  numVolume: { type: String },
  qt: { type: Number },
  categories: { type: [String] },
  isNewBook: { type: Boolean },
  isFeatured: { type: Boolean },
  isPromotion: { type: Boolean },
  isRare: { type: Boolean },
  isUnique: { type: Boolean },
  isValuable: { type: Boolean },
  sellOnline: { type: Boolean },
  sellPresencial: { type: Boolean },
  qtStore: { type: Number },
  qtSold: { type: Number },
  discounts: { type: [Schema.Types.Mixed] },
  taxes: { type: [Schema.Types.Mixed] },
  template: { type: String },
  dateResgistration: { type: Date, default: Date.now },
  dateUpdate: { type: Date, default: Date.now }
});

BookSchema.path('title').required(true, 'Título é obrigatório.');

module.exports = config.mongo.books.connection.model('Book', BookSchema);


//em destaque à entrada no site
//  isFeatured: true

//novidades
//  isNewBook: true && dateResgistration > Date.Now - 30dias

//disponivel para compra no site
//  sellOnline: true

//disponivel para encomenda para compra presencial
//  sellPresencial: true
