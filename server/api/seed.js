/**
 * Created by Joao Carvalho on 23-09-2015.
 */
'use strict'

//require('./config/databases/seed');
//require('./api/book/seed');

var seedArray = [];

seedArray.push({file:'api/appconfig/message/seed'});
seedArray.push({file:'api/appconfig/book/seed'});

seedArray.push({file:'api/category/seed', env: 'development'});
seedArray.push({file:'api/publisher/seed', env: 'development'});
seedArray.push({file:'api/country/seed', env: 'development'});
seedArray.push({file:'api/language/seed', env: 'development'});
seedArray.push({file:'api/keyword/seed', env: 'development'});
seedArray.push({file:'api/author/seed', env: 'development'});
seedArray.push({file:'api/translator/seed', env: 'development'});

module.exports = seedArray;

