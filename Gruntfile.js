// Generated on 2015-01-24 using generator-angular-fullstack 2.0.13
'use strict';
module.exports = function( grunt ) {
  //console.log(__dirname);
  var localConfig;
  try {
    localConfig = require('./server/config/local.env');
  } catch( e ) {
    localConfig = {};
  }
  // Load grunt tasks automatically, when needed
  require('jit-grunt')(grunt, {
    express: 'grunt-express-server',
    useminPrepare: 'grunt-usemin',
    ngtemplates: 'grunt-angular-templates',
    /*cdnify: 'grunt-google-cdn',*/
    protractor: 'grunt-protractor-runner',
    injector: 'grunt-asset-injector',
    replace: 'grunt-text-replace',
    releasebuild: 'grunt-release-build'
  });
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);
  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    pkg: grunt.file.readJSON('package.json'),
    yeoman: {
      // configurable paths
      client: require('./bower.json').appPath || 'client',
      server: 'server',
      dist: 'dist',
      ip: '192.168.40.25',
      port: '12999'
    },
    express: {
      options: {
        port: process.env.PORT || '<%= yeoman.port %>'
      },
      dev: {
        options: {
          script: 'server/app.js',
          debug: true
        }
      },
      prod: {
        options: {
          script: 'dist/server/app.js'
        }
      }
    },
    open: {
      server: {
        url: 'http://<%= yeoman.ip %>:<%= express.options.port %>'
      }
    },
    //config to debug
    //para evitar concatenar certos files return ''
//    concat: {
//
//      options: {
//        process: function( src, filepath ) {
//          //grunt.log.ok(filepath)
//
//          //para evitar concatenar certos files return ''
//          //if (filepath.indexOf('/app/auth/')>-1){
//          if ( filepath.indexOf('/app/') > -1 && filepath.indexOf('.css') === -1 ) { //não é css
//            //grunt.log.ok(filepath);
//            return '';
//          }
//          grunt.log.ok(filepath);
//          return src;
//        }
//      }
//
//    },
    watch: {
      /*
      Inject js files in index.html
      (exclude tests/mocks/app.module.js (main module)
      */
      injectJS: {
        files: [
          '<%= yeoman.client %>/{app,components}/**/*.module.js',
          '<%= yeoman.client %>/{app,components}/**/*.constants.js',
          '<%= yeoman.client %>/{app,components}/**/*.config.js',
          '<%= yeoman.client %>/{app,components}/**/*.js',
          '!<%= yeoman.client %>/{app,components}/**/*.spec.js',
          '!<%= yeoman.client %>/{app,components}/**/*.mock.js',
          '!<%= yeoman.client %>/app/app.module.js'],
        tasks: ['injector:scripts']
      },
      /*
      Inject css
      */
      injectCss: {
        files: [
          '<%= yeoman.client %>/{app,components}/**/*.css'
        ],
        tasks: ['injector:css']
      },
      //mochaTest: {
      //  files: ['server/**/*.spec.js'],
      //  tasks: ['env:test', 'mochaTest']
      //},
      //      jsTest: {
      //        files: [
      //          '<%= yeoman.client %>/{app,components}/**/*.spec.js',
      //          '<%= yeoman.client %>/{app,components}/**/*.mock.js'
      //        ],
      //        tasks: ['newer:jshint:all'/*, 'karma'*/]
      //      },
      injectLess: {
        files: [
          '<%= yeoman.client %>/{app,components}/**/*.less'],
        tasks: ['injector:less']
      },
      less: {
        files: [
          '<%= yeoman.client %>/{app,components}/**/*.less'],
        tasks: ['less', 'autoprefixer']
      },
      jade: {
        files: [
          '<%= yeoman.client %>/{app,components}/*',
          '<%= yeoman.client %>/{app,components}/**/*.jade'],
        tasks: ['jade']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        files: [
          'index.html',
          '{.tmp,<%= yeoman.client %>}/{app,components}/**/*.css',
          '{.tmp,<%= yeoman.client %>}/{app,components}/**/*.html',
          '{.tmp,<%= yeoman.client %>}/{app,components}/**/*.js',
          '!{.tmp,<%= yeoman.client %>}{app,components}/**/*.spec.js',
          '!{.tmp,<%= yeoman.client %>}/{app,components}/**/*.mock.js',
          '<%= yeoman.client %>/assets/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.client %>/assets/data/**/*',
          '<%= yeoman.client %>/assets/templates/**/*'
        ],
        options: {
          livereload: true
        }
      },
      testserver: {
        files: [
          'server/**/*.{js,json}'
        ],
        tasks: ['test:server']
      },
      express: {
        files: [
          'server/**/*.{js,json}'
        ],
        tasks: ['express:dev', 'wait'],
        options: {
          livereload: true,
          nospawn: true //Without this option specified express won't be reloaded
        }
      },
      jshintclient: {
        files: [
          '<%= yeoman.client %>/app/**/*.js'],
        tasks: ['hintclient']
      },
      jshintserver: {
        files: [
          '<%= yeoman.server %>/**/*.js'],
        tasks: ['hintserver']
      }
    },
    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      client: {
        options: {
          jshintrc: '<%= yeoman.client %>/.jshintrc'
        },
        src: [
          '<%= yeoman.client %>/app/**/*.js',
          '!<%= yeoman.client %>/app/**/*.spec.js'
        ]
      },
      server: {
        options: {
          jshintrc: '<%= yeoman.server %>/.jshintrc'
        },
        src: [
          '<%= yeoman.server %>/**/*.js',
          '!<%= yeoman.server %>/**/*.spec.js'
        ]
      },
      clientTest: {
        options: {
          jshintrc: '<%= yeoman.client %>/.jshintrc'
        },
        src: ['<%= yeoman.client %>/**/*.spec.js']
      },
      serverTest: {
        options: {
          jshintrc: '<%= yeoman.server %>/.jshintrc-spec'
        },
        src: ['<%= yeoman.server %>/**/*.spec.js']
      }
      //      ,all: [
      //        '<%= yeoman.client %>/{app,components}/**/*.js',
      //        '<%= yeoman.server %>/**/*.js',
      //        '!<%= yeoman.client %>/{app,components}/**/*.spec.js',
      //        '!<%= yeoman.client %>/{app,components}/**/*.mock.js'
      //      ],
      //      test: {
      //        src: [
      //          '<%= yeoman.client %>/{app,components}/**/*.spec.js', '<%= yeoman.client %>/{app,components}/**/*.mock.js'
      //        ]
      //      }
    },
    /*
    Clean folders
    .tmp
    dist (except .git Procfile ...)
    */
    clean: {
      dist: {
        files: [
          {
            dot: true,
            src: [
              '.tmp',
              '<%= yeoman.dist %>/*',
              '!<%= yeoman.dist %>/.gitignore',
              '!<%= yeoman.dist %>/.git*',
              '!<%= yeoman.dist %>/deployheroku.sh',
              '!<%= yeoman.dist %>/copydemoheroku.sh',
              '!<%= yeoman.dist %>/Procfile',
              '!<%= yeoman.dist %>/demoheroku',
              '!<%= yeoman.dist %>/demo*',
              '!<%= yeoman.dist %>/.openshift'
            ]
          }
        ]
      },
      server: '.tmp'
    },
    // Add vendor prefixed styles
    /*TODO: autoprefixer has been deprecated, see https://github.com/nDmitry/grunt-postcss to study replacement*/
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: '.tmp/',
            src: '{,*/}*.css',
            dest: '.tmp/'
          }
        ]
      }
    },
    // Debugging with node inspector
    'node-inspector': {
      custom: {
        options: {
          'web-host': '192.168.40.25',
          //'hidden': ['node_modules'],
          'debug-brk': ''
        }
      }
    },
    // Use nodemon to run server in debug mode with an initial breakpoint
    nodemon: {
      debug: {
        script: 'server/app.js',
        options: {
          nodeArgs: ['--debug-brk'],
          env: {
            PORT: process.env.PORT || '<%= yeoman.port %>'
          },
          callback: function( nodemon ) {
            nodemon.on('log', function( event ) {
              console.log(event.colour);
            });
            console.log('Point to http://' + '<%= yeoman.ip %>' + ':8888/debug?port=5858');
            // opens browser on initial server start
            /*
            nodemon.on('config:update', function () {
              setTimeout(function () {
                require('open')('http://<%= yeoman.ip %>:8888/debug?port=5858');
              }, 500);
            });
            */
          }
        }
      },
      dev: {
        script: 'server/app.js',
        options: {
          cwd: __dirname,
          ignore: ['node_modules/'],
          ext: 'js,json',
          watch: ['./server'],
          delay: 1000
        }
      }
    },
    /*
    Automatically inject Bower components into the app
    inject into index.html
    */
    wiredep: {
      target: {
        //new src: '<%= yeoman.client %>/index.html',
        src: 'index.html',
        ignorePath: '<%= yeoman.client %>/',
        //TODO: analize why json3 and es5-shim are being excluded
        exclude: [/bootstrap-sass-official/, '/json3/', '/es5-shim/', /bootstrap.css/, /font-awesome.css//*, /ct-ui-router-extras.js/*/ ]

      }
    },

    /*
    Renames files for browser caching purposes
    */
    rev: {
      dist: {
        options: {
          dot: true
        },
        files: {
          src: [
            '<%= yeoman.dist %>/public/{,*/}*.js',
            '!<%= yeoman.dist %>/public/**/Lettering.js',//exclude folder Lettering.js (because dot on name) but not files inside it
            '<%= yeoman.dist %>/public/{,*/}*.css'
            //'<%= yeoman.dist %>/public/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            //'<%= yeoman.dist %>/public/assets/fonts/*',
            //'!<%= yeoman.dist %>/public/assets/data/*' //exclude other data files that we need to preserve name
          ]
        }
      }
    },
    /*
    Reads HTML for usemin blocks to enable smart builds that automatically
    concat, minify and revision files. Creates configurations in memory so
    additional tasks can operate on them
    */
    useminPrepare: {
      //new html: ['<%= yeoman.client %>/index.html'],
      html: ['index.html'],
      //
      options: {
        dest: '<%= yeoman.dist %>/public'
        //dest: '<%= yeoman.dist %>'
      }
    },
    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      //new html: ['<%= yeoman.dist %>/public/{,*/}*.html'],
      html: ['<%= yeoman.dist %>/index.html', '<%= yeoman.dist %>/public/{,*/}*.html'],

      css: ['<%= yeoman.dist %>/public/{,*/}*.css'],
      js: [
        '<%= yeoman.dist %>/public/{,*/}*.js',
        '!<%= yeoman.dist %>/public/**/Lettering.js'],
      options: {
        assetsDirs: [
          '<%= yeoman.dist %>/public',
          '<%= yeoman.dist %>/public/assets/images'
        ],
        // This is so we update image references in our ng-templates
        patterns: {
          js: [
            [/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
          ]
        }
      }
    },
    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.client %>/assets/images',
            src: '{,*/}*.{png,jpg,jpeg,gif}',
            dest: '<%= yeoman.dist %>/public/assets/images'
          }
        ]
      }
    },
    svgmin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.client %>/assets/images',
            src: '{,*/}*.svg',
            dest: '<%= yeoman.dist %>/public/assets/images'
          }
        ]
      }
    },
    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    //https://github.com/mzgol/grunt-ng-annotate
    ngAnnotate: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '.tmp/concat',
            src: '*/**.js',
            dest: '.tmp/concat'
          }
        ]
      }
    },
    /*
    Package all the html partials into a single javascript payload
    All templates html (generated from jade) are included
    */
    ngtemplates: {
      options: {
        // This should be the name of your apps angular module
        module: 'appBookShop',//'app',
        htmlmin: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        },
        //new usemin: 'app/app.module.js'
        usemin: 'app/app.js' /* THIS must match what is in THE TAG build:js in index.html <!-- build:js ... app/app.js -->*/
      },
      main: {
        cwd: '<%= yeoman.client %>',
        src: [
          '{app,components}/**/*.html',
          '!devresources/dynamicstyles.html' //no need to include this 'dummy' file (used for task 'uncss')
        ],
        dest: '.tmp/templates.js'
      },
      tmp: {
        cwd: '.tmp',
        src: [
          '{app,components}/**/*.html',
          '!devresources/dynamicstyles.html' //no need to include this 'dummy' file (used for task 'uncss')
        ],
        dest: '.tmp/tmp-templates.js'
      }
    },
    // Replace Google CDN references
    /*cdnify: {
      dist: {
        //new html: ['<%= yeoman.dist %>/public*//*.html']
        html: ['<%= yeoman.dist %>/index.html','<%= yeoman.dist %>/public*//*.html']
      }
    },*/
    // Copies remaining files to places other tasks can use
    copy: {
      //debug
      debugappfiles: {
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.client %>',
            dest: '<%= yeoman.dist %>/public/app/appfiles',
            src: [
              'app/**/*.js'
            ]
          }
        ]
      },
      debugbowerfiles: {
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.client %>',
            dest: '<%= yeoman.dist %>/public/app',
            src: [
              'bower_components/jquery/dist/jquery.js',
              'bower_components/angular/angular.js',
              'bower_components/toastr/toastr.js',
              'bower_components/bootstrap/dist/js/bootstrap.js',
              'bower_components/moment/moment.js',
              'bower_components/angular-ui-router/release/angular-ui-router.js',
              'bower_components/angular-animate/angular-animate.js',
              'bower_components/angular-sanitize/angular-sanitize.js',
              'bower_components/extras.angular.plus/ngplus-overlay.js',
              'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
              'bower_components/angular-cookies/angular-cookies.js',
              'bower_components/angular-resource/angular-resource.js',
              'bower_components/typeahead.js/dist/typeahead.bundle.js',
              'bower_components/js-signals/dist/signals.js',
              'bower_components/angular-jssignals/dist/angular-jssignals.js',
              'bower_components/q/q.js',
              'bower_components/angular-typeaheadjs/dist/angular-typeaheadjs.js',
              'bower_components/lodash/lodash.js',
              'bower_components/localforage/dist/localforage.js',
              'bower_components/localforage-sessionstoragewrapper/src/localforage-sessionstoragewrapper.js',
              'bower_components/simple-basket/dist/simplebasket.js',
              'bower_components/simple-basket/dist/plugins/storage-localforage.js',
              'bower_components/ui-router-extras/release/ct-ui-router-extras.js',
              'bower_components/d3/d3.js',
              'bower_components/angular-dynamic-layout/dist/angular-dynamic-layout.js'
            ]
          }
        ]
      },
      dist: {
        files: [
          /*
          Copy files to dist/public
           */
          {
            expand: true,
            dot: true,
            cwd: '<%= yeoman.client %>',
            dest: '<%= yeoman.dist %>/public',
            src: [
              '*.{ico,png,txt}',
              '.htaccess',
              //'bower_components/**/*',
              'assets/images/{,*/}*.{webp}',
              'assets/fonts/**/*',
              'assets/data/**/*',
              'assets/templates/html/*.html'//,
              //new 'index.html'
            ]
          },
          /*
          Copy files to dist/public/assets/images
           */
          {
            expand: true,
            cwd: '.tmp/images',
            dest: '<%= yeoman.dist %>/public/assets/images',
            src: ['generated/*']
          },
          /*
          Copy root files to dist (includes index.html)
           */
          {
            expand: true,
            dest: '<%= yeoman.dist %>',
            src: [
              'package.json',
              'server/**/*',
              //new
              'index.html'
            ]
          }
        ]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.client %>',
        dest: '.tmp/',
        src: ['{app,components}/**/*.css']
      }
    },
    // Run some tasks in parallel to speed up the build process
    concurrent: {

      server: {
        tasks: ['jade', 'less', 'hintall' ],
        options: {
          logConcurrentOutput: true,
          limit: 3
        }
      },
      test: [
        'jade', 'less', ],
      debug: {
        tasks: [
          'nodemon', 'node-inspector'
        ],
        options: {
          logConcurrentOutput: true
        }
      },
      dist: [
        'jade', 'less', 'hintall', 'imagemin', 'svgmin'
      ]
    },
    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    mochaTest: {
      options: {
        reporter: 'spec'
      },
      src: ['server/**/*.spec.js']
    },
    protractor: {
      options: {
        configFile: 'protractor.conf.js'
      },
      chrome: {
        options: {
          args: {
            browser: 'chrome'
          }
        }
      }
    },
    env: {
      test: {
        NODE_ENV: 'test'
      },
      prod: {
        NODE_ENV: 'production'
      },
      all: localConfig
    },
    // Compiles Jade to html
    jade: {
      /*
      Compile templates
      */
      compile: {
        options: {
          data: {
            debug: false
          }
        },
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.client %>',
            src: [
              '{app,components,devresources}/**/*.jade'
            ],
            dest: '.tmp',
            ext: '.html'
          }
        ]
      },
      /*
      Compile templates managed in code
      ex: template for $modal popup
      */
      compiletemplates: {
        options: {
          data: {
            debug: false
          }
        },
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.client %>',
            src: [
              'assets/templates/*.jade'
            ],
            dest: '<%= yeoman.client %>/assets/templates/html',
            flatten: true,
            ext: '.html'
          }
        ]
      }
    },
    // Compiles Less to CSS
    less: {
      options: {
        paths: [
          '<%= yeoman.client %>/bower_components', '<%= yeoman.client %>/app', '<%= yeoman.client %>/components'
        ]
      },
      server: {
        files: {
          '.tmp/app/app.css': '<%= yeoman.client %>/app/app.less'
        }
      }
    },
    //    uglify: {
    //      options: {
    //        mangle: {
    //          except: [
    //            'ct-ui-router-extras' //problem mangling...?
    //          ]
    //        }
    //      }
    //    },
    injector: {
      options: {

      },
      /*
       Inject application script files into index.html (doesn't include bower)
       */
      scripts: {
        options: {
          transform: function( filePath ) {
            filePath = filePath.replace('/client/', '');
            filePath = filePath.replace('/.tmp/', '');
            return '<script src="' + filePath + '"></script>';
          },
          starttag: '<!-- injector:js -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          //new '<%= yeoman.client %>/index.html': [
          'index.html': [
            [
              '{.tmp,<%= yeoman.client %>}/{app,components}/**/*.module.js',
              '{.tmp,<%= yeoman.client %>}/{app,components}/**/*.constants.js',
              '{.tmp,<%= yeoman.client %>}/{app,components}/**/*.config.js',
              '{.tmp,<%= yeoman.client %>}/{app,components}/**/*.js',
              '!{.tmp,<%= yeoman.client %>}/app/app.module.js',
              '!{.tmp,<%= yeoman.client %>}/{app,components}/**/*.spec.js',
              '!{.tmp,<%= yeoman.client %>}/{app,components}/**/*.mock.js'
            ]
          ]
        }
      },

      /*
      Inject component less into app.less
      */
      less: {
        options: {
          transform: function( filePath ) {
            filePath = filePath.replace('/client/app/', '');
            filePath = filePath.replace('/client/components/', '');
            return '@import \'' + filePath + '\';';
          },
          starttag: '// injector',
          endtag: '// endinjector'
        },
        files: {
          '<%= yeoman.client %>/app/app.less': [
            '<%= yeoman.client %>/app/blocks/**/*.less',
            '<%= yeoman.client %>/app/main/**/*.less',
            '<%= yeoman.client %>/{app,components}/**/*.less',
            '!<%= yeoman.client %>/app/app.less'
          ]
        }
      },
      /*
      Inject component css into index.html
      */
      css: {
        options: {
          transform: function( filePath ) {
            console.log(filepath);
            filePath = filePath.replace('/client/', '');
            filePath = filePath.replace('/.tmp/', '');
            return '<link rel="stylesheet" href="' + filePath + '">';
          },
          starttag: '<!-- injector:css -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          //new '<%= yeoman.client %>/index.html': [
          'index.html': [
            '<%= yeoman.client %>/{app,components}/**/*.css'
          ]
        }
      }
    },
    // Clean unused css (added João Carvalho)
    //https://github.com/addyosmani/grunt-uncss

    //TODO: see pattern matching https://github.com/addyosmani/grunt-uncss/issues/97

    // wrapper para
    //https://github.com/giakki/uncss (ver opções aqui)
    uncss: {
      dist: {
        options: {
          htmlroot: __dirname,
          ignore: [/.*dropdown-menu.*/, /.*nav.*\.open/, /.*\[disabled\]/, /.*\[type=.*\]/, /#bookrecordForm.*:before.*/, /#bookrecordForm.*:after.*/],
          ignoreSheets: [/fonts.googleapis/],
          stylesheets: ['/.tmp/app/app.css']
        },
        files: {
          '.tmp/app/app.css': ['.tmp/**/*.html']
        }
      }
    },
    // Replace text in files (added João Carvalho)
    replace: {
      appvars: {
        src: [
          '<%= yeoman.client %>/**/*.{html,js,jade,less}',
          'server/**/*.{js,jade}',
          'package.json',
          'bower.json',
          '!Gruntfile.js',
          '!<%= yeoman.client %>/bower_components/**'],
        overwrite: true,
        replacements: [
          {from: "-webappname-", to: grunt.option("webappname")},
          {from: "-webapptitle-", to: grunt.option("webapptitle")},
          {from: "-webappdescription-", to: grunt.option("webappdescription")},
          {from: "-webappport-", to: grunt.option("webappport")},
        ]
      }
    },
    //releasebuild
    releasebuild: {
      default: {},
      minor: {
        options: {
          type: 'minor'
        }
      }
    }
  });
  // Used for delaying livereload until after server has restarted
  grunt.registerTask('hintclient', [
    'jshint:client', 'jshint:clientTest'
  ]);
  grunt.registerTask('hintserver', [
    'jshint:server', 'jshint:serverTest'
  ]);
  grunt.registerTask('hintall', [
    'hintclient', 'hintserver'
  ]);

  grunt.registerTask('wait', function() {
    grunt.log.ok('Waiting for server reload...');
    var done = this.async();
    setTimeout(function() {
      grunt.log.writeln('Done waiting!');
      done();
    }, 1500);
  });
  grunt.registerTask('express-keepalive', 'Keep grunt running', function() {
    this.async();
  });
  grunt.registerTask('serve', function( target ) {
    if ( target === 'dist' ) {
      return grunt.task.run([
        'build', 'env:all', 'env:prod', 'express:prod', 'wait', /*'open',*/
        'express-keepalive'
      ]);
    }
    if ( target === 'debug' ) {
      return grunt.task.run([
        'clean:server', 'env:all', 'injector:less', 'concurrent:server', 'injector', 'wiredep', 'autoprefixer', 'concurrent:debug'
      ]);
    }
    grunt.task.run([
      'clean:server', 'env:all', /*'injector:less',*/ 'concurrent:server', 'injector', 'wiredep', 'autoprefixer', 'express:dev', 'wait', /*'open',*/
      'watch'
    ]);
  });
  grunt.registerTask('server', function() {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });
  grunt.registerTask('test', function( target ) {
    if ( target === 'server' ) {
      return grunt.task.run([
        'env:all', 'env:test', 'mochaTest'
      ]);
    }
    else if ( target === 'client' ) {
      return grunt.task.run([
        'clean:server', 'env:all', 'injector:less', 'concurrent:test', 'injector', 'autoprefixer'/*, 'karma'*/
      ]);
    }
    else if ( target === 'e2e' ) {
      return grunt.task.run([
        'clean:server', 'env:all', 'env:test', 'injector:less', 'concurrent:test', 'injector', 'wiredep', 'autoprefixer', 'express:dev', 'protractor'
      ]);
    }
    else grunt.task.run([
        'test:server', 'test:client'
      ]);
  });
  grunt.registerTask('build', [
    'clean:dist', 'injector:less', 'concurrent:dist', 'injector', 'wiredep',
    /*'copy:debugappfiles',*/ 'useminPrepare', 'autoprefixer',
    /*'uncss:dist',*/ 'ngtemplates', 'concat', /*'copy:debugbowerfiles',*/ 'ngAnnotate',
    'copy:dist', /*'cdnify',*/ 'cssmin', 'uglify', 'rev', 'usemin'
  ]);
  grunt.registerTask('build-debugapp', [
    'clean:dist', 'injector:less', 'concurrent:dist', 'injector', 'wiredep',
    'copy:debugappfiles', 'useminPrepare', 'autoprefixer',
    /*'uncss:dist',*/ 'ngtemplates', 'concat', /*'copy:debugbowerfiles',*/ 'ngAnnotate',
    'copy:dist', /*'cdnify',*/ 'cssmin', 'uglify', 'rev', 'usemin'
  ]);
  grunt.registerTask('build-debugall', [
    'clean:dist', 'injector:less', 'concurrent:dist', 'injector', 'wiredep',
    'copy:debugappfiles', 'useminPrepare', 'autoprefixer',
    /*'uncss:dist',*/ 'ngtemplates', 'concat', 'copy:debugbowerfiles', 'ngAnnotate',
    'copy:dist', /*'cdnify',*/ 'cssmin', 'uglify', 'rev', 'usemin'
  ]);
  grunt.registerTask('buildtest', [
    'clean:dist', 'injector:less', 'concurrent:dist', 'injector', 'wiredep', 'useminPrepare', 'autoprefixer', 'uncss:dist', 'ngtemplates'
  ]);

  grunt.registerTask('run', [
    'nodemon:dev'
  ]);
  grunt.registerTask('release', ['releasebuild:default']);

  grunt.registerTask('default', [
    'newer:jshint', 'test'
  ]);
};
