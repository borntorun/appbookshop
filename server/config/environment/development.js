'use strict';
// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    books: {
      uri: 'mongodb://192.168.99.21/appBooks-books-dev',
      //uri: 'mongodb://192.168.40.1/appBooks-books-dev',
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
  appPath: 'client'
};
