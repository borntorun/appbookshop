// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function() {
  return {
    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['mocha', 'chai', 'chai-things', 'sinon-chai'],

    // list of files / patterns to load in the browser
    files: [
      'client/bower_components/jquery/dist/jquery.js',
      'client/bower_components/angular/angular.js',

      'client/bower_components/angular-cookies/angular-cookies.js',
      'client/bower_components/angular-resource/angular-resource.js',
      'client/bower_components/angular-animate/angular-animate.js',
      'client/bower_components/angular-sanitize/angular-sanitize.js',
      'client/bower_components/toastr/toastr.js',
      'client/bower_components/bootstrap/dist/js/bootstrap.js',
      'client/bower_components/moment/moment.js',
      'client/bower_components/angular-ui-router/release/angular-ui-router.js',
      'client/bower_components/extras.angular.plus/ngplus-overlay.js',
      'client/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'client/bower_components/typeahead.js/dist/typeahead.bundle.js',
      'client/bower_components/js-signals/dist/signals.js',
      'client/bower_components/angular-jssignals/dist/angular-jssignals.js',
      'client/bower_components/q/q.js',
      'client/bower_components/angular-typeaheadjs/dist/angular-typeaheadjs.js',
      'client/bower_components/lodash/lodash.js',
      'client/bower_components/localforage/dist/localforage.js',
      'client/bower_components/localforage-sessionstoragewrapper/src/localforage-sessionstoragewrapper.js',
      'client/bower_components/simple-basket/dist/simplebasket.js',
      'client/bower_components/simple-basket/dist/plugins/storage-localforage.js',
      'client/bower_components/ui-router-extras/release/ct-ui-router-extras.js',
      'client/bower_components/angular-dynamic-layout/dist/angular-dynamic-layout.js',
      'client/bower_components/jquery_appear/jquery.appear.js',

      'client/app/app.module.js',
      'client/app/**/*.module.js',//must be specified like this: because name includes more than one '.'
      'client/app/**/*.config.js',
      'client/app/**/**.js',

      'client/app/**/*.jade',

      //      '.tmp/app/app.css',
      //      '.tmp/app/**/*.html',

      'node_modules/chai/chai.js',
      'test/lib/chai-should.js',
      'test/lib/chai-expect.js',
      'test/lib/libWait.js'

    ],

    reporters: ['mocha'],

    preprocessors: {
      '**/*.jade': 'ng-jade2js'
      //      ,
      //      '**/*.html': 'html2js',
      //      '**/*.coffee': 'coffee'
    },

    //    ngHtml2JsPreprocessor: {
    //      stripPrefix: 'client/'
    //    },
    //
    ngJade2JsPreprocessor: {
      stripPrefix: 'client/',
      moduleName: 'jadetemplates'
    },

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,
    hostname: 'localhost',

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS2'],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    // reporter options
    mochaReporter: {
      colors: {
        success: 'green',
        info: 'white',
        warning: 'bgcyan',
        error: 'red'
      }
    },
    /*specReporter: {
      suppressPassed: false,
      suppressSkipped: true
    },*/
    plugins: [
      'karma-phantomjs2-launcher',
      'karma-chrome-launcher',
      'karma-mocha',
      //      'karma-spec-reporter',
      'karma-mocha-reporter',
      'karma-chai-plugins',
      'karma-ng-jade2js-preprocessor'
    ]
  };
};
