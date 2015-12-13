var sharedConfig = require('./karma-shared.conf');

module.exports = function(config) {
  var conf = sharedConfig();

  // level of logging
  // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
  conf.logLevel = /*config.LOG_INFO;//*/config.LOG_DEBUG;

  conf.files = conf.files.concat([


    //extra testing code
    'client/bower_components/angular-mocks/angular-mocks.js',

    //mocha stuff
    'test/mocha.conf.js',

    //my stuff
    'test/client/unit/mocks.js',
    //test files
    'test/client/unit/modules/**/*_Spec.js',
    'test/client/unit/services/**/*_Spec.js',
    'test/client/unit/directives/**/*_Spec.js',
    'test/client/unit/controllers/**/*_Spec.js'
  ]);



  config.set(conf);
};
