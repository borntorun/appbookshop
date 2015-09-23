'use strict';
// Production specific configuration
// =================================
var mongolabUri;
if (process.env.dbuser && process.env.dbpassword && process.env.dbresource) {
  mongolabUri = 'mongodb://' +
    process.env.dbuser + ':' +
    process.env.dbpassword +
    process.env.dbresource;
}
module.exports = {
  // Server IP
  ip: process.env.OPENSHIFT_NODEJS_IP || process.env.IP || undefined,
  // Server port
  port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080,
  // MongoDB connection options
  mongo: {
    library: {
      uri: mongolabUri/*process.env.MONGOLAB_URI*/ ||
        process.env.MONGOHQ_URL ||
        process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME ||
        'mongodb://192.168.40.25/appBooks-books-dev',
      options: {}
    }
  },
  appPath: 'public'
};
