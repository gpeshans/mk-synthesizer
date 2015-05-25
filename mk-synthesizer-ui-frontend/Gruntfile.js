'use strict';

/* jshint camelcase: false */
module.exports = function (grunt) {

  /**
   * Load all Grunt tasks. These are installed based on the versions listed
   * in `package.json` when you do `npm install` in this directory.
   */
  require('load-grunt-tasks')(grunt, { config: 'package.json' });
  require('time-grunt')(grunt);

  var config = require('./build/build-config.js');
  var proxyConfig = require('./build/proxy-config.js')(grunt);
  var stringify = require('./build/stringify.js');

  /**
   * This is the configuration object Grunt uses to give each plugin its
   * instructions.
   */
  var taskConfig = {
    copy: {
      /**
       * Copies all files needed to run the dev server to the tmp directory.
       */
      tmp: {
        files: [
          {
            expand: true,
            cwd: '.',
            src: [
              '<%= mkSynthesizer.all_scripts %>',
              '<%= mkSynthesizer.all_less %>',
              'startup-config.json'
            ],
            dest: '<%= mkSynthesizer.tmp %>/'
          },
          {
            expand: true,
            cwd: '<%= common.assets %>',
            src: ['**'],
            dest: '<%= mkSynthesizer.tmp %>/assets/'
          },
          {
            expand: true,
            cwd: '<%= mkSynthesizer.assets %>',
            src: ['**'],
            dest: '<%= mkSynthesizer.tmp %>/assets/'
          }
        ]
      },

      /**
       * Copies the generated CSS and all assets to the dist directory.
       */
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= mkSynthesizer.tmp %>/assets/',
            src: ['**'],
            dest: '<%= mkSynthesizer.dist %>/assets/'
          }
        ]
      },
      preview: {
        files: [
          {
            expand: true,
            cwd: '.',
            src: 'startup-config.json',
            dest: '<%= mkSynthesizer.dist %>/'
          }
        ]
      },

      /**
       * Copies the coverage report to the root directory of the coverage folder
       * where it is expected by the Sonar analysis.
       */
      lcov: {
        src: '<%= dir.coverage %>/**/lcov.info',
        dest: '<%= dir.coverage %>/lcov.info'
      }
    },

    /**
     * Deletes the contents of the specified folders.
     */
    clean: {
      server: '<%= dir.tmp %>',
      test: [
        '<%= dir.tmp %>',
        '<%= dir.coverage %>',
        '<%= dir.report %>'
      ],
      dist: [
        '<%= dir.tmp %>',
        '<%= dir.staging %>',
        '<%= dir.dist %>'
      ]
    },

    /**
     * Starts a web server and serves the pre-processed application from the tmp directory.
     */
    connect: {
      options: {
        port: 9000,
        hostname: 'localhost'
      },
      livereload_mkSynthesizer: {
        options: {
          livereload: 35729,
          open: true,
          base: ['<%= mkSynthesizer.tmp %>/'],
          middleware: proxyConfig.middlewares
        },
        proxies: proxyConfig.proxies
      },
      dist_mkSynthesizer: {
        options: {
          open: true,
          keepalive: true,
          base: ['<%= mkSynthesizer.dist %>/'],
          middleware: proxyConfig.middlewares
        },
        proxies: proxyConfig.proxies
      }
    },

    /**
     * Watches the specified files for changes. We don't want to rebuild the whole project for all file types,
     * so we only execute the necessary Grunt tasks based on the changed files.
     */
    watch: {
      grunt: {
        files: ['build-config.js', 'Gruntfile.js']
      },
      js: {
        options: {
          livereload: true
        },
        files: ['<%= dir.src %>/**/*.js', '!<%= dir.src %>/**/*.spec.js'],
        tasks: ['copy:tmp', 'index:mkSynthesizer_tmp']
      },
      less: {
        options: {
          livereload: true
        },
        files: ['<%= dir.src %>/**/*.less'],
        tasks: ['copy:tmp', 'less_index:mkSynthesizer', 'less', 'index:mkSynthesizer_tmp']
      },
      html: {
        options: {
          livereload: true
        },
        files: ['<%= dir.src %>/**/*.tpl.html'],
        tasks: ['html2js', 'copy:tmp']
      }
    },

    /**
     * Creates an index.less file in the tmp directory with @include for all less files of a project.
     * This file is used as the source for the less task below.
     */
    less_index: {
      mkSynthesizer: {
        src: '<%= mkSynthesizer.all_less %>',
        dest: '<%= mkSynthesizer.tmp %>/index.less'
      }
    },

    /**
     * Generates the CSS based on the index.less file generated above in the less_index task.
     */
    less: {
      mkSynthesizer: {
        options: {
          sourceMap: true,
          sourceMapFilename: '<%= mkSynthesizer.less_compiled %>.map',
          sourceMapURL: 'mkSynthesizer.css.map',
          sourceMapBasepath: '<%= mkSynthesizer.tmp %>'
        },
        src: '<%= less_index.mkSynthesizer.dest %>',
        dest: '<%= mkSynthesizer.less_compiled %>'
      }
    },

    /**
     * Creates an AngularJS module from all HTML templates. These templates are put in $templateCache
     * and therefore never have to be loaded from the server.
     */
    html2js: {
      common: {
        src: '<%= common.html %>',
        module: 'mkSynthesizer.common.templates',
        dest: '<%= dir.html2js %>/<%= common.html2js_file %>'
      },
      mkSynthesizer: {
        src: '<%= mkSynthesizer.html %>',
        module: 'mkSynthesizer.templates',
        dest: '<%= dir.html2js %>/<%= mkSynthesizer.html2js_file %>'
      }
    },

    /**
     * The 'index' task compiles an 'index.html' file as a Grunt template. And adds the scripts and styles
     * to the page.
     */
    index: {
      /**
       * During development, we don't want to have wait for compilation,
       * concatenation, minification, etc. So to avoid these steps, we simply
       * add all script files directly to `index.html`.
       */
      mkSynthesizer_tmp: {
        src: '<%= mkSynthesizer.index %>',
        dest: '<%= mkSynthesizer.tmp %>/index.html',
        scripts: ['<%= mkSynthesizer.all_scripts %>'],
        styles: ['mkSynthesizer.css']
      },
      mkSynthesizer_dist: {
        src: '<%= mkSynthesizer.index %>',
        dest: '<%= mkSynthesizer.dist %>/index.html',
        scripts: ['mkSynthesizer.js'],
        styles: ['mkSynthesizer.css']
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      gruntfile: ['Gruntfile.js'],
      src: {
        files: [
          {
            expand: true,
            cwd: '<%= dir.src %>',
            src: '**/*.js'
          }
        ]
      }
    },

    /**
     * This task compiles the karma template so that changes to its file array
     * don't have to be managed manually.
     */
    karmaconfig: {
      unit: {
        dir: '<%= dir.tmp %>',
        src: [
          '<%= mkSynthesizer.all_scripts %>'
        ]
      }
    },

    karma: {
      unit: {
        options: {
          // this file is generated based on the js files in build-config.js in the task karmaconfig
          configFile: 'karma-unit.js'
        },
        singleRun: true,
        coverageReporter: {
          type: 'lcov',
          dir: '<%= dir.coverage %>'
        },
        junitReporter: {
          outputFile: '<%= dir.report %>/TEST-karma-junit-report.xml',
          suite: 'unit'
        },
        reporters: ['progress', 'junit', 'coverage'],
        // don't include all spec files in coverage
        preprocessors: { 'src/**/!(*spec).js': 'coverage' }
      }
    },

    concat: {
      mkSynthesizer: {
        src: '<%= mkSynthesizer.scripts %>',
        dest: '<%= mkSynthesizer.staging %>/mkSynthesizer.js'
      },
      mkSynthesizer_vendor: {
        options: {
          stripBanners: true
        },
        src: '<%= mkSynthesizer.vendor_min %>',
        dest: '<%= mkSynthesizer.staging %>/mkSynthesizer-vendor.js'
      },
      mkSynthesizer_dist: {
        src: ['<%= mkSynthesizer.staging %>/mkSynthesizer-vendor.js', '<%= mkSynthesizer.staging %>/mkSynthesizer.js'],
        dest: '<%= mkSynthesizer.dist %>/mkSynthesizer.js'
      },
      mkSynthesizer_css: {
        src: ['<%= mkSynthesizer.tmp %>/mkSynthesizer.css'],
        dest: '<%= mkSynthesizer.dist %>/mkSynthesizer.css'
      }
    },

    ngAnnotate: {
      options: {
        singleQuotes: true
      },
      compile_mkSynthesizer: {
        files: [
          {
            expand: true,
            src: ['<%= mkSynthesizer.staging %>/mkSynthesizer.js']
          }
        ]
      }
    },

    uglify: {
      compile_mkSynthesizer: {
        files: {
          '<%= mkSynthesizer.staging %>/mkSynthesizer.js': '<%= mkSynthesizer.staging %>/mkSynthesizer.js'
        }
      }
    },

    filerev: {
      mkSynthesizer: {
        src: '<%= mkSynthesizer.dist %>/**/*.{css,js,jpeg,jpg,png,gif,svg,webp}'
      }
    },

    usemin: {
      html: {
        files: [
          {
            expand: true,
            cwd: '<%= mkSynthesizer.dist %>',
            src: '**/*.html'
          }
        ],
        options: {
          type: 'html'
        }
      },
      css: {
        files: [
          {
            expand: true,
            cwd: '<%= mkSynthesizer.dist %>',
            src: '**/*.css'
          }
        ],
        options: {
          type: 'css'
        }
      },
      js: {
        files: [
          {
            expand: true,
            cwd: '<%= mkSynthesizer.dist %>',
            src: '**/*.js'
          }
        ],
        options: {
          patterns: {
            js: [
              [ /<img[^>]+src=['"]([^"']+)["']/gm, 'Update the JS with the new img filenames'],
              [/(assets\/.*?\.(?:gif|jpeg|jpg|png|svg))/gm, 'Update the JS with the new img filenames']
            ]
          }
        }
      }
    }
  };

  grunt.initConfig(grunt.util._.extend(taskConfig, config));

  /**
   * The index.html template includes the stylesheet and javascript sources
   * based on dynamic names calculated in this Gruntfile. This task assembles
   * the list into variables for the template to use and then runs the
   * compilation.
   */

  grunt.registerMultiTask('index', 'Process index.html templates', function () {

    var styles = grunt.file.expand({ nonull: true }, this.data.styles);
    var scripts = grunt.file.expand({ nonull: true }, this.data.scripts);

    grunt.file.copy(this.data.src, this.data.dest, {
      process: function (contents) {
        return grunt.template.process(contents, {
          data: {
            scripts: scripts,
            styles: styles
          }
        });
      }
    });

  });

  grunt.registerMultiTask('less_index', 'Generates index for less files', function () {

    grunt.file.write(this.data.dest, this.filesSrc.map(function (file) {
      return '@import "' + file + '";';
    }).join('\n'));
  });

  /**
   * In order to avoid having to specify manually the files needed for karma to
   * run, we use grunt to manage the list for us. The `karma/*` files are
   * compiled as grunt templates for use by Karma.
   */
  grunt.registerMultiTask('karmaconfig', 'Process karma config templates', function () {
    var jsFiles = this.filesSrc;
    var isWin = /^win/.test(process.platform);
    var browser = isWin ? 'Chrome' : 'PhantomJS';
    browser = grunt.option('chrome') ? 'Chrome' : browser;
    browser = grunt.option('firefox') ? 'Firefox' : browser;

    grunt.file.copy('./build/karma-unit.js.tpl', 'karma-unit.js', {
      process: function (contents) {
        return grunt.template.process(contents, {
          data: {
            scripts: jsFiles,
            browser: browser
          }
        });
      }
    });
  });

  grunt.registerTask(
    'dump',
      'Dump the Grunt configuration to the console. ' +
      'To dump only the configuration for foo use dump:foo ' +
      'To dump the raw configuration (i.e. without processing ' +
      'templates), append :raw (e.g. dump:foo:raw).',
    function (arg1, arg2) {
      var raw = arg1 === 'raw' || arg2 === 'raw';
      var config = arg1 === 'raw' ? undefined : arg1;
      var get = raw ? grunt.config.getRaw : grunt.config.get;
      grunt.log.writeln(stringify(get(config)));
    });


  grunt.registerTask('lint', ['jshint']);

  grunt.registerTask('test', [
    'clean:test',
    'html2js',
    'karmaconfig',
    'karma',
    'copy:lcov'
  ]);

  grunt.registerTask('compile', [
    'html2js',
    'copy:tmp',
    'less_index',
    'less',
    'index:mkSynthesizer_tmp'
  ]);

  grunt.registerTask('serve', [
    'clean:server',
    'compile',
    'configureProxies:livereload_mkSynthesizer',
    'connect:livereload_mkSynthesizer',
    'watch'
  ]);

  grunt.registerTask('concat-staging', [
    'concat:mkSynthesizer',
    'concat:mkSynthesizer_vendor'
  ]);

  grunt.registerTask('concat-dist', [
    'concat:mkSynthesizer_dist',
    'concat:mkSynthesizer_css'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'lint',
    'test',
    'compile',
    'concat-staging',
    'ngAnnotate',
    'uglify',
    'concat-dist',
    'copy:dist',
    'filerev',
    'index:mkSynthesizer_dist',
    'usemin'
  ]);

  grunt.registerTask('preview', [
    'build',
    'copy:preview',
    'configureProxies:dist_mkSynthesizer',
    'connect:dist_mkSynthesizer'
  ]);

  grunt.registerTask('default', ['build']);

};