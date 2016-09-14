// Karma configuration
// Generated on Mon Aug 22 2016 11:18:22 GMT+0200 (Paris, Madrid (heure d’été))

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
		//static files
		'src/main/webapp/static/js/jquery/jquery.min.js',
		'src/main/webapp/static/js/bootstrap/bootstrap.min.js',
		'src/main/webapp/static/js/angular-js/angular.min.js',
		'src/main/webapp/static/js/angular-sanitize/angular-sanitize.min.js',
		'src/main/webapp/static/js/angular-resource/angular-resource.min.js',
		'src/main/webapp/static/js/angular-animate/angular-animate.min.js',
		'src/main/webapp/static/js/angular-ui-router/angular-ui-router.min.js',
		'src/main/webapp/static/js/angular-ui-bootstrap/ui-bootstrap-tpls.js',
		'src/main/webapp/static/js/angular-swagger-ui/swagger-ui.min.js',
		'src/main/webapp/static/js/toastr/toastr.min.js',
		'src/main/webapp/static/js/angular-mocks/angular-mocks.js',
		//app & test files
		'src/main/webapp/scripts/app/app.js',
		'src/main/webapp/scripts/**/*.js',
		'src/main/webapp/**/*.html'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
