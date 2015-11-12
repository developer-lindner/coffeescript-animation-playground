module.exports = (grunt) ->

    require('load-grunt-tasks') grunt

    grunt.initConfig
        coffee:
            '/':
                options:
                    join: true
                files: [ 'dev/app.js': 'dev/*.coffee']
        watch:
            html:
                files: ['*.html']
            coffee:
                files: ['dev/*.coffee']
                tasks: ['coffee']

    grunt.registerTask 'serve', ['coffee', 'watch']
    grunt.registerTask 'default', ['serve']
