module.exports = function(grunt) {

  grunt.initConfig({

    lodash: {
      build: {
        dest: 'build/lodash.build.js',
        options: {
          shortFlags: ['m'],
          include: [
            'extend',
            'clone',
            'cloneDeep',
            'partialRight',
            'reduce',
            'each',
            'map',
            'values',
            'pluck',
            'uniq',
            'isObject',
            'isNumber'
          ]
        }
      }
    },

    browserify: {
      vendor: {
        src: [],
        dest: 'public/vendor.js',
        options: {
          require: ['jquery'],
          alias: [
            './lib/moments.js:momentWrapper', //can alias file names
            'events:evt' //can alias modules
          ]
        }
      },
      client: {
        src: ['client/**/*.js'],
        dest: 'public/app.js',
        options: {
          external: ['jquery', 'momentWrapper'],
        }
      }
    },

    clean: ["build"]

  });

  grunt.loadNpmTasks('grunt-lodash');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('build', ['clean','lodash', 'browserify']);

};