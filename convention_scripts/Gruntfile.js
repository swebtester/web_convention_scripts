'use strict';

module.exports = function (grunt) {
    function endsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }
    
    function readfiles() {
        var jsonfile = 'files.txt';
        if (!grunt.file.exists(jsonfile)) {
            grunt.log.error('file ' + jsonfile + ' not found');
            return true;
        }

        var project = grunt.file.read(jsonfile);

        grunt.log.debug('files.txt is readed.'); 

        var keys = project.split('\n'); 

        var newList = [];
        for (var i = 0 ; i < keys.length; i++) {
            var item = keys[i];
            grunt.log.debug('file name : ' + item);
            var trimed = item.trim();
            if (endsWith(trimed, '.js')) {
                newList.push(trimed);
                grunt.log.debug('file name(js): ' + trimed);
            }
        }
        return newList;
    }
    
    grunt.initConfig({
        jshint : {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            ide: {
                expand: true,
                cwd: '.',
                src: ['<%= readJsfiles %>', '!src/server/emul/**']
            }
        },
        readJsfiles : readfiles()
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('convention', ['jshint']);
};