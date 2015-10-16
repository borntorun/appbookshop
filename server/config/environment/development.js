'use strict';
// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    library: {
      uri: 'mongodb://192.168.40.25/appBooks-books-dev',
      //uri: 'mongodb://192.168.40.25/appbookshop',
      options: {
        db: {
          safe: true
        }
      }
    },
    orders: {
      uri: '',
      options: {
        db: {
          safe: true
        }
      }
    }
  },
  seedDB: true,
  appPath: 'client',
  domainUrl: 'http://local.host:12999'
};
