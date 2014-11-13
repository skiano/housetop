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
    }
  });

  grunt.loadNpmTasks('grunt-lodash');

  grunt.registerTask('build', ['lodash']);

};