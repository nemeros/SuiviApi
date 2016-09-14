
module.exports = function(grunt) {

	grunt.initConfig({
	  jshint: {
		options: {
			  "curly": true,
			  "eqnull": true,
			  "eqeqeq": true,
			  "undef": true,
			  "jasmine": true,
			  "globals": {
				"jQuery": true,
				"module": false,
				"inject": false
			  },
			  "predef": ["angular", "toastr"]
		 },
		all: ['src/main/webapp/scripts/**/*.js']
	  },
	  karma: {
		unit:{
			configFile: 'karma.conf.js',
			singleRun: true
		}
	  }
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-karma');

	grunt.registerTask('default', ['jshint', 'karma']);

};