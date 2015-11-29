/**
 * Created by Joao Carvalho on 23-09-2015.
 */
'use strict'

//require('./config/databases/seed');
//require('./api/book/seed');

var seedArray = [];

//seedArray.push('api/bookconfig/seed');
seedArray.push('api/appconfig/message/seed');
seedArray.push('api/appconfig/book/seed');

seedArray.push('api/category/seed');
seedArray.push('api/publisher/seed');
seedArray.push('api/country/seed');
seedArray.push('api/language/seed');
seedArray.push('api/keyword/seed');
seedArray.push('api/author/seed');
seedArray.push('api/translator/seed');

module.exports = seedArray;

