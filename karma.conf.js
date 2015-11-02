//frameworks: This tells Karma to use the Jasmine framework.
//files: This sets the list of files that Karma will include in its tests. Notice that you can use glob patterns to indicate files pattern. In this case, we included all of our library files and module files, excluding our test files.
//reporters: This sets the way Karma reports its tests results.
//browsers: This is a list of browsers Karma will test on. Note that we can only use the PhantomJS browser since we haven't installed any other launcher plugin.
//captureTimeout: This sets the timeout for Karma tests execution.
//singleRun: This forces Karma to quit after it finishes the tests execution.

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'public/lib/angular/angular.js',
      'public/lib/angular-resource/angular-resource.js',
      'public/lib/angular-route/angular-route.js',
      'public/lib/angular-mocks/angular-mocks.js',
      'public/application.js',
      'public/*[!lib]*/*.js',
      'public/*[!lib]*/*[!tests]*/*.js',
      'public/*[!lib]*/tests/unit/*.js'
    ],
    reporters: ['progress'],
    browsers: ['PhantomJS'],
    captureTimeout: 60000,
    singleRun: true
  });
};