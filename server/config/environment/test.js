'use strict';
// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  mongo: {
    library: {
      uri: 'mongodb://192.168.99.21/appBooks-books-test',
      options: {}
    },
    orders: {
      uri: '',
      options: {}
    }
  },
  appPath: 'client'
};
