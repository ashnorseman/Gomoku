
module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {

      html: {
        expand: true,
        cwd: 'app/',
        src: 'index.html',
        dest: 'dist'
      },

      css: {
        expand: true,
        cwd: 'app/',
        src: 'css/*.css',
        dest: 'dist'
      },

      images: {
        expand: true,
        cwd: 'app/',
        src: 'images/*.*',
        dest: 'dist'
      }
    },

    less: {

      options: {
        compress: true
      },

      mapping: {

        files: [
          {
            src: 'app/less/base.less',
            dest: 'app/css/base.min.css'
          }
        ]
      }
    },

    uglify: {

      mapping: {

        files: [
          {
            src: [
              'bower_components/jquery/dist/jquery.min.js',
              'bower_components/underscore/underscore.js',
              'bower_components/backbone/backbone.js',
              'app/*.js'
            ],
            dest: 'dist/js/global.min.js'
          },
          {
            src: [
              'bower_components/modernizr/modernizr.js'
            ],
            dest: 'bower_components/modernizr.min.js'
          }
        ]
      }
    },

    useminPrepare: {
      html: ['app/index.html'],

      options: {
        dest: 'dist'
      }
    },

    usemin: {
      html: ['dist/index.html'],

      options: {
        assetsDirs: 'dist/js'
      }
    },

    karma: {

      unit: {
        configFile: 'karma.conf.js',
        background: true
      }
    },

    watch: {

      html: {
        files: ['app/index.html'],
        tasks: ['usemin', 'copy:html']
      },

      css: {
        files: ['app/less/*.less'],
        tasks: ['less']
      },

      js: {
        files: ['app/js/*.js'],
        tasks: ['uglify']
      },

      images: {
        files: ['app/images/*.*'],
        tasks: ['copy:image']
      },

      karma: {

        files: [
          'app/js/*.js',
          'test/*.js'
        ],

        tasks: ['karma:unit:run']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', [
    'copy',
    'less',
    'uglify',
    'useminPrepare',
    'usemin',
    'karma',
    'watch'
  ]);
};
