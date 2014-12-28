'use strict';

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    browserNoActivityTimeout: 20000,
    files: [
      <% scripts.forEach( function ( file ) { %>'<%= file %>',
      <% }); %>
      'components/angular-mocks/angular-mocks.js',
      'src/**/*.spec.js'
    ],
    exclude: [
      'src/common/widgets/**/*.spec.js'
    ],
    browsers: ['<%= browser %>'],
    singleRun: true,
    logLevel: config.LOG_INFO
  });
};