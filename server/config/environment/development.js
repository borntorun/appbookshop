"use strict";
// Development specific configuration
// ==================================

//"1appB00KshopK#bia|999dEw0" +
        

module.exports = {
  // MongoDB connection options
  mongo: {
    library: {
      //x uri: 'mongodb://192.168.100.2/appBooks-books-dev',
      //uri: 'mongodb://192.168.40.25/appBooks-books-dev',
      //uri: 'mongodb://192.168.40.25/appbookshop',

      uri:
        "mongodb://" +
        "jt" +
        ":" +
        "jt1999" +
        "@ds041494.mongolab.com:41494/appbookshop-demo",

      options: {
        // db: {
        //   safe: true
        // }
      },
    },
    // orders: {
    //   uri: '',
    //   options: {
    //     db: {
    //       safe: true
    //     }
    //   }
    // }
  },
  //x seedDB: true,
  appPath: "client",
  domainUrl: "http://local.host:12999",
};
