module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		develop: {
			server: {
				file: 'index.js'
			}
		},
		watch: {
			server: {
				files: [
						'**/*.js',
						'!node_modules/**/*.js'
				],
				tasks: [],
				options: {
					interrupt: false,
					livereload: false
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-develop');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['develop', 'watch']);
};