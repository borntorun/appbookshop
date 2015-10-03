'use strict';
var config = require('../../config/environment');
var util = require('../../util');
var Schema = require('mongoose').Schema;
var BookSchema = new Schema({
  reference: { type: Number },
  title: { type: String },
  slug: { type: String },
  authors: { type: [String] },
  subject: { type: String },
  editionNumber: { type: Number },
  editionYear: { type: Number },
  editionLanguage: { type: String },
  editionCountry: { type: String },
  editionPublisher: { type: String },
  editionTranslatedLanguage: { type: String },
  editionCountryFirstPublisher: { type: String },
  editionYearCountryFirstEdition: { type: Number },
  editionISBN: { type: String },
  originalLanguage: { type: String },
  originalTitle: { type: String },
  originalPublisher: { type: String },
  originalYearFirstEdition: { type: Number },
  originalCountryEdition: { type: String },
  nameCollection: { type: String },
  numCollection: { type: String },
  translators: { type: [String] },
  prefaceBy: { type: [String] },
  postfaceBy: { type: [String] },
  graphicalPrint: { type: String },
  cover: { type: String },
  images: { type: [String] },
  workmanship: { type: String },
  pagesNum: { type: String },
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
  correctors: { type: [String] },
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
var table = require('../tables/tables.model');
var getSlug = require('speakingurl');

BookSchema.path('title').required(true, 'Título é obrigatório.');

BookSchema.pre('save', function( next ) {

  try {

    this.dateUpdate = Date.now();

    this.slug = getSlug(this.title, {uricNoSlash: true, custom: {
      '&': '-e-',
      '$': '-cifr-',
      '#': '-card-',
      '%': '-perc-'
    }});

  } catch( e ) {

    next(e);
  }
  next();
});

BookSchema.post('save', function( /*doc*/ ) {

  function addItem( Model, item ) {
    Model.find({'name': item}, function( err, data ) {
      if ( data.length == 0 ) {
        new Model({'name': item})
          .save(function( err, data ) {
            //console.log('after :------------------------:', data);
          });
      }
    });
  }

  function processItem( Model ) {
    return function( item ) {
      addItem(Model, item);
    };
  }

  function processField( Model, value ) {
    if ( value ) {
      if ( util.isArray(value) && value.length > 0 ) {
        value.forEach(processItem(Model));
      }
      else {
        processItem(Model)(value);
      }
    }
  }

  processField(table('author'), this.authors);
  processField(table('author'), this.prefaceBy);
  processField(table('author'), this.postfaceBy);
  processField(table('author'), this.correctors);
  processField(table('publisher'), this.editionPublisher);
  processField(table('language'), this.editionLanguage);
  processField(table('country'), this.editionCountry);
  processField(table('category'), this.categories);
  processField(table('keyword'), this.keywords);
  processField(table('translator'), this.translators);
  processField(table('language'), this.editionTranslatedLanguage);
  processField(table('publisher'), this.editionCountryFirstPublisher);
  processField(table('publisher'), this.originalPublisher);
  processField(table('language'), this.originalLanguage);
  processField(table('country'), this.originalCountryEdition);

});

module.exports = config.mongo.library.connection.model('Book', BookSchema);

//em destaque à entrada no site
//  isFeatured: true

//novidades
//  isNewBook: true && dateResgistration > Date.Now - 30dias

//disponivel para compra no site
//  sellOnline: true

//disponivel para encomenda para compra presencial
//  sellPresencial: true
